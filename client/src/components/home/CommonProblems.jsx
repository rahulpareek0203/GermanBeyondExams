import { useEffect, useRef, useState } from "react";
import "./CommonProblems.css";
import thinkingImg from "../../assets/thinking.png";

const problems = [
  "I forget vocabulary?",
  "I speak very slowly.",
  "I can write but I can’t speak.",
  "How can I improve Hören?",
  "I lack confidence.",
  "I translate from English.",
  "I am afraid of mistakes.",
  "Grammar confuses me."
];

export default function CommonProblems() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const [radius, setRadius] = useState(280);

  useEffect(() => {
    const updateRadius = () => {
      if (window.innerWidth <= 768) {
        setRadius(160);   // mobile radius
      } else {
        setRadius(280);   // desktop radius
      }
    };

    updateRadius(); // run once
    window.addEventListener("resize", updateRadius);

    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);


  return (
    <section className="common-problems-section">

      <div className="common-problems-header">
        <h2>Does this sound similar?</h2>
        <p>
          Many learners struggle with the same challenges.
          You're not alone — and it doesn’t have to stay this way.
        </p>
      </div>

      <div ref={sectionRef} className="common-problems-container">

        {/* Orbit Ring */}
        <div className="orbit-ring"></div>

        {/* Center */}
        <div className="center-circle">
          <div className="avatar">
            <img src={thinkingImg} alt="Thinking person" />
          </div>
        </div>

        {/* Pills */}
        {problems.map((text, index) => {
          const angle = (360 / problems.length) * index;

          return (
            <div
              key={index}
              className="problem-pill"
              style={{
                transform: `
                  translate(-50%, -50%)
                  rotate(${angle}deg)
                  translate(${radius}px)
                  rotate(-${angle}deg)
                  scale(${visible ? 1 : 0.8})
                `,
                opacity: visible ? 1 : 0,
                transition: "all 0.6s ease",
                transitionDelay: `${index * 0.15}s`
              }}
            >
              {text}
            </div>
          );
        })}
      </div>
    </section>
  );
}
