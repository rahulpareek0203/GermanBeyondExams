import { useEffect, useState } from "react";
import "../../styles/admin/adminRequests.css";
import {apiFetch} from "../../utils/apiFetch.js"
import { useAuth } from "@/context/AuthContext";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Requests() {
  
    const { logout } = useAuth();

    const [requests, setRequests] = useState([])
    const [loading, setLoading] = useState(true)

    //Fetch real data from Database
    useEffect(() =>{

        const fetchRequests = async() => {
            try {
                const res = await apiFetch("/api/admin/enrollments", {}, logout);

                // 🔥 If token expired → apiFetch already logged out
                if (!res) return;

                const data = await res.json()
                console.log(">>> Data has been recieved from enrollment Table as follows:", data)
                setRequests(data)
                setLoading(false)

            } catch (error) {
                console.error("Error fetching enrollments in Requests.jsx Page:", error);
                setLoading(false);
            }
        }

        fetchRequests();
    }, [logout])

    // 🔹 Approve / Reject
    const handleAction = async (id, action) => {
        
        try {
            
            const res = await apiFetch(
                `/api/admin/enrollments/${id}`,
                {
                method: "PATCH",
                body: JSON.stringify({ action }),
                },
                logout
            );

            if (!res) return;

            setRequests(prev =>
                prev.map(req =>
                req.id === id ? { ...req, status: action } : req
                )
            );
            
        } catch (error) {
            console.error("Error updating enrollment:", error);
        }
    };

    if (loading) return <p style={{ color: "white" }}>Loading...</p>;

    return (
        <div className="requests-container">
        <div className="requests-header">
            <h2>Course Join Requests</h2>
            <span>{requests.length} Total Requests</span>
        </div>

        <div className="requests-table-wrapper">
            <table className="requests-table">
            <thead>
                <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
                </tr>
            </thead>

            <tbody>
                {requests.map((req) => (
                <tr key={req.id}>
                    <td>{req.full_name}</td>
                    <td>{req.email}</td>
                    <td>{req.course_title}</td>
                    <td>{req.created_at}</td>

                    <td>
                    <span className={`status ${req.status}`}>
                        {req.status}
                    </span>
                    </td>

                    <td>
                    {req.status === "pending" ? (
                        <div className="action-buttons">
                        <button
                            className="accept-btn"
                            onClick={() => handleAction(req.id, "approved")}
                        >
                            Accept
                        </button>

                        <button
                            className="reject-btn"
                            onClick={() => handleAction(req.id, "rejected")}
                        >
                            Reject
                        </button>
                        </div>
                    ) : (
                        <span className="done-text">Completed</span>
                    )}
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    );
}
