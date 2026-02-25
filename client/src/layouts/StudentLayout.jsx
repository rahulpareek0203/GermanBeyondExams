import { Outlet } from "react-router-dom";
import StudentSidebar from "../components/students/StudentSidebar";
import "../styles/admin/AdminLayout.css"; 
import "../styles/admin/AdminSidebar.css"; 

export default function StudentLayout() {
  return (
    <div className="admin-layout">
      <StudentSidebar />
      <div className="admin-main">
        <Outlet />
      </div>
    </div>
  );
}