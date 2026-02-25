// ==============================
// Global Styles
// ==============================
import "../styles/layout.css";
import "../styles/vision.css";

// ==============================
// UI Components
// ==============================
import { LiquidMetalButton } from "@/components/ui/liquid-metal";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";


// ======================================================
// Vision Page Component
// ======================================================
export default function Vision() {
  
  const navigate = useNavigate();

  return (
    <main className="vision section">
      <div className="container vision__container">
        

        {/* ======================================================
            HERO SECTION
            Short emotional introduction of the platform vision
        ====================================================== */}
        <section className="vision__hero">
          <p className="vision__eyebrow">Our Vision</p>

          <h1 className="vision__title">
            German is not an exam.
            <br />
            It is a life skill.
          </h1>

          <p className="vision__text">
            This platform was built on a simple belief: language learning
            should prepare you for real conversations, real workplaces,
            and real life in Germany — not just certificates.
          </p>
        </section>



        {/* ======================================================
            COMMON LEARNING MISTAKES SECTION
            Highlights the 4 key mistakes learners make
        ====================================================== */}
        <section className="mistakes visionSection">
          <div className="container_vision">

            <h2 className="mistakes__title">
              The 4 Mistakes That Keep Learners Stuck
            </h2>

            <div className="mistakes__grid">

              {/* Mistake 01 */}
              <div className="mistake">
                <div className="mistake__content">
                  <h3>Fear of Mistakes</h3>
                  <p>Mistakes are the process. Silence is the real mistake.</p>
                </div>
                <span className="mistake__number">01</span>
              </div>

              {/* Mistake 02 */}
              <div className="mistake">
                <div className="mistake__content">
                  <h3>Ignoring the Basics</h3>
                  <p>Weak foundations make advanced grammar useless.</p>
                </div>
                <span className="mistake__number">02</span>
              </div>

              {/* Mistake 03 */}
              <div className="mistake">
                <div className="mistake__content">
                  <h3>No 80/20 Focus</h3>
                  <p>20% of language creates 80% of conversations.</p>
                </div>
                <span className="mistake__number">03</span>
              </div>

              {/* Mistake 04 */}
              <div className="mistake">
                <div className="mistake__content">
                  <h3>Delaying Speaking</h3>
                  <p>Speaking must start at A1 — not B1.</p>
                </div>
                <span className="mistake__number">04</span>
              </div>

            </div>
          </div>
        </section>



        {/* ======================================================
            MANIFESTO SECTION
        ====================================================== */}
        <section className="vision__story">

          <h2 className="story__main-title">Why I Built This</h2>

          <div className="story__grid">

            <div className="story__block story__block--highlight">
              <span className="story__label">THE PROBLEM</span>
              <h3>Certificates ≠ Confidence</h3>
              <p>
                Many learners pass exams but struggle in real conversations,
                interviews, and workplace discussions.
              </p>
            </div>

            <div className="story__block story__block--highlight">
              <span className="story__label">THE REALIZATION</span>
              <h3>Something Was Missing</h3>
              <p>
                The system prepares students for tests — not for life in Germany.
                Speaking is delayed. Patterns are memorised. Confidence is never built.
              </p>
            </div>

            <div className="story__block story__block--highlight">
              <span className="story__label">THE DECISION</span>
              <h3>Build It Differently</h3>
              <p>
                I created a structured, practical system focused on real communication —
                not just exam patterns.
              </p>
            </div>

          </div>

        </section>



        {/* ======================================================
            PHILOSOPHY SECTION – Floating Pillars
        ====================================================== */}
        <section className="vision__philosophy">
          <h2>Our Philosophy</h2>

          <ul>
            <li>Communication over perfection</li>
            <li>Consistency over cramming</li>
            <li>Real-life scenarios over artificial exercises</li>
            <li>Structured routine over random motivation</li>
          </ul>
        </section>



        {/* ======================================================
            METHOD SECTION – Timeline Journey
        ====================================================== */}
        <section className="vision__timeline">
          <h2>The Method</h2>

          <div className="vision__method">

            <div>
              <h3>1. Learn</h3>
              <p>Understand grammar in context, not isolation.</p>
            </div>

            <div>
              <h3>2. Practice</h3>
              <p>Apply immediately with guided exercises.</p>
            </div>

            <div>
              <h3>3. Speak</h3>
              <p>Simulate real-life situations and conversations.</p>
            </div>

            <div>
              <h3>4. Reflect</h3>
              <p>Identify mistakes and improve deliberately.</p>
            </div>

            <div>
              <h3>5. Repeat</h3>
              <p>Build fluency through consistent daily structure.</p>
            </div>

          </div>
        </section>



        



        {/* ======================================================
            CALL TO ACTION SECTION
            Encourages users to explore courses
        ====================================================== */}
        <section className="vision__cta">
          <h2>German Beyond Exams is growing.</h2>
          <p>Join the journey and build real confidence in German.</p>

          <LiquidMetalButton
            size="sm"
            borderWidth={6}
            icon={<ArrowRight className="w-4 h-4" />}
            metalConfig={{
              colorBack: "#3b82f6",
              colorTint: "#93c5fd",
            }}
            onClick={() => navigate("/")}
          >
            Explore Courses
          </LiquidMetalButton>
        </section>

      </div>
    </main>
  );
}
