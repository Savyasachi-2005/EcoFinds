import React from "react";
import QuickSellForm from "../landing-page/components/QuickSellForm";
import LocalPickupMap from "../landing-page/components/LocalPickupMap";

const SellPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <h1 className="text-2xl font-semibold">Start selling in minutes</h1>
        <QuickSellForm />
        <h2 className="text-xl font-semibold">Local pickup locations</h2>
        <LocalPickupMap />
      </div>
    </main>
  );
};

export default SellPage;
