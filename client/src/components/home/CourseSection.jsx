import "./CourseSection.css";
import FeaturesGrid from "../ui/GlowingCards";
import { LiquidMetalButton } from "@/components/ui/liquid-metal";
import { ArrowRight } from "lucide-react";
import {
  FiMic,
  FiBookOpen,
  FiUsers,
  FiHelpCircle,
  FiMap,
  FiTrendingUp
} from "react-icons/fi";
import ElectricBorder from "../ui/ElectricBorder";
import { Calendar, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiFetch } from "@/utils/apiFetch";
import { useAuth } from "@/context/AuthContext";
import EnrollStepperModal from "./EnrollStepperModal";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const courses = [
  {
    id: "d2ec4052-63ca-4528-ac8b-2215e20c4be0",
    title: "German A1 Batch",
    subtitle: "Real German starts at A1. Build it right from day one.",
    startDate: "Starting 6st April",
    time: "6:30 - 8:30 PM IST",
    timeGER: "3:00 - 5:00 PM CET",
    priceEUR: 99,
    oldPrice: 120,
    priceINR: 8299,
    totalSeats: 14,
  },
  {
    id: "1e5b473e-dd23-40e7-a610-6129d608fc12",
    title: "German A2 Batch",
    subtitle: "Take your German to the next level with real conversations.",
    startDate: "Starting 6st April",
    time: "8:30 - 10:30 PM IST",
    timeGER: "5:00 - 7:00 PM CET",
    priceEUR: 99,
    oldPrice: 120,
    priceINR: 10999,
    totalSeats: 14,
  },
  {
    id: "bundle-a1-a2",
    title: "A1 + A2 Bundle",
    subtitle: "Complete foundation. From beginner to confident speaker.",
    startDate: "Starting 6st April",
    time: "6:30 - 8:30 PM IST",
    timeGER: "3:00 - 5:00 PM CET",
    priceEUR: 160,
    oldPrice: 200,
    priceINR: 17340,
    totalSeats: 14,
  }
];

