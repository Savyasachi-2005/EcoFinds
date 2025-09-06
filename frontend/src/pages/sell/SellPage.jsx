import React from "react";
import QuickSellForm from "../landing-page/components/QuickSellForm";
import LocalPickupMap from "../landing-page/components/LocalPickupMap";

const SellPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="container-eco pt-1 sm:pt-2 lg:pt-3 pb-10 sm:pb-14 lg:pb-16 space-y-4 sm:space-y-6 lg:space-y-8">
        <QuickSellForm />
        <LocalPickupMap />
      </div>
    </main>
  );
};

export default SellPage;
