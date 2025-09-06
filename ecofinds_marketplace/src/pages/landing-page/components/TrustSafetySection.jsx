import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const TrustSafetySection = () => {
  const [expandedFeature, setExpandedFeature] = useState(null);

  const trustFeatures = [
    {
      id: 'verification',
      title: 'Seller Verification',
      icon: 'ShieldCheck',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      description: 'Every seller goes through our rigorous verification process',
      details: [
        'Government ID verification',
        'Phone number confirmation',
        'Address verification',
        'Social media profile check',
        'Previous transaction history review'
      ],
      stats: '50,000+ verified sellers'
    },
    {
      id: 'payments',
      title: 'Secure Payments',
      icon: 'CreditCard',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      description: 'Your money is protected with our secure payment system',
      details: [
        'Escrow payment protection',
        'Multiple payment options (UPI, Cards, Wallets)',
        'Instant refunds for cancelled orders',
        'Fraud detection and prevention',
        'PCI DSS compliant payment processing'
      ],
      stats: '₹100Cr+ transactions secured'
    },
    {
      id: 'quality',
      title: 'Quality Assurance',
      icon: 'Award',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      description: 'We ensure every item meets our quality standards',
      details: [
        'Detailed condition descriptions',
        'Multiple high-quality photos required',
        'Return policy for misrepresented items',
        'Quality rating system',
        'Expert authentication for luxury items'
      ],
      stats: '98% customer satisfaction'
    },
    {
      id: 'support',
      title: '24/7 Support',
      icon: 'Headphones',
      color: 'text-success',
      bgColor: 'bg-success/10',
      description: 'Our support team is always here to help you',
      details: [
        'Live chat support',
        'Phone support in multiple languages',
        'Email support with quick response',
        'Dispute resolution service',
        'Comprehensive help center'
      ],
      stats: '< 2 min average response time'
    }
  ];

  const certifications = [
    {
      name: 'SSL Secured',
      icon: 'Lock',
      description: '256-bit encryption'
    },
    {
      name: 'PCI Compliant',
      icon: 'CreditCard',
      description: 'Payment security'
    },
    {
      name: 'ISO 27001',
      icon: 'Shield',
      description: 'Information security'
    },
    {
      name: 'Green Certified',
      icon: 'Leaf',
      description: 'Environmental standards'
    }
  ];

  const safetyTips = [
    {
      icon: 'Eye',
      title: 'Inspect Before Buying',
      tip: 'Always check items thoroughly before completing the purchase'
    },
    {
      icon: 'MapPin',
      title: 'Meet in Public Places',
      tip: 'Choose safe, public locations for item pickup and exchange'
    },
    {
      icon: 'MessageCircle',
      title: 'Communicate Through Platform',
      tip: 'Keep all communications within EcoFinds for your protection'
    },
    {
      icon: 'AlertTriangle',
      title: 'Report Suspicious Activity',
      tip: 'Help us maintain a safe community by reporting any concerns'
    }
  ];

  const toggleFeature = (featureId) => {
    setExpandedFeature(expandedFeature === featureId ? null : featureId);
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Your <span className="text-primary">Trust & Safety</span> is Our Priority
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We've built comprehensive systems to ensure every transaction is secure, 
            transparent, and protected
          </p>
        </div>

        {/* Trust Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {trustFeatures?.map((feature) => (
            <div
              key={feature?.id}
              className={`bg-card rounded-2xl p-6 shadow-eco-card border border-border hover:shadow-eco-cta transition-all duration-300 ${
                expandedFeature === feature?.id ? 'ring-2 ring-primary' : ''
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-xl ${feature?.bgColor} flex items-center justify-center flex-shrink-0`}>
                  <Icon name={feature?.icon} size={24} className={feature?.color} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-foreground">{feature?.title}</h3>
                    <button
                      onClick={() => toggleFeature(feature?.id)}
                      className="p-1 hover:bg-muted rounded-full transition-colors"
                    >
                      <Icon 
                        name={expandedFeature === feature?.id ? "ChevronUp" : "ChevronDown"} 
                        size={20} 
                        className="text-muted-foreground" 
                      />
                    </button>
                  </div>
                  
                  <p className="text-muted-foreground mb-3">{feature?.description}</p>
                  
                  <div className="flex items-center space-x-2 mb-4">
                    <Icon name="TrendingUp" size={16} className="text-primary" />
                    <span className="text-sm font-medium text-primary">{feature?.stats}</span>
                  </div>

                  {expandedFeature === feature?.id && (
                    <div className="mt-4 p-4 bg-muted/50 rounded-xl">
                      <h4 className="font-semibold text-foreground mb-3">How it works:</h4>
                      <ul className="space-y-2">
                        {feature?.details?.map((detail, index) => (
                          <li key={index} className="flex items-start space-x-2 text-sm text-muted-foreground">
                            <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Security Certifications */}
        <div className="bg-card rounded-2xl p-8 shadow-eco-card border border-border mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">Security Certifications</h3>
            <p className="text-muted-foreground">Industry-standard security measures to protect your data</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {certifications?.map((cert, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-muted/50 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/10 transition-colors">
                  <Icon name={cert?.icon} size={24} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">{cert?.name}</h4>
                <p className="text-sm text-muted-foreground">{cert?.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Tips */}
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 border border-primary/10 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">Safety Tips for Smart Shopping</h3>
            <p className="text-muted-foreground">Follow these guidelines for a safe and secure experience</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {safetyTips?.map((tip, index) => (
              <div key={index} className="flex items-start space-x-4 bg-card/50 rounded-xl p-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name={tip?.icon} size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{tip?.title}</h4>
                  <p className="text-sm text-muted-foreground">{tip?.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Guarantee */}
        <div className="bg-card rounded-2xl p-8 shadow-eco-cta border border-border text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="ShieldCheck" size={32} className="text-primary" />
            </div>
            
            <h3 className="text-2xl font-bold text-foreground mb-4">
              EcoFinds Trust Guarantee
            </h3>
            
            <p className="text-lg text-muted-foreground mb-6">
              If you're not completely satisfied with your purchase, we'll make it right. 
              Our commitment to your safety and satisfaction is unconditional.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-muted/50 rounded-lg p-4">
                <Icon name="RotateCcw" size={24} className="text-primary mx-auto mb-2" />
                <div className="font-semibold text-foreground">7-Day Returns</div>
                <div className="text-sm text-muted-foreground">Easy return policy</div>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <Icon name="DollarSign" size={24} className="text-primary mx-auto mb-2" />
                <div className="font-semibold text-foreground">Money Back</div>
                <div className="text-sm text-muted-foreground">100% refund guarantee</div>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <Icon name="Headphones" size={24} className="text-primary mx-auto mb-2" />
                <div className="font-semibold text-foreground">24/7 Support</div>
                <div className="text-sm text-muted-foreground">Always here to help</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Users" size={16} />
              <span>Trusted by 2,00,000+ users across India</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSafetySection;