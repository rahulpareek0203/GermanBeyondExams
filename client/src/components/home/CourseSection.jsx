import "./CourseSection.css";
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


export default function CourseSection() {
    
    const courseId = "72d75a4f-2dd9-43b4-beef-f70867acab6d";

    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const { user, logout } = useAuth();
    const [showModal, setShowModal] = useState(false);

    const [status, setStatus] = useState(null);
    // null | pending | approved | rejected | loading

    const [checking, setChecking] = useState(true);

    const totalSeats = 14;
    const filledSeats = 11;

    const fillPercentage = (filledSeats / totalSeats) * 100;

    /*
    1️⃣ Check enrollment status when component loads
    */
    useEffect(() => {
        if (!token) {
            setChecking(false);
            return;
        }

        const fetchStatus = async () => {
            try {
            const res = await apiFetch(
                `/api/enrollments/status/${courseId}`,
                {},
                logout
            );

            if (!res) return; // 401 handled

            if (!res.ok) {
                setChecking(false);
                return;
            }

            const data = await res.json();
            setStatus(data.status);

            } catch (error) {
            console.error("Status fetch error:", error);
            } finally {
            setChecking(false);
            }
        };

        fetchStatus();
    }, [courseId, token, logout]);

    
    /*
        2️⃣ Handle Join Click
    */

    const handleJoin = async () => {
        if (!user) {
            navigate("/login");
            return;
        }

        if (status === "pending" || status === "approved") return;

        try {
            setStatus("loading");

            const res = await apiFetch(
            "/api/enrollments",
            {
                method: "POST",
                body: JSON.stringify({ courseId }),
            },
            logout
            );

            if (!res) return; // 401 auto handled

            const data = await res.json();

            if (res.ok) {
                setStatus("pending");
                alert("Request submitted. Await admin approval");
                sendMessage();   // 🔥 trigger only on success
            } else {
                alert(data.message || "Something went wrong");
                sendMessage();   // 🔥 trigger only on success
                setStatus(null);
            }

        } catch (error) {
            console.error("Join error:", error);
            setStatus(null);
        }
    };

    const sendMessage = () => {
        const message = `
        Hi Rahul, I would like to reserve my seat for German A1 Batch.

        Name: ${user?.full_name || ""}
        Email: ${user?.email || ""}
        User ID: ${user?.id || ""}
        
        Please share the payment details, as i am ready to become a part of this community.
        `;

            const whatsappUrl = `https://wa.me/919462715921?text=${encodeURIComponent(message)}`;

            window.open(whatsappUrl, "_blank");
    };

 

    return(
        <section id="courses" className="a1-section">

            <div className="a1-container">
                <div className="a1-header">
                    <h2>Redefining How German Is Learned.</h2>
                    <p>Not just grammar. Not just rules. Real German for real life in Germany.</p>
                </div>

                <div className="a1-layout">
                    {/* LEFT SIDE – COURSE CARD */}
                    <div className="a1-left">
                        

                        <ElectricBorder
                            color="#fcb251"
                            speed={0.6}
                            chaos={0.06}
                            borderRadius={38}
                            >
                            <div className="a1-card">

                                {/* Seats */}
                                <div className="seats-pill">
                                    <div
                                    className="seats-fill"
                                    style={{ width: `${fillPercentage}%` }}
                                    ></div>
                                    <span>
                                    {filledSeats} / {totalSeats} seats filled
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="title">
                                    German A1 Batch
                                </h3>

                                {/* Subtitle */}
                                <p className="subtitle">
                                    Real German starts at A1. Build it right from day one.
                                </p>

                                {/* Date */}
                                <p className="date">
                                    <Calendar size={18} />
                                    <span>Starting 1st March</span>
                                </p>

                                {/* Time */}
                                <p className="time">
                                    <Clock size={18} />
                                    <span>Mon - Fri • 3:00 - 6:30 PM CET (Berlin)</span>
                                </p>

                                {/* Price */}
                                <div className="price-row">
                                    <span className="old-price">€75</span>
                                    <span className="price">€50</span>
                                    <span className="discount">33% OFF</span>
                                </div>

                                {/* Button */}
                                <button
                                    className="join-btn"
                                    onClick={() => setShowModal(true)}
                                    disabled={
                                        status === "pending" ||
                                        status === "approved" ||
                                        status === "loading"
                                    }
                                    >
                                    {status === "pending"
                                        ? "Request Pending"
                                        : status === "approved"
                                        ? "Enrolled"
                                        : status === "loading"
                                        ? "Processing..."
                                        : "Join A1 Batch"}
                                </button>

                            </div>

                        </ElectricBorder>
                    </div>

                    {/* RIGHT SIDE – FEATURES */}
                    <div className="a1-right">
                    <div className="a1-features">

                        {/* 1 */}
                        <div className="a1-feature">
                        <div className="a1-feature-top">
                            <div className="a1-feature-icon">
                            <FiMic />
                            </div>
                            <h4>Speak from Day 1</h4>
                        </div>
                        <p>
                            Every class includes active speaking practice so you start communicating immediately.
                        </p>
                        </div>

                        {/* 2 */}
                        <div className="a1-feature">
                        <div className="a1-feature-top">
                            <div className="a1-feature-icon">
                            <FiBookOpen />
                            </div>
                            <h4>Grammar Made Logical</h4>
                        </div>
                        <p>
                            Understand patterns and structures clearly instead of memorising random rules.
                        </p>
                        </div>

                        {/* 3 */}
                        <div className="a1-feature">
                        <div className="a1-feature-top">
                            <div className="a1-feature-icon">
                            <FiUsers />
                            </div>
                            <h4>Small Focused Batches</h4>
                        </div>
                        <p>
                            Limited students per batch to ensure personal attention and direct feedback.
                        </p>
                        </div>

                        {/* 4 */}
                        <div className="a1-feature">
                        <div className="a1-feature-top">
                            <div className="a1-feature-icon">
                            <FiHelpCircle />
                            </div>
                            <h4>Weekly Doubt Sessions</h4>
                        </div>
                        <p>
                            Dedicated weekly sessions only for clearing doubts and strengthening concepts.
                        </p>
                        </div>

                        {/* 5 */}
                        <div className="a1-feature">
                        <div className="a1-feature-top">
                            <div className="a1-feature-icon">
                            <FiMap />
                            </div>
                            <h4>Real-Life Scenarios</h4>
                        </div>
                        <p>
                            Practice situations like doctor visits, offices, interviews and daily conversations.
                        </p>
                        </div>

                        {/* 6 */}
                        <div className="a1-feature">
                        <div className="a1-feature-top">
                            <div className="a1-feature-icon">
                            <FiTrendingUp />
                            </div>
                            <h4>Confidence Training</h4>
                        </div>
                        <p>
                            Build fluency, reduce hesitation and gain the confidence to speak naturally.
                        </p>
                        </div>

                    </div>
                    </div>

                </div>
            </div>
            <EnrollStepperModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleJoin}
                />
        </section>
    )
}