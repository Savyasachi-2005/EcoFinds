import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Icon from "../../../components/AppIcon";

const FinalCTASection = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const handleEmailSubmit = (e) => {
    e?.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setIsSubscribed(false);
      setEmail("");
    }, 3000);
  };

  const handleShopNow = () => navigate("/explore");
  const handleStartSelling = () => navigate("/sell");

  return (
    <section className="pt-2 sm:pt-4 lg:pt-6 pb-12 sm:pb-16 lg:pb-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container-eco space-y-4 sm:space-y-6 lg:space-y-8">
        {/* Early Access Banner */}
        <div className="bg-card rounded-2xl p-4 shadow-eco-card border border-border">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Icon name="Rocket" size={16} className="text-primary" />
            <span>
              We're just getting started — join our early community and help us
              improve
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8">
            <div>
              <h2 className="text-3xl sm:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
                Ready to Give Products a {""}
                <span className="text-primary">Second Life</span>?
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8">
                Start your journey with EcoFinds. Save money, reduce waste, and
                help build a sustainable future. We're in early access and would
                love your feedback.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {[
                {
                  icon: "PiggyBank",
                  title: "Great Value",
                  desc: "Quality pre‑owned items at fair prices",
                },
                {
                  icon: "Leaf",
                  title: "Reduce Waste",
                  desc: "Give products a longer life",
                },
                {
                  icon: "Users",
                  title: "Growing Community",
                  desc: "Be among our first users",
                },
                {
                  icon: "Shield",
                  title: "Safety First",
                  desc: "Secure checkout coming soon",
                },
              ]?.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 bg-card/50 rounded-xl p-3 sm:p-4"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon
                      name={benefit?.icon}
                      size={20}
                      className="text-primary"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">
                      {benefit?.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {benefit?.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                variant="default"
                size="lg"
                onClick={handleShopNow}
                iconName="ShoppingBag"
                iconPosition="left"
                className="flex-1 sm:flex-none"
              >
                Start Shopping Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleStartSelling}
                iconName="Plus"
                iconPosition="left"
                className="flex-1 sm:flex-none border-accent text-accent hover:bg-accent hover:text-accent-foreground"
              >
                List Your First Item
              </Button>
            </div>

            {/* Trust indicators removed for early stage */}
            <div className="h-1" />
          </div>

          {/* Right Content - Email Signup */}
          <div className="space-y-6 md:space-y-8">
            <div className="bg-card rounded-3xl p-6 sm:p-8 shadow-eco-cta border border-border">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Mail" size={24} className="text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                  Get Early Updates
                </h3>
                <p className="text-muted-foreground">
                  Be the first to know when new features and listings go live in
                  your area
                </p>
              </div>

              {!isSubscribed ? (
                <form
                  onSubmit={handleEmailSubmit}
                  className="space-y-3 sm:space-y-4"
                >
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e?.target?.value)}
                    required
                    className="text-center"
                  />
                  <Button
                    type="submit"
                    variant="default"
                    size="md"
                    fullWidth
                    iconName="ArrowRight"
                    iconPosition="right"
                  >
                    Get Exclusive Deals
                  </Button>
                </form>
              ) : (
                <div className="text-center py-6 sm:py-8">
                  <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Check" size={24} className="text-success" />
                  </div>
                  <h4 className="text-base sm:text-lg font-semibold text-success mb-2">
                    Welcome to EcoFinds!
                  </h4>
                  <p className="text-muted-foreground">
                    Check your email for your welcome gift and exclusive deals.
                  </p>
                </div>
              )}
            </div>

            {/* Gentle nudge instead of urgency */}
            <div className="bg-card/60 rounded-2xl p-5 sm:p-6 border border-border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="Heart" size={24} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Thanks for supporting a new startup
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Listing and checkout are rolling out gradually. You can
                    browse today and sign up to get notified as we expand.
                  </p>
                </div>
              </div>
            </div>

            {/* Social Proof */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Trusted by leading organizations
              </p>
              <div className="flex items-center justify-center space-x-8 opacity-60">
                {[
                  "Startup India",
                  "Make in India",
                  "Digital India",
                  "Green India",
                ]?.map((org, index) => (
                  <div
                    key={index}
                    className="text-xs font-medium text-muted-foreground"
                  >
                    {org}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
