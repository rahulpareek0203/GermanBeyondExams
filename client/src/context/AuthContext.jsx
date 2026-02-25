import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  /* ---------- Check token on app start ---------- */
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);

      // 🔥 Check expiration
      if (decoded.exp * 1000 < Date.now()) {
        logout();
      } else {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      logout();
    }

    setLoading(false);
  }, []);

  /* ---------- Login ---------- */
  const login = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  /* ---------- Logout (ONLY logout logic lives here) ---------- */
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

/* ---------- Custom Hook ---------- */
export function useAuth() {
  return useContext(AuthContext);
}