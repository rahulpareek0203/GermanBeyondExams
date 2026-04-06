
import "./styles/globals.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import SiteLayout from "./layouts/SiteLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Vision from "./pages/Vision";
import Evolution from "./pages/Evolution";
import ProfileInfoPage from "./pages/commonSpace/ProfileInfo";

import AdminDashboard from "./pages/admin/AdminDashboard";


import { AuthProvider } from "./context/AuthContext";
import RoleRoute from "./components/RoleRoute";
import AdminLayout from "./layouts/AdminLayout";
import StudentLayout from "./layouts/StudentLayout";
import Requests from "./pages/admin/Requests";
import StudentA1 from "./pages/student/StudentMaterials";
import Courses from "./pages/admin/Courses";
import ManageCourse from "./pages/admin/ManageCourse";
import FreeResources from "./pages/FreeResources";
import AdminStudents from "./pages/admin/AdminStudents";
import StudentCourses from "./pages/student/EnrolledCourses";
import StudentMaterials from "./pages/student/StudentMaterials";
import StudentDashboard from "./pages/student/StudentDashboard";
import AddExamResult from "./pages/admin/LeaderBoard";

export default function App() {
  
  return (

    <BrowserRouter>
        <AuthProvider>
            <Routes>
              <Route element={<SiteLayout />}>
              
                <Route index element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/vision" element={<Vision />} />
                <Route path="/evolution" element={<Evolution />} />
                
                {/* ================= COMMON PROTECTED AREA ================= */}

                <Route
                  path="/free-resources"
                  element={
                    <RoleRoute allowedRoles={["student", "admin"]}>
                      <FreeResources />
                    </RoleRoute>
                  }
                />
                {/* ================= STUDENT AREA ================= */}
                <Route
                  path="/dashboard"
                  element={
                    <RoleRoute allowedRoles={["student", "admin"]}>
                      <StudentLayout />
                    </RoleRoute>
                  } 
                >
                  <Route index element={<StudentDashboard />} />
                  <Route path="profile" element={<ProfileInfoPage />} />
                  <Route path="resources" element={<StudentCourses  />} />
                  <Route path="resources/:courseId" element={<StudentMaterials />} />
                </Route>

                {/* <Route
                  path="/dashboard"
                  element={
                    <StudentLayout />
                  }
                >
                  
                  <Route path="profile" element={<ProfileInfoPage />} />
                  <Route path="resources" element={<StudentA1 />} />
                </Route> */}

                {/* ================= ADMIN AREA ================= */}
                <Route
                  path="/admin"
                  element={
                    <RoleRoute allowedRoles={["admin"]}>
                      <AdminLayout />
                    </RoleRoute>
                  }
                >
                  {/* Routes for Admin Dashboard features */}
                  <Route index element={<AdminDashboard />} />
                  <Route path="requests" element={<Requests />} />
                  <Route path="profile" element={<ProfileInfoPage />} />
                  <Route path="courses" element={<Courses />}/>
                  <Route path="courses/:courseId" element={<ManageCourse />} />
                  <Route path="adminStudents" element={<AdminStudents />} />
                  <Route path="leaderBoard" element={<AddExamResult />} />
                </Route>


              </Route>
            </Routes>
        </AuthProvider>

    </BrowserRouter>
    

  
  )
}
