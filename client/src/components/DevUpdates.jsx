import { FaGithub } from "react-icons/fa";
import "../styles/devupdates.css";

const UPDATES = [
  {
    date: "Feb 12, 2026",
    title: "Authentication Deployed",
    detail: "JWT login + protected routes added",
    link: "https://github.com/yourusername/repo/commit/abc123",
  },
  {
    date: "Feb 11, 2026",
    title: "Backend Deployment",
    detail: "Netlify functions configured",
    link: "https://github.com/yourusername/repo/commit/def456",
  },
  {
    date: "Feb 10, 2026",
    title: "Hero Redesign",
    detail: "Responsive grid + CTA improvements",
    link: "https://github.com/yourusername/repo/commit/ghi789",
  },
];
import { FaClock } from "react-icons/fa";

export default function UpcomingBatches() {
  return (
    <section className="panel">
      <div className="panel__header">
        <h3 className="panel__title">🚀 Upcoming Batches</h3>
        <p className="panel__text">
          Choose your level and get ready.
        </p>
      </div>

      <div className="cardlist">

        {/* A1 */}
        <div className="card batch-card">
          <div className="batch-card__header">
            <div className="batch-card__title">A1 Beginner</div>
            <div className="batch-card__badge">Coming Soon</div>
          </div>

          <div className="card__text">
            Perfect for beginners starting their German journey.
          </div>
        </div>

        {/* A2 */}
        <div className="card batch-card">
          <div className="batch-card__header">
            <div className="batch-card__title">A2 Elementary</div>
            <div className="batch-card__badge">Coming Soon</div>
          </div>

          <div className="card__text">
            Build confidence and start forming real-life conversations.
          </div>
        </div>

        {/* B1 */}
        <div className="card batch-card">
          <div className="batch-card__header">
            <div className="batch-card__title">B1 Intermediate</div>
            <div className="batch-card__badge">Coming Soon</div>
          </div>

          <div className="card__text">
            Prepare for work, study, and life in Germany.
          </div>
        </div>

      </div>
    </section>
  );
}
