import React from "react";
import ImpactCalculator from "../landing-page/components/ImpactCalculator";

const ImpactPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="container-eco pt-1 sm:pt-2 lg:pt-3 pb-10 sm:pb-14 lg:pb-16">
        <ImpactCalculator />
      </div>
    </main>
  );
};

export default ImpactPage;
