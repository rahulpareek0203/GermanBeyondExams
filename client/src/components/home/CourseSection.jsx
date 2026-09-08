import "./CourseSection.css";
import FeaturesGrid from "../ui/GlowingCards";
import ElectricBorder from "../ui/ElectricBorder";
import { Calendar, Clock } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiFetch } from "@/utils/apiFetch";
import { useAuth } from "@/context/AuthContext";
import EnrollStepperModal from "./EnrollStepperModal";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const A1_ID = "c18bd7ae-b913-4f3d-b196-2dfc19e0e81a";
const A2_ID = "a4ac944f-61c6-4577-89c6-c4ab9746eacb";

const courses = [
  {
    id: A1_ID,
    title: "German A1 Batch",
    subtitle: "Real German starts at A1. Build it right from day one.",
    startDate: "Starting 1st October",
    time: "6:30 - 8:30 PM IST",
    timeGER: "3:00 - 5:00 PM CET",
    priceEUR: 99,
    oldPrice: 120,
    priceINR: 11200,
    totalSeats: 15,
  },
  {
    id: A2_ID,
    title: "German A2 Batch",
    subtitle: "Take your German to the next level with real conversations.",
    startDate: "Starting 1st October",
    time: "8:30 - 10:30 PM IST",
    timeGER: "5:00 - 7:00 PM CET",
    priceEUR: 130,
    oldPrice: 150,
    priceINR: 14500,
    totalSeats: 15,
  },
  {
    id: "b1-coming-soon",
    title: "German B1 Batch",
    subtitle: "Speak more fluently, think faster, and communicate naturally in German.",
    startDate: "Coming Soon",
    time: null,
    timeGER: null,
    priceEUR: null,
    oldPrice: null,
    priceINR: null,
    totalSeats: 15,
    comingSoon: true,
  },
];

const bundles = {
  [A1_ID]: {
    title: "A1 + A2 Bundle",
    courses: ["German A1 Batch", "German A2 Batch"],
    courseIds: [A1_ID, A2_ID],
    originalPrice: 229,
    discountedPrice: 199,
  },
};

