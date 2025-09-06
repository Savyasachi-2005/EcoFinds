import React, { useState, useEffect } from 'react';
import Button from './Button';


const StickyCtaNavigation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSection, setCurrentSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Show sticky CTA after scrolling past hero section
      setIsVisible(scrollY > windowHeight * 0.8);
    };

    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-20% 0px -20% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentSection(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe key sections for contextual CTA switching
    const sections = ['shop-products', 'how-it-works', 'impact-calculator', 'success-stories', 'start-selling'];
    sections?.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) observer?.observe(element);
    });

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer?.disconnect();
    };
  }, []);

  const handleShopClick = () => {
    const element = document.getElementById('shop-products');
    if (element) {
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSellClick = () => {
    const element = document.getElementById('start-selling');
    if (element) {
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getPrimaryAction = () => {
    switch (currentSection) {
      case 'start-selling':
        return { text: 'List Your Item', icon: 'Plus', action: handleSellClick };
      case 'shop-products':
        return { text: 'Browse Products', icon: 'ShoppingBag', action: handleShopClick };
      case 'impact-calculator':
        return { text: 'Calculate Impact', icon: 'Calculator', action: () => {
          const element = document.getElementById('impact-calculator');
          if (element) element?.scrollIntoView({ behavior: 'smooth' });
        }};
      default:
        return { text: 'Shop Now', icon: 'ShoppingBag', action: handleShopClick };
    }
  };

  const primaryAction = getPrimaryAction();

  if (!isVisible) return null;

  return (
    <>
      {/* Desktop Sticky CTA */}
      <div className="hidden md:block fixed bottom-6 right-6 z-150">
        <div className="flex items-center space-x-3 bg-card rounded-full shadow-eco-cta p-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleShopClick}
            iconName="ShoppingBag"
            iconPosition="left"
            iconSize={16}
            className="rounded-full"
          >
            Shop
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={primaryAction?.action}
            iconName={primaryAction?.icon}
            iconPosition="left"
            iconSize={16}
            className="rounded-full"
          >
            {primaryAction?.text}
          </Button>
        </div>
      </div>
      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-150 bg-card border-t border-border p-4">
        <div className="flex space-x-3">
          <Button
            variant="outline"
            size="default"
            onClick={handleShopClick}
            iconName="ShoppingBag"
            iconPosition="left"
            className="flex-1"
          >
            Shop Now
          </Button>
          <Button
            variant="default"
            size="default"
            onClick={handleSellClick}
            iconName="Plus"
            iconPosition="left"
            className="flex-1"
          >
            Start Selling
          </Button>
        </div>
      </div>
    </>
  );
};

export default StickyCtaNavigation;