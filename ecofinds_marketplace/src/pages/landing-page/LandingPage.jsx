import React from "react";
import HeroSection from "./components/HeroSection";
import ProblemSolutionSection from "./components/ProblemSolutionSection";
import FinalCTASection from "./components/FinalCTASection";
import Footer from "./components/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero is full viewport with its own spacing */}
      <HeroSection />
      {/* Standard vertical rhythm for inner sections */}
      <div className="stack-lg">
        <ProblemSolutionSection />
        <FinalCTASection />
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
