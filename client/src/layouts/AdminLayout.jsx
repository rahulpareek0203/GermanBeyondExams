import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import "../styles/admin/AdminLayout.css";
import "../styles/admin/AdminSidebar.css";

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <Outlet />
      </div>
    </div>
  );
}