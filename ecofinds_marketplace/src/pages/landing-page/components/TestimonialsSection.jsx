import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentStory, setCurrentStory] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Mumbai, Maharashtra",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      rating: 5,
      text: "I saved ₹45,000 on a MacBook Pro that works perfectly! The seller was verified and the pickup was seamless. EcoFinds has become my go-to for tech purchases.",
      purchase: "MacBook Pro 2020",
      savings: 45000,
      category: "Electronics"
    },
    {
      id: 2,
      name: "Rahul Gupta",
      location: "Delhi, NCR",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      rating: 5,
      text: "Found an amazing vintage leather jacket that would cost ₹15,000 new for just ₹4,500. The quality is exceptional and it has such character!",
      purchase: "Vintage Leather Jacket",
      savings: 10500,
      category: "Fashion"
    },
    {
      id: 3,
      name: "Sneha Patel",
      location: "Bangalore, Karnataka",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      rating: 5,
      text: "As a student, EcoFinds helped me furnish my entire room for under ₹20,000. Everything was in great condition and the sellers were so helpful!",
      purchase: "Furniture Set",
      savings: 35000,
      category: "Furniture"
    },
    {
      id: 4,
      name: "Amit Kumar",
      location: "Pune, Maharashtra",
      avatar: "https://randomuser.me/api/portraits/men/35.jpg",
      rating: 5,
      text: "Sold my old gaming setup in just 2 days! The platform made it so easy to list items and connect with genuine buyers. Highly recommended!",
      purchase: "Gaming Setup",
      savings: 25000,
      category: "Electronics"
    },
    {
      id: 5,
      name: "Kavya Reddy",
      location: "Hyderabad, Telangana",
      avatar: "https://randomuser.me/api/portraits/women/42.jpg",
      rating: 5,
      text: "I've bought books, clothes, and home decor from EcoFinds. Every purchase has been a pleasant surprise. Great quality at unbeatable prices!",
      purchase: "Various Items",
      savings: 18000,
      category: "Multiple"
    }
  ];

  const successStories = [
    {
      id: 1,
      title: "From Clutter to Cash",
      seller: "Meera Joshi",
      location: "Chennai, Tamil Nadu",
      avatar: "https://randomuser.me/api/portraits/women/25.jpg",
      story: "I decluttered my home and made ₹85,000 in 3 months selling items I no longer needed. EcoFinds made the process so simple!",
      earnings: 85000,
      itemsSold: 23,
      rating: 4.9
    },
    {
      id: 2,
      title: "Student Success Story",
      seller: "Arjun Singh",
      location: "Jaipur, Rajasthan",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      story: "Started selling old textbooks and electronics. Now I earn ₹15,000 monthly helping other students find affordable study materials!",
      earnings: 180000,
      itemsSold: 156,
      rating: 4.8
    },
    {
      id: 3,
      title: "Eco Entrepreneur",
      seller: "Ravi Nair",
      location: "Kochi, Kerala",
      avatar: "https://randomuser.me/api/portraits/men/38.jpg",
      story: "Turned my passion for vintage items into a thriving business. EcoFinds helped me reach customers across India!",
      earnings: 250000,
      itemsSold: 89,
      rating: 5.0
    }
  ];

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, testimonials?.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStory((prev) => (prev + 1) % successStories?.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [successStories?.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials?.length) % testimonials?.length);
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            What Our <span className="text-primary">Community</span> Says
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real stories from real people who've saved money and helped the environment
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Buyer Testimonials */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-foreground text-center">Happy Buyers</h3>
            
            <div className="relative">
              {/* Main Testimonial */}
              <div className="bg-card rounded-2xl p-8 shadow-eco-cta border border-border">
                <div className="flex items-start space-x-4 mb-6">
                  <Image
                    src={testimonials?.[currentTestimonial]?.avatar}
                    alt={testimonials?.[currentTestimonial]?.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-foreground">
                        {testimonials?.[currentTestimonial]?.name}
                      </h4>
                      <div className="flex items-center space-x-1">
                        {[...Array(testimonials?.[currentTestimonial]?.rating)]?.map((_, i) => (
                          <Icon key={i} name="Star" size={16} className="text-warning fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground flex items-center">
                      <Icon name="MapPin" size={14} className="mr-1" />
                      {testimonials?.[currentTestimonial]?.location}
                    </p>
                  </div>
                </div>

                <blockquote className="text-foreground mb-6 text-lg leading-relaxed">
                  "{testimonials?.[currentTestimonial]?.text}"
                </blockquote>

                <div className="flex items-center justify-between">
                  <div className="bg-primary/10 rounded-lg px-4 py-2">
                    <p className="text-sm text-muted-foreground">Purchased</p>
                    <p className="font-semibold text-primary">{testimonials?.[currentTestimonial]?.purchase}</p>
                  </div>
                  <div className="bg-success/10 rounded-lg px-4 py-2">
                    <p className="text-sm text-muted-foreground">Saved</p>
                    <p className="font-semibold text-success">₹{testimonials?.[currentTestimonial]?.savings?.toLocaleString('en-IN')}</p>
                  </div>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={prevTestimonial}
                  className="p-2 rounded-full bg-card border border-border hover:bg-muted transition-colors"
                >
                  <Icon name="ChevronLeft" size={20} />
                </button>

                <div className="flex space-x-2">
                  {testimonials?.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentTestimonial ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextTestimonial}
                  className="p-2 rounded-full bg-card border border-border hover:bg-muted transition-colors"
                >
                  <Icon name="ChevronRight" size={20} />
                </button>
              </div>

              {/* Play/Pause Button */}
              <div className="text-center mt-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors mx-auto"
                >
                  <Icon name={isPlaying ? "Pause" : "Play"} size={16} />
                  <span>{isPlaying ? 'Pause' : 'Play'} Auto-scroll</span>
                </button>
              </div>
            </div>
          </div>

          {/* Seller Success Stories */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-foreground text-center">Seller Success Stories</h3>
            
            <div className="space-y-6">
              {successStories?.map((story, index) => (
                <div
                  key={story?.id}
                  className={`bg-card rounded-2xl p-6 shadow-eco-card border border-border transition-all duration-500 ${
                    index === currentStory 
                      ? 'ring-2 ring-primary shadow-eco-cta transform scale-105' 
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <Image
                      src={story?.avatar}
                      alt={story?.seller}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-foreground">{story?.title}</h4>
                        <div className="flex items-center space-x-1">
                          <Icon name="Star" size={14} className="text-warning fill-current" />
                          <span className="text-sm font-medium">{story?.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {story?.seller} • {story?.location}
                      </p>
                      <p className="text-foreground text-sm leading-relaxed mb-4">
                        {story?.story}
                      </p>
                      
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-lg font-bold text-primary">
                            ₹{story?.earnings?.toLocaleString('en-IN')}
                          </div>
                          <div className="text-xs text-muted-foreground">Total Earned</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-secondary">
                            {story?.itemsSold}
                          </div>
                          <div className="text-xs text-muted-foreground">Items Sold</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-accent">
                            {story?.rating}★
                          </div>
                          <div className="text-xs text-muted-foreground">Rating</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Community Stats */}
        <div className="mt-16 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 border border-primary/10">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">Community Impact</h3>
            <p className="text-muted-foreground">Together, we're making a difference</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">2L+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary mb-2">₹50Cr+</div>
              <div className="text-sm text-muted-foreground">Money Saved</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">1M+</div>
              <div className="text-sm text-muted-foreground">Items Rescued</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-success mb-2">500T+</div>
              <div className="text-sm text-muted-foreground">CO₂ Prevented</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;