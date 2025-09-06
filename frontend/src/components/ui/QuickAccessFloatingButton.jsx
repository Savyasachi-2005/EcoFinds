import React, { useState, useEffect } from 'react';
import Button from './Button';
import Icon from '../AppIcon';

const QuickAccessFloatingButton = () => {
  const [currentAction, setCurrentAction] = useState('calculator');
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement?.scrollHeight;
      
      // Show after scrolling past initial viewport
      setIsVisible(scrollY > windowHeight * 0.5);
      
      // Change action based on scroll position
      if (scrollY > documentHeight - windowHeight * 2) {
        setCurrentAction('back-to-top');
      } else if (scrollY > windowHeight * 2) {
        setCurrentAction('sell-form');
      } else {
        setCurrentAction('calculator');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getActionConfig = () => {
    switch (currentAction) {
      case 'calculator':
        return {
          icon: 'Calculator',
          tooltip: 'Calculate Environmental Impact',
          action: () => {
            const element = document.getElementById('impact-calculator');
            if (element) element?.scrollIntoView({ behavior: 'smooth' });
          }
        };
      case 'sell-form':
        return {
          icon: 'Plus',
          tooltip: 'Quick Sell Form',
          action: () => {
            const element = document.getElementById('start-selling');
            if (element) element?.scrollIntoView({ behavior: 'smooth' });
          }
        };
      case 'back-to-top':
        return {
          icon: 'ArrowUp',
          tooltip: 'Back to Top',
          action: () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        };
      default:
        return {
          icon: 'Calculator',
          tooltip: 'Calculate Impact',
          action: () => {}
        };
    }
  };

  const actionConfig = getActionConfig();

  const handleClick = () => {
    actionConfig?.action();
    setShowTooltip(false);
  };

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 md:right-20 z-150">
      <div className="relative">
        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-foreground text-background text-sm rounded-lg whitespace-nowrap opacity-90 transition-eco">
            {actionConfig?.tooltip}
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-foreground"></div>
          </div>
        )}
        
        {/* Floating Button */}
        <button
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="flex items-center justify-center w-14 h-14 bg-primary hover:bg-secondary text-primary-foreground rounded-full shadow-eco-cta hover:shadow-lg transition-eco transform hover:scale-105 active:scale-95"
          aria-label={actionConfig?.tooltip}
        >
          <Icon name={actionConfig?.icon} size={24} color="currentColor" />
        </button>
      </div>
    </div>
  );
};

export default QuickAccessFloatingButton;