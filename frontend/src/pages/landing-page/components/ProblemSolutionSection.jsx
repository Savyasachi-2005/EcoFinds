import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";

const ProblemSolutionSection = () => {
  const [wasteCounter, setWasteCounter] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const wasteStats = [
    { label: "Tons of waste daily", value: 62000, icon: "Trash2" },
    { label: "Items thrown away", value: 2.1, suffix: "M", icon: "Package" },
    { label: "CO₂ emissions", value: 1.8, suffix: "M kg", icon: "Cloud" },
  ];

  const circularBenefits = [
    {
      title: "Reduce Waste",
      description: "Every purchase prevents items from landfills",
      icon: "Recycle",
      color: "text-primary",
    },
    {
      title: "Save Money",
      description: "Get quality products at 50-70% off retail",
      icon: "PiggyBank",
      color: "text-secondary",
    },
    {
      title: "Unique Finds",
      description: "Discover one-of-a-kind items with history",
      icon: "Gem",
      color: "text-accent",
    },
    {
      title: "Support Community",
      description: "Connect with local sellers and buyers",
      icon: "Users",
      color: "text-success",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById("problem-solution");
    if (element) observer?.observe(element);

    return () => observer?.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setWasteCounter((prev) => (prev + 1) % 100);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  return (
    <section
      id="problem-solution"
      className="pt-12 sm:pt-16 lg:pt-20 pb-4 sm:pb-6 lg:pb-8 bg-muted/30"
    >
      <div className="container-eco">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            The Problem is <span className="text-destructive">Massive</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            India generates millions of tons of waste daily while people
            struggle with expensive new products. There's a better way.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Problem Side */}
          <div className="space-y-8">
            <div className="relative">
              <h3 className="text-2xl font-bold text-destructive mb-6">
                The Wasteful Reality
              </h3>

              {/* Animated Waste Visualization */}
              <div className="relative bg-card rounded-2xl p-8 shadow-eco-card border border-destructive/20">
                <div className="grid grid-cols-1 gap-6">
                  {wasteStats?.map((stat, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-destructive/10 rounded-full">
                        <Icon
                          name={stat?.icon}
                          size={24}
                          className="text-destructive"
                        />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-destructive">
                          {stat?.value?.toLocaleString("en-IN")}
                          {stat?.suffix || ""}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {stat?.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Animated Trash Pile */}
                <div className="mt-8 relative h-32 bg-gradient-to-t from-destructive/20 to-transparent rounded-lg overflow-hidden">
                  <div className="absolute bottom-0 left-0 right-0 h-full flex items-end justify-center space-x-2">
                    {[...Array(8)]?.map((_, i) => (
                      <div
                        key={i}
                        className={`bg-destructive/60 rounded-t-lg transition-all duration-1000 ${
                          isVisible
                            ? `h-${Math.floor(Math.random() * 20) + 10}`
                            : "h-2"
                        }`}
                        style={{
                          width: "12px",
                          height: isVisible
                            ? `${Math.floor(Math.random() * 80) + 20}px`
                            : "8px",
                          animationDelay: `${i * 200}ms`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Problem Points */}
              <div className="space-y-4 mt-6">
                {[
                  "New products cost 2-3x more than necessary",
                  "Perfectly good items end up in landfills",
                  "Environmental impact keeps growing",
                  "People can't afford quality items",
                ]?.map((point, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Icon
                      name="X"
                      size={20}
                      className="text-destructive mt-0.5 flex-shrink-0"
                    />
                    <span className="text-muted-foreground">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Solution Side */}
          <div className="space-y-8">
            <div className="relative">
              <h3 className="text-2xl font-bold text-primary mb-6">
                Our Circular Solution
              </h3>

              {/* Product Lifecycle Animation */}
              <div className="relative bg-card rounded-2xl p-8 shadow-eco-card border border-primary/20">
                <div className="relative">
                  {/* Circular Flow */}
                  <div className="relative w-64 h-64 mx-auto">
                    <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                    <div
                      className="absolute inset-4 border-2 border-dashed border-primary/40 rounded-full animate-spin"
                      style={{ animationDuration: "20s" }}
                    ></div>

                    {/* Lifecycle Steps */}
                    {[
                      {
                        icon: "ShoppingBag",
                        label: "Buy",
                        position:
                          "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
                      },
                      {
                        icon: "Heart",
                        label: "Use",
                        position:
                          "top-1/2 right-0 translate-x-1/2 -translate-y-1/2",
                      },
                      {
                        icon: "RefreshCw",
                        label: "Sell",
                        position:
                          "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
                      },
                      {
                        icon: "Repeat",
                        label: "Reuse",
                        position:
                          "top-1/2 left-0 -translate-x-1/2 -translate-y-1/2",
                      },
                    ]?.map((step, index) => (
                      <div
                        key={index}
                        className={`absolute ${step?.position} z-10`}
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-eco-card">
                            <Icon name={step?.icon} size={20} />
                          </div>
                          <span className="text-xs font-medium text-primary">
                            {step?.label}
                          </span>
                        </div>
                      </div>
                    ))}

                    {/* Center Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                        <Icon name="Leaf" size={24} className="text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Solution Benefits */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                {circularBenefits?.map((benefit, index) => (
                  <div
                    key={index}
                    className="bg-card rounded-lg p-4 shadow-eco-card border border-border hover:shadow-eco-cta transition-eco"
                  >
                    <div className="flex items-start space-x-3">
                      <Icon
                        name={benefit?.icon}
                        size={20}
                        className={benefit?.color}
                      />
                      <div>
                        <h4 className="font-semibold text-foreground text-sm">
                          {benefit?.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {benefit?.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Impact Comparison */}
        <div className="mt-16 bg-card rounded-2xl p-8 shadow-eco-card">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">
              The Impact Difference
            </h3>
            <p className="text-muted-foreground">
              See how choosing second-hand creates positive change
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon
                  name="TrendingUp"
                  size={24}
                  className="text-destructive"
                />
              </div>
              <h4 className="font-semibold text-foreground mb-2">
                Traditional Shopping
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• High prices</li>
                <li>• More waste</li>
                <li>• Resource depletion</li>
              </ul>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="ArrowRight" size={24} className="text-primary" />
              </div>
              <h4 className="font-semibold text-primary mb-2">EcoFinds Way</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 50-70% savings</li>
                <li>• Zero new waste</li>
                <li>• Community support</li>
              </ul>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="TrendingDown" size={24} className="text-success" />
              </div>
              <h4 className="font-semibold text-success mb-2">Your Impact</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Money saved</li>
                <li>• CO₂ reduced</li>
                <li>• Waste prevented</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;
