import React from "react";
import FeaturedProducts from "../landing-page/components/FeaturedProducts";
import CategoryShowcase from "../landing-page/components/CategoryShowcase";

const ExplorePage = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <h1 className="text-2xl font-semibold">Explore</h1>
        <FeaturedProducts />
        <CategoryShowcase />
      </div>
    </main>
  );
};

export default ExplorePage;
