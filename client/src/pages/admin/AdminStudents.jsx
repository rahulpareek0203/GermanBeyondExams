import { useEffect, useState } from "react";
import "./adminStudents.css";
import { apiFetch } from "../../utils/apiFetch.js";
import { useAuth } from "@/context/AuthContext";

export default function AdminStudents() {
  const { logout } = useAuth();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  // 🔥 Extract batch (A1, A2)
  const getBatch = (course) => {
    if (!course) return "Other";
    const match = course.match(/A\d/);
    return match ? match[0] : "Other";
  };

  // 🔥 Fetch enrollments
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await apiFetch("/api/admin/enrollments", {}, logout);
        if (!res) return;

        const data = await res.json();

        // ✅ Only approved = real students
        const approved = data.filter((s) => s.status === "approved");

        setStudents(approved);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching students:", err);
        setLoading(false);
      }
    };

    fetchStudents();
  }, [logout]);

  // 🔥 Filter students by batch
  const filteredStudents =
    filter === "all"
      ? students
      : students.filter(
          (s) => getBatch(s.course_title) === filter
        );

  // 🔥 Count students per batch
  const batchCounts = students.reduce((acc, s) => {
    const batch = getBatch(s.course_title);
    acc[batch] = (acc[batch] || 0) + 1;
    return acc;
  }, {});

  if (loading) return <p style={{ color: "white" }}>Loading...</p>;

  return (
    <div className="students-container">

      {/* HEADER */}
      <div className="students-header">
        <h2>Students Overview</h2>
        <span>{students.length} Total Students</span>
      </div>

      {/* FILTER BUTTONS */}
      <div className="students-filters">
        <button onClick={() => setFilter("all")}>
          All ({students.length})
        </button>

        <button onClick={() => setFilter("A1")}>
          A1 ({batchCounts["A1"] || 0})
        </button>

        <button onClick={() => setFilter("A2")}>
          A2 ({batchCounts["A2"] || 0})
        </button>
      </div>

      {/* TABLE */}
      <div className="students-table-wrapper">
        <table className="students-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Batch</th>
              <th>Joined</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.map((s) => (
              <tr key={s.id}>
                <td>{s.full_name}</td>
                <td>{s.email}</td>

                {/* Batch */}
                <td>
                    <span
                        className={`batch-badge ${getBatch(s.course_title)}`}
                        >
                        {getBatch(s.course_title)}
                    </span>
                </td>

                {/* Date */}
                <td title={s.created_at}>
                  {new Date(s.created_at).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}