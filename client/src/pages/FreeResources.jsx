import { useState, useEffect } from "react";
import "../styles/freeResources.css";
import { useAuth } from "@/context/AuthContext";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function FreeResources() {
  const [resources, setResources] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const { user } = useAuth(); // kept (in case you use it elsewhere)
  const userId = user?.id;

  // Fetch resources from backend
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await fetch(`${API}/api/free-resources`);
        const data = await res.json();

        setResources(data);

        if (data.length > 0) {
          setSelectedId(data[0].id);
        }
      } catch (error) {
        console.error("Failed to fetch resources:", error);
      }
    };

    fetchResources();
  }, []);

  // Detect screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Simplified click handler (no lock logic)
  const handleClick = (id) => {
    if (isMobile) {
      setSelectedId(selectedId === id ? null : id);
    } else {
      setSelectedId(id);
    }
  };

  const selectedResource = resources.find((r) => r.id === selectedId);

  return (
    <>
      <div className="resources-page">

        {/* LEFT PANEL */}
        <div className="resources-left">
          {resources.map((resource) => (
            <div key={resource.id} className="resource-wrapper">

              <div
                className={`resource-card ${
                  selectedId === resource.id ? "active" : ""
                }`}
                onClick={() => handleClick(resource.id)}
              >
                <div className="resource-title">
                  {resource.title}
                </div>
                <div className="resource-date">{resource.date}</div>
              </div>

              {/* MOBILE PDF VIEW → ALWAYS OPEN */}
              {isMobile && selectedId === resource.id && (
                <div className="mobile-pdf open">
                  <iframe
                    src={resource.pdf_link}
                    title="PDF Viewer"
                  />
                </div>
              )}

            </div>
          ))}
        </div>

        {/* DESKTOP VIEW */}
        {!isMobile && (
          <div className="resources-right">
            {selectedResource && (
              <iframe
                src={selectedResource.pdf_link}
                title="PDF Viewer"
                width="100%"
                height="100%"
              />
            )}
          </div>
        )}

      </div>
    </>
  );
}