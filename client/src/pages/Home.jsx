import Hero from "../components/Hero";
import ProblemSection from "../components/home/ProblemSection"
import CommonProblems from "@/components/home/CommonProblems";
import CourseSection from "@/components/home/CourseSection";
import DarkVeil from "@/components/ui/DarkVeilBackground";
import WhyGermanFeelsHard from "@/components/home/WhyGermanFeelsHard";
import TestimonialSection from "@/components/testimonials/TestimonialsSection";
import Reviews from "@/components/testimonials/reviews";
import "../styles/home.css"


export default function Home() {
  return (
    <div className="home-wrapper">
      <DarkVeil
        hueShift={0}
        noiseIntensity={0}
        scanlineIntensity={0}
        speed={0.7}
        scanlineFrequency={0}
        warpAmount={0}
      />

      <div className="home-content">
        <Hero />
        <ProblemSection />
        <CommonProblems />
        <WhyGermanFeelsHard />
        <CourseSection />
        
        
        <TestimonialSection />
        <Reviews />

      </div>
    </div>
  );
}


