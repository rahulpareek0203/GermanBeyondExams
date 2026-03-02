import { Outlet } from "react-router-dom";
import { useState } from "react";
import StudentSidebar from "../components/students/StudentSidebar";
import "./StudentLayout.css";

export default function StudentLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="student-layout">

      {/* Mobile Header */}
      <div className="mobile-header">
        <button
          className="hamburger"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        <h2 className="mobile-title">Student Panel</h2>
      </div>

      <StudentSidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="student-main">
        <Outlet />
      </div>

    </div>
  );
}