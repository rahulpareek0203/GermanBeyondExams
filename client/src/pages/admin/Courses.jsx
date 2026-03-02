import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./courses.css";
import { apiFetch } from "@/utils/apiFetch";
import { useAuth } from "@/context/AuthContext";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const { logout } = useAuth();

  useEffect(() => {
    const fetchCourses = async () => {
        try {
        const res = await apiFetch(
            "/api/admin/courses",
            {
            method: "GET"
            },
            logout
        );
        const data = await res.json()
        setCourses(data);
        console.log(">>> message from frontend courses file: fetched courses =>", data)
        } catch (err) {
        console.error("Error fetching courses:", err);
        }
    };

    fetchCourses();
    }, []);

  return (
    <div className="admin-page">

      <div className="page-header">
        <h1>Courses</h1>
        <button className="primary-btn">+ Add Course</button>
      </div>

      <div className="glass-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Level</th>
              <th>Status</th>
              <th>Start</th>
              <th>End</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {courses.map(course => (
              <tr key={course.id}>
                <td>{course.title}</td>
                <td>{course.level}</td>
                <td>
                  <span className={`status ${course.status}`}>
                    {course.status}
                  </span>
                </td>
                <td>{course.start_date || "-"}</td>
                <td>{course.end_date || "-"}</td>
                <td>
                  <Link
                    to={`/admin/courses/${course.id}`}
                    className="manage-link"
                  >
                    Manage →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}