
import "./styles/globals.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import SiteLayout from "./layouts/SiteLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Vision from "./pages/Vision";
import Evolution from "./pages/Evolution";

import AdminDashboard from "./pages/admin/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";

import { AuthProvider } from "./context/AuthContext";


export default function App() {
  
  return (

    <AuthProvider>
        <BrowserRouter>
            <Routes>
              <Route element={<SiteLayout />}>

              
                <Route index element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/vision" element={<Vision />} />
                <Route path="/evolution" element={<Evolution />} />

                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/dashboard" element={<StudentDashboard />} />

              </Route>
            </Routes>
        </BrowserRouter>

    </AuthProvider>
    

  
  )
}
