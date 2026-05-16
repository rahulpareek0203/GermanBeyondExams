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
    id: "36348ce7-6501-4586-95c2-c0a3b814b485",
    title: "German A1 Batch",
    subtitle: "Real German starts at A1. Build it right from day one.",
    startDate: "Starting 1st June",
    time: "6:00 - 7:30 PM IST",
    timeGER: "2:30 - 4:00 PM CET",
    priceEUR: 99,
    oldPrice: 120,
    priceINR: 11200,
    totalSeats: 15,
  },  
  
  {
    id: "44a01bb0-f5e7-46e5-bcc3-46df972c7a6e",
    title: "German A2 Batch",
    subtitle: "Take your German to the next level with real conversations.",
    startDate: "Starting 1st June",
    time: "7:30 - 9:00 PM IST",
    timeGER: "4:00 - 5:30 PM CET",
    priceEUR: 130,
    oldPrice: 150,
    priceINR: 14500,
    totalSeats: 15,
  },

  {
    id: "655da85d-5864-4c1f-bf46-292274763f5f",
    title: "German B1 Batch",
    subtitle: "Speak more fluently, think faster, and communicate naturally in German.",
    startDate: "Starting 1st June",
    time: "9:15 - 10:45 PM IST",
    timeGER: "5:45 - 7:15 PM CET",
    priceEUR: 150,
    oldPrice: 175,
    priceINR: 16750,
    totalSeats: 15,
  },
  
];

const bundles = {
  "36348ce7-6501-4586-95c2-c0a3b814b485": {
    title: "A1 + A2 Bundle",
    courses: ["German A1 Batch", "German A2 Batch"],
    originalPrice: 249,
    discountedPrice: 199,
  },

  "44a01bb0-f5e7-46e5-bcc3-46df972c7a6e": {
    title: "A2 + B1 Bundle",
    courses: ["German A2 Batch", "German B1 Batch"],
    originalPrice: 280,
    discountedPrice: 229,
  },
};

export default function CourseSection() {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { user, logout } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const registrationClosed = false;

  const [seatMap, setSeatMap] = useState({});
  const [statusMap, setStatusMap] = useState({});
  const [checking, setChecking] = useState(true);

  const totalSeats = 15;
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
        sendMessage(course.title);
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

  const handleBundleEnrollment = async (course) => {
    if (!user) {
      navigate("/login");
      return;
    }
    
    try {
      // =====================================
      // ENROLL ONLY CURRENT COURSE
      // =====================================

      const res = await apiFetch("/api/enrollments", 
                          {
                            method: "POST",
                            body: JSON.stringify({
                              courseId: course.id
                            }),
                          },
                          logout
                          )

      if(!res) return;

      const data = await res.json();

      if (!res.ok) {
        alert( data.message || "Bundle Enrollment Failed")
        return;
      }

      // creating the Bundle Name for the whatsapp message

      let bundleName = "";

      if(course.title.includes("A1")) bundleName = "A1 + A2 Bundle"
      else if (course.title.includes("A2")) bundleName = "A2 + B1 Bundle"

      // Success

      alert("Bundle request submitted successfully!")

      sendMessage(bundleName)


    } catch (error) {
      
    }
          
  }

  const sendMessage = (courseName) => {
    const message = `
      Hi Rahul, I would like to reserve my seat for ${courseName}.

      Name: ${user?.full_name || ""}
      Email: ${user?.email || ""}
      User ID: ${user?.id || ""}

      Please share the payment details, as I am ready to join.
      `;

    const whatsappUrl = `https://wa.me/491725936119?text=${encodeURIComponent(
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
              let filledSeatsRaw = seatMap[course.id] || 0;
              let totalSeats = course.totalSeats;

              if (course.id === "bundle-a1-a2") {
                filledSeatsRaw = seatMap[A1_ID] || 0;
              }
              
              // ✅ clamp so UI never exceeds max
              const filledSeats = Math.min(filledSeatsRaw, totalSeats);

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

                    <h3 className="course_title">{course.title}</h3>
                    <p className="course_subtitle">
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

                      disabled={
                        registrationClosed ||
                        currentStatus === "pending" ||
                        currentStatus === "approved" ||
                        currentStatus === "loading"
                      }

                      onClick={() => {
                        if(registrationClosed) return;

                        setSelectedCourse(course)
                        setShowModal(true)
                      }}
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
        onBundleConfirm = {() => handleBundleEnrollment(selectedCourse)}
        course={selectedCourse}

      />
    </section>
  );
}