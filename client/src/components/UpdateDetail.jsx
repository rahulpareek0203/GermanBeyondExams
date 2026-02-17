import { useState } from "react";
import { FaGithub } from "react-icons/fa";

export default function UpdateDetail({ update }) {
    const [activeImage, setActiveImage] = useState(null);
    if (!update) return null;

    const imageToUse =
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop";


  return (
    <>
    <div className="update-detail">

      {/* Release Header */}
      <div className="release-header">
        <div className="release-title-row">
            <h2>{update.title}</h2>
            <a href={update.commitLink} target="_blank" rel="noopener noreferrer" className="github-link">
                <FaGithub className="github-icon" />
            </a>
        </div>
        
        <p className="release-date">{update.date}</p>
      </div>

      {/* Feature Blocks */}
      <div className="release-feature-grid">
        {update.features.map((feature, index) => (
          <div key={index} className="release-feature-wrapper">

            {/* Simple Block */}
            <div className="release-simple-block">
              <h3>{feature.name}</h3>
              <p>{feature.simple}</p>

                <div className="feature-image">
                    <img
                      src={imageToUse}
                      alt={feature.name}
                    />

                    <div
                      className="expand-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImage(imageToUse);
                      }}
                    >
                      ⤢
                    </div>
                  </div>
            </div>

            {/* Technical Block */}
            <div className="release-technical-block">
              <p>{feature.technical}</p>
            </div>

          </div>
        ))}
      </div>

      {/* Achievement */}
        <div className="release-achievement">

            {/* LEFT SIDE - KEEP AS IS */}
            <div className="growth-visual">
                <div className="growth-circle">↑</div>
                <div className="growth-level">Level Up</div>
            </div>

            {/* RIGHT SIDE - PROGRESS LIST */}
            <div className="growth-progress">

                <div className="progress-row">
                <div className="progress-number">01</div>
                <div className="progress-text">Login & Authentication Flow</div>
                </div>

                <div className="progress-row">
                <div className="progress-number">02</div>
                <div className="progress-text">JWT + Protected Routes</div>
                </div>

                <div className="progress-row">
                <div className="progress-number">03</div>
                <div className="progress-text">Modular System Architecture</div>
                </div>

            </div>

        </div>



    </div>
    {/* Modal */}
      {activeImage && (
        <div className="image-modal" onClick={() => setActiveImage(null)}>
          <div
            className="image-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            

            <img src={activeImage} alt="Preview" />
          </div>
        </div>
      )}

    </>
  );
}
