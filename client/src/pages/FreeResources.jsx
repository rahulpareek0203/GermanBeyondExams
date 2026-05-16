import { useState, useEffect } from "react";
import "../styles/freeResources.css";
import { useAuth } from "@/context/AuthContext";

const API =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

export default function FreeResources() {

  const [resources, setResources] =
    useState([]);

  const [selectedId, setSelectedId] =
    useState(null);

  const [isMobile, setIsMobile] =
    useState(window.innerWidth < 768);

  // POPUP STATE
  const [showPopup, setShowPopup] =
    useState(false);

  const { user } = useAuth();
  const userId = user?.id;

  // =====================================
  // FETCH RESOURCES
  // =====================================

  useEffect(() => {

    const fetchResources = async () => {

      try {

        const res = await fetch(
          `${API}/api/free-resources`
        );

        const data = await res.json();

        setResources(data);

        if (data.length > 0) {
          setSelectedId(data[0].id);
        }

      } catch (error) {

        console.error(
          "Failed to fetch resources:",
          error
        );
      }
    };

    fetchResources();

  }, []);

  // =====================================
  // MOBILE DETECTION
  // =====================================

  useEffect(() => {

    const handleResize = () => {
      setIsMobile(
        window.innerWidth < 768
      );
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );

  }, []);

  // =====================================
  // SHOW POPUP AFTER 10 SECONDS
  // =====================================

  useEffect(() => {

    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 10000);

    return () => clearTimeout(timer);

  }, []);

  // =====================================
  // CARD CLICK
  // =====================================

  const handleClick = (id) => {

    if (isMobile) {

      setSelectedId(
        selectedId === id
          ? null
          : id
      );

    } else {

      setSelectedId(id);
    }
  };

  // =====================================
  // SELECTED RESOURCE
  // =====================================

  const selectedResource =
    resources.find(
      (r) => r.id === selectedId
    );

  return (
    <>
      <div className="resources-page">

        {/* LEFT PANEL */}

        <div className="resources-left">

          {resources.map((resource) => (

            <div
              key={resource.id}
              className="resource-wrapper"
            >

              <div
                className={`resource-card ${
                  selectedId ===
                  resource.id
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  handleClick(resource.id)
                }
              >

                <div className="resource-title">
                  {resource.title}
                </div>

                <div className="resource-date">
                  {resource.date}
                </div>

              </div>

              {/* MOBILE PDF VIEW */}

              {isMobile &&
                selectedId ===
                  resource.id && (

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

        {/* DESKTOP PDF VIEW */}

        {!isMobile && (

          <div className="resources-right">

            {selectedResource && (

              <iframe
                src={
                  selectedResource.pdf_link
                }
                title="PDF Viewer"
                width="100%"
                height="100%"
              />

            )}

          </div>
        )}

      </div>

      {/* =====================================
          COURSE POPUP
      ===================================== */}

      {/* =====================================
    COURSE POPUP
===================================== */}

{showPopup && (

  <div
    className="course-popup-overlay"
    onClick={() =>
      setShowPopup(false)
    }
  >

    <div
      className="course-popup"
      onClick={(e) =>
        e.stopPropagation()
      }
    >

      <button
        className="popup-close"
        onClick={() =>
          setShowPopup(false)
        }
      >
        ×
      </button>

      <div className="popup-badge">
        ENROLLMENT OPEN
      </div>

      <h2 className="popup-title">
        Learn German for
        <span> speaking.</span>
        <br />
        Not for certificates.
      </h2>

      <p className="popup-description">

        No endless grammar drills.
        <br />

        No memorizing random articles.
        <br />

        Learn the German people
        actually speak in real life.

      </p>

      <div className="popup-points">

        <div className="popup-point">
          🇩🇪 Real spoken German
        </div>

        <div className="popup-point">
          🗣 Confidence-focused learning
        </div>

        <div className="popup-point">
          ⚡ Beginner friendly batches
        </div>

      </div>

      <a
        href="/#courses"
        className="popup-btn"
      >
        View Live Batches
      </a>

    </div>

  </div>
)}
    </>
  );
}