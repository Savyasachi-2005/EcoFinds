import React from "react";
import FeaturedProducts from "../landing-page/components/FeaturedProducts";
import CategoryShowcase from "../landing-page/components/CategoryShowcase";

const ExplorePage = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="container-eco pt-1 sm:pt-2 lg:pt-3 pb-10 sm:pb-14 lg:pb-16 space-y-6 sm:space-y-8 lg:space-y-10">
        <FeaturedProducts />
        <CategoryShowcase />
      </div>
    </main>
  );
};

export default ExplorePage;
