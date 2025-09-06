import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ImpactCalculator = () => {
  const [selectedCategory, setSelectedCategory] = useState('electronics');
  const [monthlySpend, setMonthlySpend] = useState(5000);
  const [results, setResults] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const categories = [
    { 
      id: 'electronics', 
      name: 'Electronics', 
      icon: 'Smartphone',
      co2Factor: 0.8,
      savingsRate: 0.65
    },
    { 
      id: 'fashion', 
      name: 'Fashion', 
      icon: 'Shirt',
      co2Factor: 0.6,
      savingsRate: 0.70
    },
    { 
      id: 'furniture', 
      name: 'Furniture', 
      icon: 'Armchair',
      co2Factor: 1.2,
      savingsRate: 0.60
    },
    { 
      id: 'books', 
      name: 'Books', 
      icon: 'Book',
      co2Factor: 0.3,
      savingsRate: 0.50
    },
    { 
      id: 'sports', 
      name: 'Sports', 
      icon: 'Dumbbell',
      co2Factor: 0.5,
      savingsRate: 0.55
    },
    { 
      id: 'home', 
      name: 'Home & Garden', 
      icon: 'Home',
      co2Factor: 0.7,
      savingsRate: 0.60
    }
  ];

  const calculateImpact = () => {
    setIsCalculating(true);
    
    setTimeout(() => {
      const category = categories?.find(cat => cat?.id === selectedCategory);
      const yearlySpend = monthlySpend * 12;
      const yearlySavings = yearlySpend * category?.savingsRate;
      const co2Saved = yearlySpend * category?.co2Factor;
      
      setResults({
        yearlySavings: Math.round(yearlySavings),
        co2Saved: Math.round(co2Saved),
        treesEquivalent: Math.round(co2Saved / 22),
        itemsRescued: Math.round(yearlySpend / 1000)
      });
      setIsCalculating(false);
    }, 1500);
  };

  const shareResults = () => {
    if (results) {
      const text = `I could save ₹${results?.yearlySavings?.toLocaleString('en-IN')} and prevent ${results?.co2Saved}kg CO₂ emissions by shopping on EcoFinds! 🌱 #SustainableShopping #EcoFinds`;
      
      if (navigator.share) {
        navigator.share({
          title: 'My Environmental Impact',
          text: text,
          url: window.location?.href
        });
      } else {
        navigator.clipboard?.writeText(text);
        alert('Results copied to clipboard!');
      }
    }
  };

  return (
    <section id="impact-calculator" className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Calculate Your <span className="text-primary">Environmental Impact</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how much money you could save and CO₂ you could prevent by choosing second-hand
          </p>
        </div>

        <div className="bg-card rounded-3xl p-8 shadow-eco-cta border border-border">
          {!results ? (
            <div className="space-y-8">
              {/* Category Selection */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  What do you usually buy?
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {categories?.map((category) => (
                    <button
                      key={category?.id}
                      onClick={() => setSelectedCategory(category?.id)}
                      className={`p-4 rounded-xl border-2 transition-eco text-center ${
                        selectedCategory === category?.id
                          ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Icon name={category?.icon} size={24} className="mx-auto mb-2" />
                      <span className="text-sm font-medium">{category?.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Spending Input */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  How much do you spend monthly?
                </h3>
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="range"
                      min="1000"
                      max="50000"
                      step="500"
                      value={monthlySpend}
                      onChange={(e) => setMonthlySpend(parseInt(e?.target?.value))}
                      className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${((monthlySpend - 1000) / (50000 - 1000)) * 100}%, var(--color-muted) ${((monthlySpend - 1000) / (50000 - 1000)) * 100}%, var(--color-muted) 100%)`
                      }}
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-2">
                      <span>₹1,000</span>
                      <span>₹50,000</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="text-3xl font-bold text-primary">
                      ₹{monthlySpend?.toLocaleString('en-IN')}
                    </span>
                    <span className="text-muted-foreground ml-2">per month</span>
                  </div>
                </div>
              </div>

              {/* Calculate Button */}
              <div className="text-center">
                <Button
                  variant="default"
                  size="lg"
                  onClick={calculateImpact}
                  loading={isCalculating}
                  iconName="Calculator"
                  iconPosition="left"
                  className="px-12"
                >
                  {isCalculating ? 'Calculating...' : 'Calculate My Impact'}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Results Header */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-foreground mb-2">Your Annual Impact</h3>
                <p className="text-muted-foreground">By choosing second-hand over new</p>
              </div>

              {/* Impact Cards */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-primary/10 rounded-2xl p-6 text-center border border-primary/20">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="PiggyBank" size={24} className="text-primary-foreground" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">
                    ₹{results?.yearlySavings?.toLocaleString('en-IN')}
                  </div>
                  <div className="text-sm text-muted-foreground">Money Saved</div>
                </div>

                <div className="bg-success/10 rounded-2xl p-6 text-center border border-success/20">
                  <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Leaf" size={24} className="text-success-foreground" />
                  </div>
                  <div className="text-3xl font-bold text-success mb-2">
                    {results?.co2Saved} kg
                  </div>
                  <div className="text-sm text-muted-foreground">CO₂ Prevented</div>
                </div>

                <div className="bg-secondary/10 rounded-2xl p-6 text-center border border-secondary/20">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Trees" size={24} className="text-secondary-foreground" />
                  </div>
                  <div className="text-3xl font-bold text-secondary mb-2">
                    {results?.treesEquivalent}
                  </div>
                  <div className="text-sm text-muted-foreground">Trees Worth of CO₂</div>
                </div>

                <div className="bg-accent/10 rounded-2xl p-6 text-center border border-accent/20">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Package" size={24} className="text-accent-foreground" />
                  </div>
                  <div className="text-3xl font-bold text-accent mb-2">
                    {results?.itemsRescued}
                  </div>
                  <div className="text-sm text-muted-foreground">Items Rescued</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="default"
                  onClick={() => {
                    const element = document.getElementById('shop-products');
                    if (element) element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  iconName="ShoppingBag"
                  iconPosition="left"
                >
                  Start Shopping
                </Button>
                <Button
                  variant="outline"
                  onClick={shareResults}
                  iconName="Share2"
                  iconPosition="left"
                >
                  Share Results
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setResults(null)}
                  iconName="RotateCcw"
                  iconPosition="left"
                >
                  Recalculate
                </Button>
              </div>

              {/* Motivational Message */}
              <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-6 text-center border border-primary/10">
                <Icon name="Heart" size={24} className="text-primary mx-auto mb-3" />
                <p className="text-foreground font-medium">
                  Amazing! You could make a real difference while saving money. 
                  Join thousands of others creating positive change.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ImpactCalculator;