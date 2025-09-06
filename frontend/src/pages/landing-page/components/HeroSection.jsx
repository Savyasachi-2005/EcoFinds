import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const trendingProducts = [
    {
      id: 1,
      title: "Vintage Leather Jacket",
      originalPrice: 8999,
      salePrice: 2699,
      image:
        "https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg",
      savings: 70,
    },
    {
      id: 2,
      title: "MacBook Pro 2019",
      originalPrice: 89999,
      salePrice: 45999,
      image: "https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg",
      savings: 49,
    },
    {
      id: 3,
      title: "Designer Handbag",
      originalPrice: 15999,
      salePrice: 4799,
      image:
        "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
      savings: 70,
    },
    {
      id: 4,
      title: "Gaming Chair",
      originalPrice: 12999,
      salePrice: 6499,
      image:
        "https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg",
      savings: 50,
    },
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % trendingProducts?.length);
    }, 4000);

    return () => {
      clearInterval(slideInterval);
    };
  }, []);

  const handleShopNow = () => navigate("/explore");

  const handleStartSelling = () => navigate("/sell");

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-48 h-48 bg-secondary rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-accent rounded-full blur-2xl"></div>
      </div>
      <div className="relative container-eco py-4 md:py-0">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center min-h-[calc(100vh-64px)]">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8">
            {/* Early Access Note */}
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-card/60 border border-border rounded-full px-3 py-1">
              <Icon name="Rocket" size={16} className="text-primary" />
              <span>
                We’re in early access — features and inventory are evolving
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Give Products a{" "}
                <span className="text-primary">Second Life</span>
              </h1>
              <p className="text-lg sm:text-2xl text-muted-foreground font-medium">
                Find great deals and keep good products in use
              </p>
            </div>

            {/* Placeholder info (no vanity metrics yet) */}
            <div className="bg-card rounded-2xl p-4 shadow-eco-card border border-border">
              <div className="text-sm text-muted-foreground text-center">
                Help us shape EcoFinds — your feedback as an early user matters
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                variant="default"
                size="lg"
                onClick={handleShopNow}
                iconName="ShoppingBag"
                iconPosition="left"
                className="flex-1 sm:flex-none"
              >
                Shop Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleStartSelling}
                iconName="Plus"
                iconPosition="left"
                className="flex-1 sm:flex-none border-accent text-accent hover:bg-accent hover:text-accent-foreground"
              >
                Start Selling
              </Button>
            </div>

            {/* Quick Stats removed for new startup phase */}
          </div>

          {/* Right Content - Product Carousel */}
          <div className="relative">
            <div className="relative bg-card rounded-3xl p-8 shadow-eco-cta">
              <div className="absolute top-4 right-4 z-20 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium pointer-events-none shadow">
                Trending
              </div>

              <div className="space-y-6">
                <div className="relative h-64 rounded-2xl overflow-hidden">
                  <Image
                    src={trendingProducts?.[currentSlide]?.image}
                    alt={trendingProducts?.[currentSlide]?.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 z-10 bg-success text-success-foreground px-3 py-1 rounded-full text-sm font-bold pointer-events-none shadow">
                    {trendingProducts?.[currentSlide]?.savings}% OFF
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-foreground">
                    {trendingProducts?.[currentSlide]?.title}
                  </h3>

                  <div className="flex items-center space-x-3">
                    <span className="text-2xl font-bold text-primary">
                      ₹
                      {trendingProducts?.[
                        currentSlide
                      ]?.salePrice?.toLocaleString("en-IN")}
                    </span>
                    <span className="text-lg text-muted-foreground line-through">
                      ₹
                      {trendingProducts?.[
                        currentSlide
                      ]?.originalPrice?.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon
                        name="MapPin"
                        size={16}
                        className="text-muted-foreground"
                      />
                      <span className="text-sm text-muted-foreground">
                        Mumbai, Maharashtra
                      </span>
                    </div>
                    {/* Rating removed during early stage */}
                    <div />
                  </div>
                </div>
              </div>

              {/* Carousel Indicators */}
              <div className="flex justify-center space-x-2 mt-6">
                {trendingProducts?.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-eco ${
                      index === currentSlide ? "bg-primary" : "bg-muted"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -left-4 bg-warning text-warning-foreground px-4 py-2 rounded-full text-sm font-medium shadow-eco-card">
              <Icon name="TrendingUp" size={16} className="inline mr-1" />
              Hot Deal!
            </div>

            <div className="absolute -bottom-4 -right-4 bg-success text-success-foreground px-4 py-2 rounded-full text-sm font-medium shadow-eco-card">
              <Icon name="Truck" size={16} className="inline mr-1" />
              Free Pickup
            </div>
          </div>
        </div>
      </div>
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <Icon name="ChevronDown" size={24} className="text-muted-foreground" />
      </div>
    </section>
  );
};

export default HeroSection;
