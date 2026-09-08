import { useState, useEffect } from "react";
import "./EnrollStepperModal.css";

export default function EnrollStepperModal({
  isOpen,
  onClose,
  onConfirm,
  onBundleConfirm,
  course,
}) {
  const [step, setStep] = useState(1);
  const [confirmed, setConfirmed] =
    useState(false);

  const [region, setRegion] =
    useState("germany");

  const [selectedPlan, setSelectedPlan] =
    useState("single");

  // =====================================
  // RESET STATE
  // =====================================

  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setConfirmed(false);
      setRegion("germany");
      setSelectedPlan("single");
    }
  }, [isOpen]);

  if (!isOpen || !course) return null;

  // =====================================
  // COURSE TYPES
  // =====================================

  const isA1 =
    course?.title.includes("A1");

  const hasBundle = isA1;

  // =====================================
  // BUNDLE INFO
  // =====================================

  const bundleTitle = "A1 + A2 Bundle";

  // DISCOUNTED PRICES

  const bundlePriceEUR = 199;

  const bundlePriceINR = 22300;

  // ORIGINAL PRICES

  const originalBundlePriceEUR = 230;

  const originalBundlePriceINR = 25700;

  // =====================================
  // DYNAMIC VALUES
  // =====================================

  const timing =
    region === "germany"
      ? course?.timeGER
      : course?.time;

  const displayPrice =
    selectedPlan === "bundle"
      ? region === "germany"
        ? bundlePriceEUR
        : bundlePriceINR
      : region === "germany"
      ? course?.priceEUR
      : course?.priceINR;

  const duration =
    selectedPlan === "bundle"
      ? "3 Months"
      : "1.5 Months";

  // =====================================
  // STEPPER
  // =====================================

  const nextStep = () => {
    if (step < 5) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // =====================================
  // FINAL ACTION
  // =====================================

  const handleFinalSubmit = () => {
    onClose();

    if (selectedPlan === "single") {
      onConfirm();
    } else {
      onBundleConfirm();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">

        {/* =====================================
            HEADER
        ===================================== */}

        <div className="modal-header">
          <h2 className="modal-title">
            Reserve Your Seat
          </h2>

          <button
            onClick={onClose}
            className="close-btn--modal"
          >
            ×
          </button>
        </div>

        {/* =====================================
            STEPPER
        ===================================== */}

        <div className="stepper">
          {[1, 2, 3, 4, 5].map(
            (num) => (
              <div
                key={num}
                className={`step ${
                  step >= num
                    ? "active"
                    : ""
                }`}
              >
                {num}
              </div>
            )
          )}
        </div>

        <div className="modal-content-course">

          {/* =====================================
              STEP 1
          ===================================== */}

          {step === 1 && (
            <div className="step-content fade personal-step">

              <h3 className="personal-heading">
                Thank You for Believing
                in My Vision.
              </h3>

              <p className="personal-text">
                I’m building this
                platform from scratch —
                designing the structure,
                the learning system, and
                every single button
                myself.
              </p>

              <p className="personal-subtext">
                Secure payment gateway
                integration is currently
                being finalized. Until
                it’s live, enrollment is
                handled directly via
                WhatsApp.
              </p>
            </div>
          )}

          {/* =====================================
              STEP 2 — PLAN SELECTION
          ===================================== */}

          {step === 2 && (
            <div className="step-content fade">

              <h3 className="section-title">
                Choose Your Learning
                Plan
              </h3>

              <div
                className={`plan-selection ${
                  !hasBundle ? "single-plan" : ""
                }`}
              >

                {/* SINGLE PLAN */}

                <div
                  className={`plan-card ${
                    selectedPlan ===
                    "single"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedPlan(
                      "single"
                    )
                  }
                >
                  <h3>
                    {course?.title}
                  </h3>

                  <div className="plan-price">
                    {region ===
                    "germany"
                      ? `€${course?.priceEUR}`
                      : `₹${course?.priceINR}`}
                  </div>

                  <p>
                    Learn one level at a
                    time.
                  </p>
                </div>

                {/* BUNDLE PLAN */}

                {hasBundle && (
                  <div
                    className={`plan-card bundle ${
                      selectedPlan ===
                      "bundle"
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      setSelectedPlan(
                        "bundle"
                      )
                    }
                  >

                    <div className="bundle-tag">
                      BEST VALUE
                    </div>

                    <h3>
                      {bundleTitle}
                    </h3>

                    <div className="bundle-pricing-inline">

                      <span className="original-price-inline">
                        {region ===
                        "germany"
                          ? `€${originalBundlePriceEUR}`
                          : `₹${originalBundlePriceINR}`}
                      </span>

                      <span className="bundle-price-inline">
                        {region ===
                        "germany"
                          ? `€${bundlePriceEUR}`
                          : `₹${bundlePriceINR}`}
                      </span>

                    </div>

                    <p>
                      Save more with 2
                      complete levels.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* =====================================
              STEP 3 — LOCATION
          ===================================== */}

          {step === 3 && (
            <div className="step-content fade">

              <h3 className="section-title">
                Choose Your Location
              </h3>

              <div className="region-toggle">

                <button
                  className={`toggle-btn ${
                    region ===
                    "germany"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setRegion(
                      "germany"
                    )
                  }
                >
                  🇩🇪 Germany
                </button>

                <button
                  className={`toggle-btn ${
                    region ===
                    "india"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setRegion("india")
                  }
                >
                  🇮🇳 India
                </button>
              </div>

              <div className="region-card">

                <div className="info-row">
                  <span>
                    📅 Start Date
                  </span>

                  <strong>
                    {
                      course?.startDate
                    }
                  </strong>
                </div>

                <div className="info-row">
                  <span>
                    🗓 Schedule
                  </span>

                  <strong>
                    Mon – Fri
                  </strong>
                </div>

                <div className="info-row">
                  <span>
                    ⏳ Duration
                  </span>

                  <strong>
                    {duration}
                  </strong>
                </div>

                <div className="info-row">
                  <span>⏰ Time</span>

                  <strong>
                    {timing}
                  </strong>
                </div>
              </div>
            </div>
          )}

          {/* =====================================
              STEP 4 — PRICING
          ===================================== */}

          {step === 4 && (
            <div className="step-content fade">

              <h3 className="section-title">
                Pricing & Payment
              </h3>

              <div className="pricing-card">

                <div className="price-display">

                  {region ===
                  "germany" ? (
                    <>
                      <span className="currency">
                        €
                      </span>

                      <span className="amount">
                        {displayPrice}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="currency">
                        ₹
                      </span>

                      <span className="amount">
                        {displayPrice}
                      </span>
                    </>
                  )}
                </div>

                <div className="price-subtext">
                  {region ===
                  "germany"
                    ? "One-time payment via Bank Transfer (IBAN)"
                    : "One-time payment via UPI or Bank Transfer"}
                </div>
              </div>
            </div>
          )}

          {/* =====================================
              STEP 5 — FINAL
          ===================================== */}

          {step === 5 && (
            <div className="step-content fade">

              <h3 className="section-title">
                Final Confirmation
              </h3>

              <label className="checkbox">

                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={() =>
                    setConfirmed(
                      !confirmed
                    )
                  }
                />

                I confirm that I have
                reviewed the schedule
                and pricing.
              </label>

              <button
                disabled={!confirmed}
                className={`whatsapp-btn ${
                  confirmed
                    ? "enabled"
                    : "disabled"
                }`}
                onClick={
                  handleFinalSubmit
                }
              >
                Continue to WhatsApp
              </button>
            </div>
          )}
        </div>

        {/* =====================================
            FOOTER
        ===================================== */}

        <div className="modal-footer">

          {step > 1 && (
            <button
              onClick={prevStep}
              className="back-btn"
            >
              Back
            </button>
          )}

          {step < 5 && (
            <button
              onClick={nextStep}
              className="next-btn"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
