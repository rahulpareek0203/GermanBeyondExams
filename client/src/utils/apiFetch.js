const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const apiFetch = async (endpoint, options = {}, logout) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API}${endpoint}`, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: token ? `Bearer ${token}` : undefined,
        "Content-Type": "application/json",
      },
    });

    // 🔐 If backend says unauthorized → logout
    if (response.status === 401) {
      if (logout) logout();
      return null;
    }

    return response;

  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};