export default function CourseSection() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const { user, logout } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const registrationClosed = false;

  const [seatMap, setSeatMap] = useState({});
  const [statusMap, setStatusMap] = useState({});
  const [checking, setChecking] = useState(true);

  const navigateToLogin = () => {
    navigate("/login", {
      state: {
        from: { ...location, hash: "#courses" },
      },
    });
  };

  useEffect(() => {
    const fetchSeatCounts = async () => {
      try {
        const res = await apiFetch("/api/enrollments/counts", {}, logout);

        if (res && res.ok) {
          const data = await res.json();
          setSeatMap(data);
          console.log("Seat counts:", data);
        }
      } catch (err) {
        console.error("Seat fetch error:", err);
      }
    };

    fetchSeatCounts();
  }, [logout]);

  useEffect(() => {
    if (!token) {
      setChecking(false);
      return;
    }

    const fetchAllStatuses = async () => {
      try {
        const updates = {};

        await Promise.all(
          courses
            .filter((course) => !course.comingSoon)
            .map(async (course) => {
              try {
                const res = await apiFetch(`/api/enrollments/status/${course.id}`, {}, logout);

                if (res && res.ok) {
                  const data = await res.json();
                  updates[course.id] = data.status;
                }
              } catch (error) {
                console.error(`Status fetch failed for ${course.title}:`, error);
              }
            })
        );

        setStatusMap(updates);
      } catch (err) {
        console.error("Status fetch error:", err);
      } finally {
        setChecking(false);
      }
    };

    fetchAllStatuses();
  }, [token, logout]);

  const handleJoin = async (course) => {
    if (!user) {
      navigateToLogin();
      return;
    }

    if (!course || course.comingSoon) return;

    const currentStatus = statusMap[course.id];

    console.log("Status of enrollment:", currentStatus);

    if (currentStatus === "pending" || currentStatus === "approved") return;

    try {
      setStatusMap((prev) => ({
        ...prev,
        [course.id]: "loading",
      }));

      const res = await apiFetch("/api/enrollments", {
        method: "POST",
        body: JSON.stringify({ courseId: course.id }),
      }, logout);

      if (!res) return;

      const data = await res.json();

      if (res.ok) {
        setStatusMap((prev) => ({
          ...prev,
          [course.id]: "pending",
        }));

        alert("Request submitted. Await admin approval");
        sendMessage(course.title);
      } else {
        alert(data.message || "Something went wrong");

        setStatusMap((prev) => ({
          ...prev,
          [course.id]: null,
        }));
      }
    } catch (error) {
      console.error("Join error:", error);

      setStatusMap((prev) => ({
        ...prev,
        [course.id]: null,
      }));
    }
  };

  const handleBundleEnrollment = async () => {
    if (!user) {
      navigateToLogin();
      return;
    }

    try {
      const a1Response = await apiFetch("/api/enrollments", {
        method: "POST",
        body: JSON.stringify({ courseId: A1_ID }),
      }, logout);

      if (!a1Response) return;

      const a1Data = await a1Response.json();

      if (!a1Response.ok) {
        alert(a1Data.message || "A1 enrollment failed.");
        return;
      }

      const a2Response = await apiFetch("/api/enrollments", {
        method: "POST",
        body: JSON.stringify({ courseId: A2_ID }),
      }, logout);

      if (!a2Response) return;

      const a2Data = await a2Response.json();

      if (!a2Response.ok) {
        alert(a2Data.message || "A2 enrollment failed.");
        return;
      }

      setStatusMap((prev) => ({
        ...prev,
        [A1_ID]: "pending",
        [A2_ID]: "pending",
      }));

      alert("A1 + A2 Bundle request submitted successfully!");
      sendMessage("A1 + A2 Bundle");
    } catch (error) {
      console.error("Bundle enrollment error:", error);
      alert("Something went wrong while submitting the bundle request.");
    }
  };

  const sendMessage = (courseName) => {
    const message = `
Hi Rahul, I would like to reserve my seat for ${courseName}.

Name: ${user?.full_name || ""}
Email: ${user?.email || ""}
User ID: ${user?.id || ""}

Please share the payment details, as I am ready to join.
`;

    const whatsappUrl = `https://wa.me/491725936119?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <section id="courses" className="a1-section">
      <div className="a1-container">

        <div className="a1-header">
          <h2>Learn German without Articles</h2>
          <p>
            Not just grammar. Not just rules. Real German for real life in Germany.
          </p>
        </div>

        <div className="a1-layout">

          <div className="a1-top">
            {courses.map((course) => {
              const totalSeats = course.totalSeats;
              const filledSeatsRaw = seatMap[course.id] || 0;

              const filledSeats = Math.min(filledSeatsRaw, totalSeats);

              const fillPercentage = totalSeats > 0
                ? (filledSeats / totalSeats) * 100
                : 0;

              const isFull = filledSeatsRaw >= totalSeats;
              const currentStatus = statusMap[course.id];
              const isComingSoon = course.comingSoon;

              return (
                <ElectricBorder
                  key={course.id}
                  color={isComingSoon ? "#91e720" : "#fcb251"}
                  speed={0.6}
                  chaos={0.06}
                  borderRadius={38}
                >
                  <div className="a1-card">

                    {!isComingSoon && (
                      <>
                        <div className="seats-pill">
                          <div
                            className="seats-fill"
                            style={{ width: `${fillPercentage}%` }}
                          ></div>

                          <span>
                            {filledSeats} / {totalSeats} seats filled
                          </span>
                        </div>

                        {filledSeats > totalSeats * 0.7 && !isFull && (
                          <p className="few-left">
                            ⚠️ Few seats left
                          </p>
                        )}
                      </>
                    )}

                    <h3 className="course_title">
                      {course.title}
                    </h3>

                    <p className="course_subtitle">
                      {course.subtitle}
                    </p>

                    <p className="date">
                      <Calendar size={18} />
                      <span>{course.startDate}</span>
                    </p>

                    {course.time && (
                      <p className="time">
                        <Clock size={18} />
                        <span>
                          Mon - Fri • {course.time}
                        </span>
                      </p>
                    )}

                    {!isComingSoon ? (
                      <div className="price-row">
                        <span className="old-price">
                          €{course.oldPrice}
                        </span>

                        <span className="price">
                          €{course.priceEUR}
                        </span>

                        <span className="discount">
                          {Math.round(
                            ((course.oldPrice - course.priceEUR) /
                              course.oldPrice) *
                              100
                          )}
                          % OFF
                        </span>
                      </div>
                    ) : (
                      <div className="price-row">
                        <span className="price">
                          Coming Soon
                        </span>
                      </div>
                    )}

                    <button
                      className="join-btn"
                      disabled={
                        registrationClosed ||
                        isComingSoon ||
                        currentStatus === "pending" ||
                        currentStatus === "approved" ||
                        currentStatus === "loading"
                      }
                      onClick={() => {
                        if (registrationClosed || isComingSoon) return;

                        if (!user) {
                          navigateToLogin();
                          return;
                        }

                        setSelectedCourse(course);
                        setShowModal(true);
                      }}
                    >
                      {isComingSoon
                        ? "Coming Soon"
                        : registrationClosed
                        ? "Registration Closed"
                        : currentStatus === "pending"
                        ? "Request Pending"
                        : currentStatus === "approved"
                        ? "Enrolled"
                        : currentStatus === "loading"
                        ? "Processing..."
                        : isFull
                        ? "Batch Full"
                        : "Join Now"}
                    </button>

                  </div>
                </ElectricBorder>
              );
            })}
          </div>

          <div className="a1-header">
            <h2>What Makes This Course Special?</h2>
            <FeaturesGrid />
          </div>

        </div>
      </div>

      <EnrollStepperModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => handleJoin(selectedCourse)}
        onBundleConfirm={() => handleBundleEnrollment()}
        course={selectedCourse}
      />

    </section>
  );
}
