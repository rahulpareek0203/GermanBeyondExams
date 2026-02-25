import { useEffect, useRef } from "react";
import "./ScrollStack.css";

export default function SimpleScrollStack({ items = [] }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const cards = containerRef.current.querySelectorAll(".simple-card");

    const handleScroll = () => {
      const trigger = window.innerHeight * 0.2;

      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const progress = Math.min(
          Math.max((trigger - rect.top) / window.innerHeight, 0),
          1
        );

        const scale = 1 - progress * 0.05;
        const translateY = progress * 20;

        card.style.transform = `scale(${scale}) translateY(${translateY}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="simple-stack" ref={containerRef}>
      {items.map((item, i) => (
        <div
            key={i}
            className="simple-card"
            style={{
                background: item.gradient,
                top: `${15 + i * 8}vh`,
                zIndex: i + 1
            }}
        >
          <div className="card-content">
            <div className="card-left">
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            </div>

            <div className="card-right">
            {item.visual}
            </div>
        </div>
        </div>
      ))}
    </div>
  );
}