import { NavLink } from "react-router-dom";

export default function StudentSidebar() {
  return (
    <div className="admin-sidebar">
      <h2 className="admin-logo">Student Panel</h2>

      <nav>
        <NavLink to="/dashboard" end>
          Dashboard
        </NavLink>

        <NavLink to="/dashboard/my-courses">
          My Courses
        </NavLink>

        <NavLink to="/dashboard/enrollments">
          Enrollments
        </NavLink>

        <NavLink to="/dashboard/profile">
          Profile
        </NavLink>
      </nav>
    </div>
  );
}