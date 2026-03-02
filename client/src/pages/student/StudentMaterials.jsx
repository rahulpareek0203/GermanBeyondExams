import { useEffect, useState } from "react";
import { apiFetch } from "../../utils/apiFetch";
import { useAuth } from "../../context/AuthContext";
import "./studentmaterials.css";

export default function StudentA1() {
  const { logout } = useAuth();

  const [materials, setMaterials] = useState([]);
  const [activeTab, setActiveTab] = useState("class_recording");
  const [activeDay, setActiveDay] = useState(0);

  const [errorMessage, setErrorMessage] = useState(null);

  // 🔹 Replace with actual courseId later (dynamic)
  const courseId = "72d75a4f-2dd9-43b4-beef-f70867acab6d";

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await apiFetch(
          `/api/student/courses/${courseId}/materials`,
          { method: "GET" },
          logout
        );

        if (!response) return;

        const data = await response.json();

        if (!response.ok) {
          // 🔴 Backend sent error
          setErrorMessage(data.message || "Access denied");
          setMaterials([]);
          return;
        }

        // ✅ Success
        setErrorMessage(null);
        setMaterials(data);

      } catch (err) {
        console.error(err);
        setErrorMessage("Something went wrong.");
      }
  };

  fetchMaterials();
}, [courseId]);

  const selectedMaterial = materials[activeDay];

  const selectedPdf =
    selectedMaterial &&
    {
      class_recording: selectedMaterial.class_recording_link,
      notes: selectedMaterial.notes_link,
      homework: selectedMaterial.homework_link,
    }[activeTab];

  
  if (errorMessage) {
    return (
      <div className="materials-wrapper">
        <div className="access-error">
          {errorMessage}
        </div>
      </div>
    );
  }

  return (
    <div className="materials-wrapper">

      {/* TOP PILLS */}
      <div className="top-tabs">
        {["class_recording", "notes", "homework"].map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active-pill-resources" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "class_recording" && "Class Recording"}
            {tab === "notes" && "Class Notes"}
            {tab === "homework" && "Homework"}
          </button>
        ))}
      </div>

      <div className="materials-body">

        {/* LEFT DAY LIST */}
        <div className="day-column">
          {materials.map((item, index) => (
            <div
              key={item.id}
              className={`day-card ${
                activeDay === index ? "active-day" : ""
              }`}
              onClick={() => setActiveDay(index)}
            >
              <div className="day-title">{item.title}</div>
              <div className="day-date">
                {new Date(item.material_date).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>

        {/* PDF VIEWER */}
        <div className="pdf-container">
          {selectedPdf ? (
            <iframe src={selectedPdf} title="PDF Viewer" />
          ) : (
            <div style={{ padding: "40px", color: "#94a3b8" }}>
              No document available.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}