
import "./styles/globals.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import SiteLayout from "./layouts/SiteLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

export default function App() {
  
  return (

    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>

        
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

        </Route>
      </Routes>
   </BrowserRouter>

  
  )
}
