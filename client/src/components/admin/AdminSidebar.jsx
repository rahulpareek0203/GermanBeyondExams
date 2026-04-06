import { NavLink } from "react-router-dom";
import "./AdminSidebar.css";

export default function AdminSidebar({ isOpen, setIsOpen }) {
  return (
    <div className={`admin-sidebar ${isOpen ? "open" : ""}`}>
      <h2 className="admin-logo">Admin Panel</h2>

      <nav onClick={() => setIsOpen(false)}>
        <NavLink to="/admin" end>
          Dashboard
        </NavLink>

        <NavLink to="/admin/requests">
          Requests
        </NavLink>

        <NavLink to="/admin/courses">
          Courses
        </NavLink>

        <NavLink to="/admin/adminStudents">
          Students
        </NavLink>

        <NavLink to="/admin/leaderBoard">
          Leaderboard
        </NavLink>
      </nav>
    </div>
  );
}