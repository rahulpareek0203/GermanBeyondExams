import { useState, useEffect } from "react";
import "./EnrollStepperModal.css";

export default function EnrollStepperModal({ isOpen, onClose, onConfirm, course }) {
  const [step, setStep] = useState(1);
  const [confirmed, setConfirmed] = useState(false);
  const [region, setRegion] = useState("germany");

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setConfirmed(false);
      setRegion("germany");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const price =
    region === "germany"
      ? `€${course?.priceEUR}`
      : `₹${course?.priceINR}`;
  
  const timing =
    region === "germany"
      ? course?.timeGER
      : course?.time;

  

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">

        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title">Reserve Your Seat</h2>
          <button onClick={onClose} className="close-btn--modal">×</button>
        </div>

        {/* Step Indicator */}
        <div className="stepper">
          {[1, 2, 3, 4].map((num) => (
            <div
              key={num}
              className={`step ${step >= num ? "active" : ""}`}
            >
              {num}
            </div>
          ))}
        </div>

        <div className="modal-content-course">

          {/* STEP 1 */}
          {step === 1 && (
            <div className="step-content fade personal-step">
              <h3 className="personal-heading">
                Thank You for Believing in My Vision.
              </h3>

              <p className="personal-text">
                I’m building this platform from scratch — designing the structure,
                the learning system, and every single button myself.
              </p>

              <p className="personal-subtext">
                Secure payment gateway integration is currently being finalized.
                Until it’s live, enrollment is handled directly via WhatsApp.
              </p>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="step-content fade">

              <h3 className="section-title">Choose Your Location</h3>

              <div className="region-toggle">
                <button
                  className={`toggle-btn ${region === "germany" ? "active" : ""}`}
                  onClick={() => setRegion("germany")}
                >
                  🇩🇪 Germany
                </button>

                <button
                  className={`toggle-btn ${region === "india" ? "active" : ""}`}
                  onClick={() => setRegion("india")}
                >
                  🇮🇳 India
                </button>
              </div>

              <div className="region-card">

                <div className="info-row">
                  <span>📅 Start Date</span>
                  <strong>{course?.startDate}</strong>
                </div>

                <div className="info-row">
                  <span>🗓 Schedule</span>
                  <strong>Mon – Fri</strong>
                </div>

                <div className="info-row">
                  <span>⏳ Duration</span>
                  <strong>{course?.id === "bundle-a1-a2" ? "3 Months" : "1.5 Months"}</strong>
                </div>

                <div className="info-row">
                  <span>⏰ Time</span>
                  <strong>{timing}</strong>
                </div>

              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="step-content fade">

              <h3 className="section-title">Pricing & Payment</h3>

              <div className="region-toggle">
                <button
                  className={`toggle-btn ${region === "germany" ? "active" : ""}`}
                  onClick={() => setRegion("germany")}
                >
                  🇩🇪 Germany
                </button>

                <button
                  className={`toggle-btn ${region === "india" ? "active" : ""}`}
                  onClick={() => setRegion("india")}
                >
                  🇮🇳 India
                </button>
              </div>

              <div className="pricing-card">

                <div className="price-display">
                  {region === "germany" ? (
                    <>
                      <span className="currency">€</span>
                      <span className="amount">{course?.priceEUR}</span>
                    </>
                  ) : (
                    <>
                      <span className="currency">₹</span>
                      <span className="amount">{course?.priceINR}</span>
                    </>
                  )}
                </div>

                <div className="price-subtext">
                  {region === "germany"
                    ? "One-time payment via Bank Transfer (IBAN)"
                    : "One-time payment via UPI or Bank Transfer"}
                </div>

              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="step-content fade">

              <h3 className="section-title">Final Confirmation</h3>

              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={() => setConfirmed(!confirmed)}
                />
                I confirm that I have reviewed the schedule and pricing.
              </label>

              <button
                disabled={!confirmed}
                className={`whatsapp-btn ${confirmed ? "enabled" : "disabled"}`}
                onClick={() => {
                    onClose();
                    onConfirm();
                }}
                >
                Continue to WhatsApp
              </button>

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="modal-footer">
          {step > 1 && (
            <button onClick={prevStep} className="back-btn">
              Back
            </button>
          )}

          {step < 4 && (
            <button onClick={nextStep} className="next-btn">
              Next →
            </button>
          )}
        </div>

      </div>
    </div>
  );
}