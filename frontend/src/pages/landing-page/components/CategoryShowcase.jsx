import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const CategoryShowcase = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const categories = [
    {
      id: 'electronics',
      name: 'Electronics',
      icon: 'Smartphone',
      itemCount: '15,234',
      color: 'from-blue-500 to-purple-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      subcategories: ['Smartphones', 'Laptops', 'Cameras', 'Gaming', 'Audio'],
      description: 'Latest gadgets at unbeatable prices'
    },
    {
      id: 'fashion',
      name: 'Fashion',
      icon: 'Shirt',
      itemCount: '28,567',
      color: 'from-pink-500 to-rose-600',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-600',
      subcategories: ['Clothing', 'Shoes', 'Accessories', 'Bags', 'Jewelry'],
      description: 'Trendy styles for every occasion'
    },
    {
      id: 'furniture',
      name: 'Furniture',
      icon: 'Armchair',
      itemCount: '8,923',
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
      subcategories: ['Seating', 'Tables', 'Storage', 'Bedroom', 'Decor'],
      description: 'Transform your living space'
    },
    {
      id: 'books',
      name: 'Books',
      icon: 'Book',
      itemCount: '12,456',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      subcategories: ['Fiction', 'Non-fiction', 'Academic', 'Comics', 'Magazines'],
      description: 'Knowledge at your fingertips'
    },
    {
      id: 'sports',
      name: 'Sports & Fitness',
      icon: 'Dumbbell',
      itemCount: '6,789',
      color: 'from-red-500 to-pink-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      subcategories: ['Gym Equipment', 'Outdoor Sports', 'Yoga', 'Cycling', 'Swimming'],
      description: 'Stay fit and active'
    },
    {
      id: 'home',
      name: 'Home & Garden',
      icon: 'Home',
      itemCount: '9,234',
      color: 'from-teal-500 to-cyan-600',
      bgColor: 'bg-teal-50',
      textColor: 'text-teal-600',
      subcategories: ['Kitchen', 'Garden Tools', 'Appliances', 'Cleaning', 'Storage'],
      description: 'Everything for your home'
    },
    {
      id: 'automotive',
      name: 'Automotive',
      icon: 'Car',
      itemCount: '4,567',
      color: 'from-gray-500 to-slate-600',
      bgColor: 'bg-gray-50',
      textColor: 'text-gray-600',
      subcategories: ['Car Parts', 'Accessories', 'Tools', 'Tires', 'Electronics'],
      description: 'Keep your ride running smooth'
    },
    {
      id: 'toys',
      name: 'Toys & Games',
      icon: 'Gamepad2',
      itemCount: '7,890',
      color: 'from-violet-500 to-purple-600',
      bgColor: 'bg-violet-50',
      textColor: 'text-violet-600',
      subcategories: ['Board Games', 'Action Figures', 'Educational', 'Puzzles', 'Outdoor'],
      description: 'Fun for all ages'
    }
  ];

  const handleCategoryClick = (categoryId) => {
    const element = document.getElementById('shop-products');
    if (element) {
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Shop by <span className="text-primary">Category</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find exactly what you're looking for in our carefully curated categories
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories?.map((category) => (
            <div
              key={category?.id}
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredCategory(category?.id)}
              onMouseLeave={() => setHoveredCategory(null)}
              onClick={() => handleCategoryClick(category?.id)}
            >
              {/* Main Category Card */}
              <div className={`relative bg-card rounded-2xl p-6 shadow-eco-card border border-border hover:shadow-eco-cta transition-all duration-300 transform hover:-translate-y-2 ${category?.bgColor}`}>
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category?.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                
                {/* Content */}
                <div className="relative z-10 text-center space-y-4">
                  {/* Icon */}
                  <div className={`w-16 h-16 mx-auto rounded-2xl ${category?.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon name={category?.icon} size={32} className={category?.textColor} />
                  </div>
                  
                  {/* Category Info */}
                  <div>
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {category?.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {category?.description}
                    </p>
                  </div>
                  
                  {/* Item Count */}
                  <div className="flex items-center justify-center space-x-2">
                    <Icon name="Package" size={16} className="text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">
                      {category?.itemCount} items
                    </span>
                  </div>
                </div>

                {/* Hover Arrow */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Icon name="ArrowUpRight" size={20} className={category?.textColor} />
                </div>
              </div>

              {/* Subcategories Dropdown */}
              {hoveredCategory === category?.id && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-xl shadow-eco-cta border border-border p-4 z-20 animate-in slide-in-from-top-2 duration-200">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-foreground mb-3">Popular in {category?.name}</h4>
                    {category?.subcategories?.map((subcategory, index) => (
                      <button
                        key={index}
                        className="block w-full text-left text-sm text-muted-foreground hover:text-primary hover:bg-muted/50 px-2 py-1 rounded transition-colors"
                        onClick={(e) => {
                          e?.stopPropagation();
                          handleCategoryClick(category?.id);
                        }}
                      >
                        {subcategory}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Browse All Categories */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer group">
            <span className="font-medium">Browse all categories</span>
            <Icon name="ArrowRight" size={16} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Category Stats */}
        <div className="mt-16 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 border border-primary/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50K+</div>
              <div className="text-sm text-muted-foreground">Total Products</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary mb-2">8</div>
              <div className="text-sm text-muted-foreground">Main Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">100+</div>
              <div className="text-sm text-muted-foreground">Subcategories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-success mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">New Listings</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;