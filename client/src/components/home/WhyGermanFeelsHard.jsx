import SimpleScrollStack from "../ui/ScrollStack";
import { Shuffle, Type, Layers, MicOff } from "lucide-react";

export default function WhyGermanFeelsHard() {
 const stackItems = [
        {
            title: "It’s Just an Exception.",
            text: "Instead of showing patterns and logic, you're told to memorise random rules.",
            gradient: "linear-gradient(135deg, #140033, #5B21B6, #C084FC)",
            visual: (
            <div className="icon-visual">
                <Shuffle size={140} strokeWidth={1.5} />
            </div>
            )
        },
        {
            title: "Articles or Nothing.",
            text: "If you don’t know them, you’re ‘not good enough to learn German.’", 
            gradient: "linear-gradient(135deg, #001B3A, #2563EB, #60A5FA)",
            visual: (
            <div className="icon-visual">
                <Type size={140} strokeWidth={1.5} />
            </div>
            )
        },
        {
            title: "Endless Rules. Endless Words.",
            text: "You just memorise — without knowing what to focus on first.",            
            gradient: "linear-gradient(135deg, #2A0020, #C026D3, #F472B6)",
            visual: (
            <div className="icon-visual">
                <Layers size={140} strokeWidth={1.5} />
            </div>
            )
        },
        {
            title: "Speaking Starts at B1.",
            text: "So you wait… and wait… instead of building real speaking skills from A1.",
            gradient: "linear-gradient(135deg, #052E2B, #0F9D58, #5BFFB0)",
            visual: (
            <div className="icon-visual">
                <MicOff size={140} strokeWidth={1.5} />
            </div>
            )
        }
    ];

  return (
    <section className="why-section">
      <div className="why-intro">
        <h2>Why German Feels So Hard</h2>
        <p>It’s not you. It’s the way it’s taught.</p>
      </div>

      <SimpleScrollStack items={stackItems} />
    </section>
  );
}