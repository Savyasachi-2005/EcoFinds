import React from "react";
import ImpactCalculator from "../landing-page/components/ImpactCalculator";

const ImpactPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-semibold mb-6">
          Calculate your environmental impact
        </h1>
        <ImpactCalculator />
      </div>
    </main>
  );
};

export default ImpactPage;
