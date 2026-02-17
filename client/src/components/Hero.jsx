import "../styles/hero.css";
import "../styles/layout.css";
import DevUpdates from "./DevUpdates";

const TRACKS = [
  { title: "A1 Foundation", text: "Grammar + daily speaking prompts" },
  { title: "A2 Conversation", text: "Real dialogues & situations" },
  { title: "Beyond Exams", text: "Work + life communication" },
];


export default function Hero() {
  return (
    <section className="hero">
      <div className="hero_container">
        <div className="hero__grid">

          {/* LEFT SIDE */}
          <div className="hero__content">
            <p className="hero__eyebrow">
              Speak German with confidence.
            </p>

            <h1 className="hero__title">
              German Beyond Exams
              <br />
              Real German for Real Life.
            </h1>

            <p className="hero__text">
              Structured lessons, daily practice, and speaking-focused training so you
              can handle conversations, work, and life in Germany — not just pass tests.
            </p>

            <div className="hero__actions">
              <button
                className="btn btn--primary"
                type="button"
                onClick={() => alert("Courses page later")}
              >
                View Courses
              </button>

              <button
                className="btn btn--secondary"
                type="button"
                onClick={() => (window.location.hash = "pricing")}
              >
                See Pricing
              </button>
            </div>

            <div className="hero__badges">
              <span>✅ Beginner friendly</span>
              <span>✅ Speaking practice</span>
              <span>✅ Daily routine</span>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <DevUpdates />

        </div>
      </div>
    </section>
  );
}

