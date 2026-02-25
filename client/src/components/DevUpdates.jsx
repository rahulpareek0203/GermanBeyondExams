import "../styles/devupdates.css";
import { BackgroundGradient } from "./ui/BackgroundGradient";

export default function UpcomingBatches() {
  return (
    <BackgroundGradient
      containerClassName="panel-gradient-wrapper"
      className="panel-content"
    >
      <section>
        <div className="panel__header">
          <h3 className="panel__title">🚀 Upcoming Batches</h3>
          <p className="panel__text">
            Choose your level and get ready.
          </p>
        </div>

        <div className="cardlist">

          {/* A1 */}
          <a href="#courses" className="card batch-card batch-card--clickable">
            <div className="batch-card__header">
              <div className="batch-card__title">A1 Beginner</div>
              <div className="batch-card__badge badge--open">
                Registration Open
              </div>
            </div>
            <div className="card__text">
              Perfect for beginners starting their German journey.
            </div>
          </a>

          {/* A2 */}
          <div className="card batch-card">
            <div className="batch-card__header">
              <div className="batch-card__title">A2 Elementary</div>
              <div className="batch-card__badge">Coming Soon</div>
            </div>
            <div className="card__text">
              Gain confidence in everyday conversations.
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
    </BackgroundGradient>
  );

}
