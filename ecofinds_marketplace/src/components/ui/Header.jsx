import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const navigationSections = [
    { label: 'Shop Products', anchor: '#shop-products', icon: 'ShoppingBag' },
    { label: 'How It Works', anchor: '#how-it-works', icon: 'HelpCircle' },
    { label: 'Impact Calculator', anchor: '#impact-calculator', icon: 'Calculator' },
    { label: 'Success Stories', anchor: '#success-stories', icon: 'Star' },
    { label: 'Start Selling', anchor: '#start-selling', icon: 'Plus' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const observerOptions = {
      threshold: 0.5,
      rootMargin: '-64px 0px -50% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    }, observerOptions);

    navigationSections?.forEach(({ anchor }) => {
      const element = document.querySelector(anchor);
      if (element) observer?.observe(element);
    });

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer?.disconnect();
    };
  }, []);

  const handleSectionClick = (anchor) => {
    const element = document.querySelector(anchor);
    if (element) {
      element?.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className={`sticky top-0 z-100 w-full transition-eco ${
        isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-eco-card' : 'bg-background'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <Icon name="Leaf" size={24} color="white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-foreground">EcoFinds</span>
                <span className="text-xs text-muted-foreground hidden sm:block">Give Products a Second Life</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationSections?.map(({ label, anchor, icon }) => (
                <button
                  key={anchor}
                  onClick={() => handleSectionClick(anchor)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-eco ${
                    activeSection === anchor
                      ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={icon} size={16} />
                  <span>{label}</span>
                </button>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSectionClick('#shop-products')}
                iconName="ShoppingBag"
                iconPosition="left"
                iconSize={16}
              >
                Shop Now
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => handleSectionClick('#start-selling')}
                iconName="Plus"
                iconPosition="left"
                iconSize={16}
              >
                Start Selling
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-eco"
              aria-label="Toggle mobile menu"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 top-16 z-200 bg-background/95 backdrop-blur-sm">
            <div className="px-4 py-6 space-y-4">
              {navigationSections?.map(({ label, anchor, icon }) => (
                <button
                  key={anchor}
                  onClick={() => handleSectionClick(anchor)}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-left transition-eco ${
                    activeSection === anchor
                      ? 'text-primary bg-primary/10' :'text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={icon} size={20} />
                  <span className="font-medium">{label}</span>
                </button>
              ))}
              
              <div className="pt-6 space-y-3">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => handleSectionClick('#shop-products')}
                  iconName="ShoppingBag"
                  iconPosition="left"
                >
                  Shop Now
                </Button>
                <Button
                  variant="default"
                  fullWidth
                  onClick={() => handleSectionClick('#start-selling')}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Start Selling
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;