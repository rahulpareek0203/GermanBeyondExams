import { Outlet } from "react-router-dom";
import { useState } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import "./AdminLayout.css";

export default function AdminLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="admin-layout">

      {/* ✅ Mobile Header */}
      <div className="mobile-header">
        <button
          className="hamburger"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        <h2 className="mobile-title">Admin Panel</h2>
      </div>

      {/* ✅ Sidebar with toggle */}
      <AdminSidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* ✅ Main Content */}
      <div className="admin-main">
        <Outlet />
      </div>

    </div>
  );
}