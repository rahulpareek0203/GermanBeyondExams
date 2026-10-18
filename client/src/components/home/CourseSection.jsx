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

const A1_ID = "7b3906eb-b8cb-406a-81f5-4b00f8bf8446"; // Nov 2026 batch
const A2_ID = "0dddb15f-586e-430f-a03b-b2d3d7f82084"; // Nov 2026 batch
const SPEAKING_ID = "6aec9cd7-09bf-4f04-a9f3-f414bce4789b"; // Nov 2026 speaking batch

const courses = [
  {
    id: A1_ID,
    title: "German A1 Batch",
    subtitle: "Real German starts at A1. Build it right from day one.",
    startDate: "Starting 2nd November",
    time: "6:30 - 8:30 PM IST",
    timeGER: "2:00 - 4:00 PM CET",
    priceEUR: 99,
    oldPrice: 120,
    priceINR: 11200,
    totalSeats: 15,
  },
  {
    id: A2_ID,
    title: "German A2 Batch",
    subtitle: "Take your German to the next level with real conversations.",
    startDate: "Starting 2nd November",
    time: "8:30 - 10:30 PM IST",
    timeGER: "4:00 - 6:00 PM CET",
    priceEUR: 130,
    oldPrice: 150,
    priceINR: 14500,
    totalSeats: 15,
  },
  {
    id: SPEAKING_ID,
    title: "Real-Life German Speaking (A2–B1)",
    subtitle: "Speak more fluently, think faster, and hold real conversations in German.",
    startDate: "Starting 2nd November",
    time: "10:30 PM - 12:00 AM IST",
    timeGER: "6:00 - 7:30 PM CET",
    priceEUR: 130,
    oldPrice: 150,
    priceINR: 14500,
    totalSeats: 15,
  },
];

// Bundle offered on each course's card, keyed by that course's id.
const bundles = {
  [A1_ID]: {
    title: "A1 + A2 Bundle",
    courseIds: [A1_ID, A2_ID],
    duration: "2 Months",
    priceEUR: 199,
    priceINR: 22300,
    originalPriceEUR: 230,
    originalPriceINR: 25700,
  },
  [A2_ID]: {
    title: "A2 + Speaking Bundle",
    courseIds: [A2_ID, SPEAKING_ID],
    duration: "2 Months",
    priceEUR: 229,
    priceINR: 25600,
    originalPriceEUR: 260,
    originalPriceINR: 29000,
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

  // Send to login, remembering which course was clicked so we can
  // reopen its details when the user comes back.
  const navigateToLogin = (course) => {
    navigate("/login", {
      state: {
        from: {
          pathname: location.pathname,
          search: location.search,
          hash: "#courses",
          state: course ? { enrollCourseId: course.id } : null,
        },
      },
    });
  };

  // Scroll to the courses when arriving at /#courses
  useEffect(() => {
    if (location.hash === "#courses") {
      setTimeout(() => {
        document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location.hash]);

  // Back from login: reopen the course the user wanted to join
  useEffect(() => {
    const courseId = location.state?.enrollCourseId;
    if (!courseId || !user || checking) return;

    // Clear it so a refresh doesn't reopen the popup
    navigate(`${location.pathname}${location.search}${location.hash}`, { replace: true, state: null });

    const course = courses.find((c) => c.id === courseId);
    const status = statusMap[courseId];
    if (!course || course.comingSoon || status === "pending" || status === "approved") return;

    setSelectedCourse(course);
    setShowModal(true);
  }, [location, user, checking, statusMap, navigate]);

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

  const handleBundleEnrollment = async (bundle) => {
    if (!user) {
      navigateToLogin();
      return;
    }

    if (!bundle) return;

    try {
      for (const courseId of bundle.courseIds) {
        // Skip courses the student has already requested or joined
        const existing = statusMap[courseId];
        if (existing === "pending" || existing === "approved") continue;

        const res = await apiFetch("/api/enrollments", {
          method: "POST",
          body: JSON.stringify({ courseId }),
        }, logout);

        if (!res) return;

        if (!res.ok) {
          const data = await res.json();
          const name = courses.find((c) => c.id === courseId)?.title || "Course";
          alert(data.message || `${name} enrollment failed.`);
          return;
        }

        setStatusMap((prev) => ({ ...prev, [courseId]: "pending" }));
      }

      alert(`${bundle.title} request submitted successfully!`);
      sendMessage(bundle.title);
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
                        <span className="time-lines">
                          <span>Mon - Fri • {course.time}</span>
                          {course.timeGER && (
                            <span>{course.timeGER} (Germany)</span>
                          )}
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
                          navigateToLogin(course);
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
        onBundleConfirm={() => handleBundleEnrollment(bundles[selectedCourse?.id])}
        course={selectedCourse}
        bundle={bundles[selectedCourse?.id]}
      />

    </section>
  );
}