export default function CourseSection() {
  const A1_ID = "d2ec4052-63ca-4528-ac8b-2215e20c4be0";
  const A2_ID = "1e5b473e-dd23-40e7-a610-6129d608fc12";

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { user, logout } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const registrationClosed = false;

  const [seatMap, setSeatMap] = useState({});
  const [statusMap, setStatusMap] = useState({});
  const [checking, setChecking] = useState(true);

  const totalSeats = 14;
  const filledSeats = 14;
  const fillPercentage = (filledSeats / totalSeats) * 100;

  useEffect(() => {
    const fetchSeatCounts = async () => {
      try {
        const res = await apiFetch("/api/enrollments/counts", {}, logout);

        if (res && res.ok) {
          const data = await res.json();
          setSeatMap(data);
          console.log(data);
        }
      } catch (err) {
        console.error("Seat fetch error:", err);
      }
    };

    fetchSeatCounts();
  }, []);

  useEffect(() => {
    if (!token) {
      setChecking(false);
      return;
    }

    const fetchAllStatuses = async () => {
      try {
        const updates = {};

        await Promise.all(
          courses.map(async (course) => {
            const res = await apiFetch(
              `/api/enrollments/status/${course.id}`,
              {},
              logout
            );

            if (res && res.ok) {
              const data = await res.json();
              updates[course.id] = data.status;
            }
          })
        );

        setStatusMap(updates);
      } catch (err) {
        console.error(err);
      } finally {
        setChecking(false);
      }
    };

    fetchAllStatuses();
  }, [token, logout]);

  const handleJoin = async (course) => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (!course) return;

    if (course.id === "bundle-a1-a2") {
      await handleBundleJoin();
      return;
    }

    const currentStatus = statusMap[course.id];
    console.log("status of enrollment:", currentStatus);

    if (currentStatus === "pending" || currentStatus === "approved") return;

    try {
      setStatusMap((prev) => ({
        ...prev,
        [course.id]: "loading",
      }));

      const res = await apiFetch(
        "/api/enrollments",
        {
          method: "POST",
          body: JSON.stringify({ courseId: course.id }),
        },
        logout
      );

      if (!res) return;

      const data = await res.json();

      if (res.ok) {
        setStatusMap((prev) => ({
          ...prev,
          [course.id]: "pending",
        }));

        alert("Request submitted. Await admin approval");
        sendMessage(course);
      } else {
        alert(data.message || "Something went wrong");
        sendMessage(course);

        setStatusMap((prev) => ({
          ...prev,
          [course.id]: null,
        }));
      }
    } catch (error) {
      console.error("Join error:", error);
      setStatusMap(null);
    }
  };

  const handleBundleJoin = async () => {
    const a1 = courses.find((c) => c.title.includes("A1 Batch"));
    const a2 = courses.find((c) => c.title.includes("A2 Batch"));

    try {
      const responses = await Promise.all([
        apiFetch(
          "/api/enrollments",
          {
            method: "POST",
            body: JSON.stringify({ courseId: a1.id }),
          },
          logout
        ),
        apiFetch(
          "/api/enrollments",
          {
            method: "POST",
            body: JSON.stringify({ courseId: a2.id }),
          },
          logout
        ),
      ]);

      for (let res of responses) {
        const data = await res.json();
        console.log("Bundle response:", data);

        if (!res.ok) {
          alert(data.message || "Error in bundle enrollment");
          return;
        }
      }

      alert("Bundle request submitted!");
      sendBundleMessage();
    } catch (err) {
      console.error(err);
    }
  };

  const sendMessage = (course) => {
    const message = `
Hi Rahul, I would like to reserve my seat for ${course.title}.

Name: ${user?.full_name || ""}
Email: ${user?.email || ""}
User ID: ${user?.id || ""}

Please share the payment details, as I am ready to join.
`;

    const whatsappUrl = `https://wa.me/919462715921?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const sendBundleMessage = () => {
    const message = `
Hi Rahul, I would like to reserve my seat for A1 + A2 Bundle.

Name: ${user?.full_name || ""}
Email: ${user?.email || ""}
User ID: ${user?.id || ""}

Please share the payment details, as I am ready to join both courses.
`;

    const whatsappUrl = `https://wa.me/919462715921?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section id="courses" className="a1-section">
      <div className="a1-container">
        <div className="a1-header">
          <h2>Learn German without Articles</h2>
          <p>
            Not just grammar. Not just rules. Real German for real life in
            Germany.
          </p>
        </div>

        <div className="a1-layout">
          <div className="a1-top">
            {courses.map((course) => {
              let filledSeats = seatMap[course.id] || 0;
              let totalSeats = course.totalSeats;

              if (course.id === "bundle-a1-a2") {
                filledSeats = seatMap[A1_ID] || 0;
              }

              const fillPercentage =
                (filledSeats / totalSeats) * 100;
              const isFull = filledSeats >= totalSeats;

              const currentStatus = statusMap[course.id];

              return (
                <ElectricBorder
                  key={course.id}
                  color={
                    course.id === "bundle-a1-a2"
                      ? "#91e720"
                      : "#fcb251"
                  }
                  speed={0.6}
                  chaos={0.06}
                  borderRadius={38}
                >
                  <div className="a1-card">
                    
                    
                    
                    <div className="seats-pill">
                      <div
                        className="seats-fill"
                        style={{
                          width: `${fillPercentage}%`,
                        }}
                      ></div>
                      <span>
                        {filledSeats} / {course.totalSeats} seats
                        filled
                      </span>
                    </div>

                    {filledSeats >
                      course.totalSeats * 0.7 &&
                      !isFull && (
                        <p className="few-left">
                          ⚠️ Few seats left
                        </p>
                      )}

                    <h3 className="title">{course.title}</h3>
                    <p className="subtitle">
                      {course.subtitle}
                    </p>

                    <p className="date">
                      <Calendar size={18} />
                      <span>{course.startDate}</span>
                    </p>

                    <p className="time">
                      <Clock size={18} />
                      <span>
                        Mon - Fri • {course.time}
                      </span>
                    </p>

                    

                    <div className="price-row">
                      <span className="old-price">€{course.oldPrice}</span>
                      <span className="price">€{course.priceEUR}</span>
                      <span className="discount">
                        {Math.round(
                          ((course.oldPrice - course.priceEUR) / course.oldPrice) * 100
                        )}
                        % OFF
                      </span>
                    </div>

                    <button
                      className="join-btn"
                      onClick={() => {
                        if (!registrationClosed) {
                          setSelectedCourse(course);
                          setShowModal(true);
                        }
                      }}
                      disabled={
                        registrationClosed ||
                        isFull ||
                        currentStatus === "pending" ||
                        currentStatus === "approved" ||
                        currentStatus === "loading"
                      }
                    >
                      {isFull
                        ? "Batch Full"
                        : registrationClosed
                        ? "Registration Closed"
                        : currentStatus === "pending"
                        ? "Request Pending"
                        : currentStatus === "approved"
                        ? "Enrolled"
                        : currentStatus === "loading"
                        ? "Processing..."
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
        course={selectedCourse}
      />
    </section>
  );
}