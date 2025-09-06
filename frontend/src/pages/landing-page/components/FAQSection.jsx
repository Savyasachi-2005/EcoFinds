import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FAQSection = () => {
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const faqs = [
    {
      id: 1,
      category: 'Trust & Safety',
      question: 'How do I know if a seller is trustworthy?',
      answer: `All sellers on EcoFinds go through our comprehensive verification process. We verify their government ID, phone number, and address. You can see verification badges on seller profiles, along with their ratings and reviews from previous buyers.\n\nAdditionally, we recommend meeting in public places for item pickup and inspecting items thoroughly before completing the purchase.`,
      icon: 'ShieldCheck',
      color: 'text-primary'
    },
    {
      id: 2,
      category: 'Payments',
      question: 'Is my payment secure? What if I don\'t receive the item?',
      answer: `Your payments are completely secure with our escrow system. When you pay for an item, the money is held safely by EcoFinds until you confirm receipt and satisfaction with your purchase.\n\nIf you don't receive the item or it's significantly different from the description, you can raise a dispute and get a full refund. We also offer buyer protection for all transactions.`,
      icon: 'CreditCard',
      color: 'text-secondary'
    },
    {
      id: 3,
      category: 'Quality',
      question: 'What if the item condition is not as described?',
      answer: `We have a 7-day return policy for items that are significantly different from their description. All sellers must provide accurate condition descriptions and multiple photos.\n\nIf you receive an item that doesn't match the description, you can return it for a full refund. We also have a rating system that helps maintain quality standards.`,
      icon: 'Award',color: 'text-accent'
    },
    {
      id: 4,
      category: 'Selling',question: 'How quickly can I sell my items?',answer: `Most items sell within 7-14 days, depending on the category and pricing. Electronics and fashion items typically sell faster. To sell quickly:\n\n• Price competitively using our AI suggestions\n• Upload high-quality photos\n• Write detailed descriptions\n• Respond promptly to buyer inquiries\n• Choose convenient pickup locations`,icon: 'TrendingUp',color: 'text-success'
    },
    {
      id: 5,
      category: 'Fees',question: 'What fees do you charge sellers?',answer: `We charge a small commission only when your item sells successfully:\n\n• Electronics: 5% of sale price\n• Fashion & Accessories: 7% of sale price\n• Furniture & Home: 6% of sale price\n• Books & Media: 4% of sale price\n\nThere are no listing fees, and you only pay when you make a sale. New sellers get their first 3 listings commission-free!`,icon: 'DollarSign',color: 'text-warning'
    },
    {
      id: 6,
      category: 'Pickup & Delivery',question: 'How does pickup work? Do you offer delivery?',
      answer: `We have pickup points in major cities where you can safely meet buyers. These are public, secure locations near metro stations and shopping areas.\n\nFor high-value items (above ₹10,000), we offer doorstep pickup and delivery service for an additional fee. You can also arrange direct pickup with buyers at mutually convenient locations.`,
      icon: 'MapPin',color: 'text-primary'
    },
    {
      id: 7,
      category: 'Account',question: 'Do I need to create an account to buy or sell?',
      answer: `Yes, creating an account helps us maintain a safe community. The registration process is quick and requires:\n\n• Phone number verification\n• Email confirmation\n• Basic profile information\n\nThis helps us verify all users and provides you with order history, saved items, and personalized recommendations.`,
      icon: 'User',color: 'text-secondary'
    },
    {
      id: 8,
      category: 'Support',question: 'What if I have a problem with a transaction?',
      answer: `Our support team is available 24/7 to help resolve any issues. You can:\n\n• Use live chat for immediate assistance\n• Call our support hotline\n• Email us with detailed information\n• Use our dispute resolution system\n\nWe typically resolve most issues within 24 hours and always prioritize customer satisfaction.`,
      icon: 'Headphones',color: 'text-accent'
    }
  ];

  const categories = [...new Set(faqs.map(faq => faq.category))];

  const toggleFAQ = (faqId) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about buying and selling on EcoFinds
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories?.map((category) => (
            <div
              key={category}
              className="px-4 py-2 bg-card rounded-full border border-border text-sm font-medium text-muted-foreground"
            >
              {category}
            </div>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs?.map((faq) => (
            <div
              key={faq?.id}
              className={`bg-card rounded-2xl shadow-eco-card border border-border overflow-hidden transition-all duration-300 ${
                expandedFAQ === faq?.id ? 'ring-2 ring-primary/20' : ''
              }`}
            >
              <button
                onClick={() => toggleFAQ(faq?.id)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-muted/50 rounded-full flex items-center justify-center">
                    <Icon name={faq?.icon} size={20} className={faq?.color} />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-muted-foreground mb-1">
                      {faq?.category}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {faq?.question}
                    </h3>
                  </div>
                </div>
                <Icon
                  name={expandedFAQ === faq?.id ? "ChevronUp" : "ChevronDown"}
                  size={20}
                  className="text-muted-foreground flex-shrink-0"
                />
              </button>

              {expandedFAQ === faq?.id && (
                <div className="px-6 pb-6">
                  <div className="pl-14">
                    <div className="prose prose-sm max-w-none">
                      {faq?.answer?.split('\n\n')?.map((paragraph, index) => (
                        <p key={index} className="text-muted-foreground leading-relaxed mb-3 last:mb-0">
                          {paragraph?.split('\n')?.map((line, lineIndex) => (
                            <span key={lineIndex}>
                              {line}
                              {lineIndex < paragraph?.split('\n')?.length - 1 && <br />}
                            </span>
                          ))}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="mt-16 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 border border-primary/10 text-center">
          <div className="max-w-2xl mx-auto">
            <Icon name="MessageCircle" size={32} className="text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Still Have Questions?
            </h3>
            <p className="text-muted-foreground mb-6">
              Our friendly support team is here to help you 24/7. Get in touch and we'll respond within minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="MessageCircle" size={16} className="text-primary" />
                <span>Live Chat Support</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Phone" size={16} className="text-primary" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Mail" size={16} className="text-primary" />
                <span>help@ecofinds.in</span>
              </div>
            </div>
          </div>
        </div>

        {/* Help Center Link */}
        <div className="text-center mt-8">
          <button className="inline-flex items-center space-x-2 text-primary hover:text-secondary transition-colors font-medium">
            <Icon name="ExternalLink" size={16} />
            <span>Visit our comprehensive Help Center</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;