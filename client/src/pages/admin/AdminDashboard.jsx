import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(">>> message from frontend (admindashboard) Token:", token)

        const res = await fetch(`${API}/api/admin/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,           // here we are making a header and sending it as req in backend which can be used to get JWT
          },
        });

        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.message || "Access denied");
        }

        setData(result);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchAdminData();
  }, []);

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1>Admin Dashboard</h1>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {data && (
          <>
            <p style={badgeStyle}>✅ You are an Admin</p>

            <div>
              <p><strong>User ID:</strong> {data.user.id}</p>
              <p><strong>Email:</strong> {data.user.email}</p>
              <p><strong>Role:</strong> {data.user.role}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const containerStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f3f4f6",
};

const cardStyle = {
  background: "white",
  padding: "40px",
  borderRadius: "12px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  width: "400px",
};

const badgeStyle = {
  background: "#dcfce7",
  color: "#166534",
  padding: "6px 12px",
  borderRadius: "999px",
  display: "inline-block",
  marginBottom: "20px",
};
