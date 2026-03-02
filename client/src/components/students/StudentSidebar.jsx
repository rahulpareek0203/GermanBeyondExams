import { NavLink } from "react-router-dom";
import "./StudentSidebar.css"

export default function StudentSidebar({ isOpen, setIsOpen }) {
  return (
    <div className={`student-sidebar ${isOpen ? "open" : ""}`}>
      <h2 className="student-logo">Student Panel</h2>

      <nav onClick={() => setIsOpen(false)}> 
        <NavLink to="/dashboard" end>
          Dashboard
        </NavLink>

        <NavLink to="/dashboard/my-courses">
          My Courses
        </NavLink>

        <NavLink to="/dashboard/resources">
          Resources
        </NavLink>

        <NavLink to="/dashboard/profile">
          Profile
        </NavLink>
      </nav>
    </div>
  );
}