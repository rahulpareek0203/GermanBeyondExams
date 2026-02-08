import "../styles/hero.css";
import "../styles/layout.css";

const TRACKS = [
  { title: "A1 Foundation", text: "Grammar + daily speaking prompts" },
  { title: "A2 Conversation", text: "Real dialogues & situations" },
  { title: "Beyond Exams", text: "Work + life communication" },
];

export default function Hero() {
  return (
    <section className="hero section">
      <div className="container hero__grid">
        <div>
          <p className="hero__eyebrow">Speak German with confidence.</p>

          <h1 className="hero__title">
            German Beyond Exams —
            <br />
            Real German for real life.
          </h1>

          <p className="hero__text">
            Structured lessons, daily practice, and speaking-focused training so you
            can handle conversations, work, and life in Germany — not just pass tests.
          </p>

          <div className="hero__actions">
            <button className="btn btn--primary" type="button" onClick={() => alert("Courses page later")}>
              View Courses
            </button>
            <button className="btn btn--secondary" type="button" onClick={() => (window.location.hash = "pricing")}>
              See Pricing
            </button>
          </div>

          <div className="hero__badges">
            <span>✅ Beginner friendly</span>
            <span>✅ Speaking practice</span>
            <span>✅ Daily routine</span>
          </div>
        </div>

        <aside className="panel">
          <h3 className="panel__title">Start with a simple plan</h3>
          <p className="panel__text">
            Choose your level, follow the routine, and track your progress.
          </p>

          <div className="cardlist">
            {TRACKS.map((t) => (
              <div className="card" key={t.title}>
                <div className="card__title">{t.title}</div>
                <div className="card__text">{t.text}</div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
