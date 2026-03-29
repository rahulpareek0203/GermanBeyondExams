import { useEffect, useState } from "react";
import { apiFetch } from "../../utils/apiFetch";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./enrolledCourses.css";

export default function StudentCourses() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await apiFetch(
          "/api/student/courses/my-courses",
          {},
          logout
        );

        if (!res.ok) {
          console.error("Failed to fetch courses");
          return;
        }

        const data = await res.json();
        setCourses(data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };

    fetchCourses();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
    };

  return (
    <div className="courses-grid">
      {courses.map((course) => {
        const now = new Date();
        const start = new Date(course.start_date);
        const end = new Date(course.end_date);

        let statusText = "Ongoing";
        let statusClass = "status-ongoing";

        if (now < start) {
          statusText = "Starting Soon";
          statusClass = "status-upcoming";
        } else if (now > end) {
          statusText = "Completed";
          statusClass = "status-completed";
        }

        return (
          <div
            key={course.id}
            className="course-card"
            onClick={() => navigate(`/dashboard/resources/${course.id}`)}
            >
            {/* TOP ROW */}
            <div className="card-top">
                <div className={`status-badge ${statusClass}`}>
                {statusText}
                </div>

                <div className="badge">{course.level}</div>
            </div>

            {/* TITLE */}
            <h3>{course.title}</h3>

            {/* DATES */}
            <div className="course-dates">
                {course.start_date && course.end_date
                ? `${formatDate(course.start_date)} → ${formatDate(course.end_date)}`
                : "Dates not available"}
            </div>

            {/* ACTION */}
            <div className="course-action">View materials →</div>
            </div>
        );
      })}
    </div>
  );
}