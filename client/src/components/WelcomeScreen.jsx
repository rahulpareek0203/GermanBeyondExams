import { useEffect, useState } from "react";
import Particles from "./ui/WelcomeScreenBG";
import "./WelcomeScreen.css";

const greetings = [
  "Hallo",
  "Hello",
  "नमस्ते",        // Hindi (India)
  "السلام علیکم",  // Urdu (Pakistan)
  "ਸਤ ਸ੍ਰੀ ਅਕਾਲ",
  "Willkommen"
];

export default function WelcomeScreen({ onFinish }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % greetings.length);
    }, 500);

    const timer = setTimeout(() => {
      onFinish();
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onFinish]);

  return (
    <div className="welcome-wrapper">
      
      {/* 🔥 Particles Background */}
      <div className="particles-bg">
        <Particles
          particleColors={["#10b981", "#3b82f6", "#7c3aed"]}
          particleCount={150}
          particleSpread={12}
          speed={0.08}
          particleBaseSize={80}
          moveParticlesOnHover={false}
          alphaParticles={true}
          disableRotation={false}
          pixelRatio={1}
        />
      </div>

      {/* Text on top */}
      <h1 key={index} className="fade-text">
        {greetings[index]}
      </h1>

    </div>
  );
}