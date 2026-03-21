import { useState, useEffect } from "react";
import "../styles/freeResources.css";
import { useAuth } from "@/context/AuthContext";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000"

export default function FreeResources() {

  const [resources, setResources] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);


  const [unlockedResources, setUnlockedResources] = useState([]);
  const [enteredCode, setEnteredCode] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [pendingResourceId, setPendingResourceId] = useState(null);
  const [error, setError] = useState("");

  const { user } = useAuth();
  const userId = user?.id;

  const [showHelp, setShowHelp] = useState(false);

  // Fetch resources from backend
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await fetch(`${API}/api/free-resources`);
        const data = await res.json();

        setResources(data);

        // select first resource by default
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

  const handleClick = (id) => {
    const isUnlocked = unlockedResources.includes(id);

    if (!isUnlocked) {
      // open modal instead of selecting directly
      setPendingResourceId(id);
      setShowModal(true);
    } else {
      // already unlocked → open normally
      if (isMobile) {
        setSelectedId(selectedId === id ? null : id);
      } else {
        setSelectedId(id);
      }
    }

    setEnteredCode("");
  };

  const selectedResource = resources.find(r => r.id === selectedId);

  useEffect(() => {
  const fetchUnlocked = async () => {
    try {
      const res = await fetch(
        `${API}/api/user/unlocked-resources/${userId}`
      );
      const data = await res.json();

      setUnlockedResources(data); // [1,2,3]
    } catch (err) {
      console.error(err);
    }
  };

  fetchUnlocked();
}, []);

const handleAccess = async () => {
  try {
    const res = await fetch(`${API}/api/verify-code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: enteredCode,
        resourceId: pendingResourceId,
        userId,
      }),
    });

    if (res.ok) {
      setUnlockedResources(prev => [...prev, pendingResourceId]);
      setSelectedId(pendingResourceId);

      setShowModal(false);
      setPendingResourceId(null);
      setEnteredCode("");
      setError(""); // reset error
    } else {
      setError("❌ Invalid access code");
    }
  } catch (err) {
    console.error(err);
    setError("Something went wrong. Try again.");
  }
};

  const isUnlocked = unlockedResources.includes(selectedId);

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
                {!unlockedResources.includes(resource.id) && (
                  <span className="lock"> 🔒</span>
                )}
              </div>
              <div className="resource-date">{resource.date}</div>
            </div>

            {/* ❗ MOBILE PDF VIEW → ONLY SHOW IF UNLOCKED */}
            {isMobile && selectedId === resource.id && (
              <div className="mobile-pdf open">
                {unlockedResources.includes(resource.id) ? (
                  <iframe
                    src={resource.pdf_link}
                    title="PDF Viewer"
                  />
                ) : null}
              </div>
            )}

          </div>
        ))}
      </div>

      {/* DESKTOP VIEW */}
      {!isMobile && (
        <div className="resources-right">
          {selectedResource && isUnlocked && (
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

    {/* ✅ MODAL OUTSIDE MAIN DIV */}
    {showModal && (
  <div className="modal-overlay">
    <div className={`modal-box ${error ? "shake" : ""}`}>

  {/* 🔁 CONDITIONAL CONTENT */}
  {!showHelp ? (
    <>
      <h2>🔐 Access Required</h2>

      <input
        type="text"
        value={enteredCode}
        onChange={(e) => {
          setEnteredCode(e.target.value);
          setError("");
        }}
        placeholder="Enter access code"
      />

      {error && <div className="error-text"> {error}</div>}

      <div className="modal-actions">
        <button className="unlock-btn" onClick={handleAccess}>
          Unlock
        </button>

        <button
          className="cancel-btn"
          onClick={() => {
            setShowModal(false);
            setPendingResourceId(null);
            setShowHelp(false); // reset
          }}
        >
          Cancel
        </button>
      </div>

      {/* 👇 NEW BUTTON */}
      <button
        className="help-btn"
        onClick={() => setShowHelp(true)}
      >
        Don’t have access code?
      </button>
    </>
  ) : (
    <>
      <h2>🎬 Get Your Access Code</h2>

      <p className="modal-instruction">
        👉 Watch the reel, comment the keyword mentioned,
        and receive your access code.
      </p>

      <a
        href={resources.find(r => r.id === pendingResourceId)?.reel_link}
        target="_blank"
        rel="noopener noreferrer"
        className="reel-btn"
      >
        🎬 Watch Reel
      </a>

      {/* 👇 BACK BUTTON */}
      <button
        className="back-btn"
        onClick={() => setShowHelp(false)}
      >
        ← Back to code entry
      </button>
    </>
  )}

</div>
  </div>
)}
  </>
);
}