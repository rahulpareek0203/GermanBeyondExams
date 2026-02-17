import "../../styles/ProblemSection.css";


export default function ProblemSection() {
  return (
    <section className="impact">
      <div className="impact__container">

        <div className="impact__header">
          <h2>Why German Changes Your Life in Germany</h2>
          <p>
            German is not just a language — it's access, confidence, and opportunity.
          </p>
        </div>

        <div className="impact__grid">

          <div className="impact__card">
            <div className="impact__icon">🌍</div>
            <h3>Integrate Into Society</h3>
            <p>
              Build real connections, understand culture, and truly belong.
            </p>
          </div>

          <div className="impact__card">
            <div className="impact__icon">💼</div>
            <h3>Higher Job Opportunities</h3>
            <p>
              Access better jobs, promotions, and professional growth.
            </p>
          </div>

          <div className="impact__card">
            <div className="impact__icon">🗣</div>
            <h3>Live — Don’t Just Survive</h3>
            <p>
              Handle daily life, offices, doctors, and contracts confidently.
            </p>
          </div>

          <div className="impact__card">
            <div className="impact__icon">🚀</div>
            <h3>Build Real Confidence</h3>
            <p>
              Speak naturally without fear or hesitation.
            </p>
          </div>

        </div>
      </div>
    </section>

    
  );
}

