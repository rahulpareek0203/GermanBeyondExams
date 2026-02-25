import { NavLink } from "react-router-dom";
import "../../styles/admin/AdminLayout.css";
import "../../styles/admin/AdminSidebar.css"

export default function AdminSidebar() {
  return (
    <div className="admin-sidebar">
      <h2 className="admin-logo">Admin Panel</h2>

      <nav>
        <NavLink to="/admin" end>
          Dashboard
        </NavLink>

        <NavLink to="/admin/requests">
          Requests
        </NavLink>

        <NavLink to="/admin/courses">
          Courses
        </NavLink>

        <NavLink to="/admin/students">
          Students
        </NavLink>
      </nav>
    </div>
  );
}
