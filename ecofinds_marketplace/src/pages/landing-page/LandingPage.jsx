import React from "react";
import HeroSection from "./components/HeroSection";
import ProblemSolutionSection from "./components/ProblemSolutionSection";
import FinalCTASection from "./components/FinalCTASection";
import Footer from "./components/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <ProblemSolutionSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
};

export default LandingPage;
