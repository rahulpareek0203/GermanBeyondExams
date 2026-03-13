import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoleRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // ⛔ Wait until auth state loads
  console.log(">>> loading from authcontext was:", loading)
  if (loading) {
    console.log(">>> loading from authcontext was returned as true")
    return null; // or spinner
  }

  // Not logged in
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}   // ⭐ save previous page
      />
    );
  }

  // Logged in but wrong role
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default RoleRoute;
