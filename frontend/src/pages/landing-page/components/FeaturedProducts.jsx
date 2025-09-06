import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const FeaturedProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = [
    { id: 'all', name: 'All Items', icon: 'Grid3X3' },
    { id: 'electronics', name: 'Electronics', icon: 'Smartphone' },
    { id: 'fashion', name: 'Fashion', icon: 'Shirt' },
    { id: 'furniture', name: 'Furniture', icon: 'Armchair' },
    { id: 'books', name: 'Books', icon: 'Book' }
  ];

  const products = [
    {
      id: 1,
      title: "iPhone 13 Pro Max",
      category: "electronics",
      originalPrice: 129900,
      salePrice: 75000,
      savings: 42,
      image: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg",
      condition: "Excellent",
      seller: "TechDeals Mumbai",
      rating: 4.9,
      location: "Mumbai, Maharashtra",
      verified: true,
      description: "Pristine condition iPhone 13 Pro Max with original box and accessories. Battery health 95%."
    },
    {
      id: 2,
      title: "Designer Leather Jacket",
      category: "fashion",
      originalPrice: 15999,
      salePrice: 4800,
      savings: 70,
      image: "https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg",
      condition: "Very Good",
      seller: "Fashion Forward",
      rating: 4.8,
      location: "Delhi, NCR",
      verified: true,
      description: "Genuine leather jacket from premium brand. Worn only a few times, excellent condition."
    },
    {
      id: 3,
      title: "MacBook Air M1",
      category: "electronics",
      originalPrice: 99900,
      salePrice: 65000,
      savings: 35,
      image: "https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg",
      condition: "Excellent",
      seller: "Apple Reseller Pro",
      rating: 5.0,
      location: "Bangalore, Karnataka",
      verified: true,
      description: "MacBook Air M1 with 8GB RAM, 256GB SSD. Perfect for students and professionals."
    },
    {
      id: 4,
      title: "Vintage Wooden Bookshelf",
      category: "furniture",
      originalPrice: 12000,
      salePrice: 5500,
      savings: 54,
      image: "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg",
      condition: "Good",
      seller: "Vintage Finds",
      rating: 4.7,
      location: "Pune, Maharashtra",
      verified: true,
      description: "Beautiful vintage wooden bookshelf with 5 shelves. Perfect for home library."
    },
    {
      id: 5,
      title: "Canon DSLR Camera",
      category: "electronics",
      originalPrice: 45000,
      salePrice: 28000,
      savings: 38,
      image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg",
      condition: "Very Good",
      seller: "Camera Hub",
      rating: 4.9,
      location: "Chennai, Tamil Nadu",
      verified: true,
      description: "Canon EOS 1500D with 18-55mm lens. Great for photography enthusiasts."
    },
    {
      id: 6,
      title: "Designer Handbag",
      category: "fashion",
      originalPrice: 8999,
      salePrice: 2700,
      savings: 70,
      image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
      condition: "Excellent",
      seller: "Luxury Bags",
      rating: 4.8,
      location: "Mumbai, Maharashtra",
      verified: true,
      description: "Authentic designer handbag in excellent condition. Comes with authenticity certificate."
    },
    {
      id: 7,
      title: "Programming Books Set",
      category: "books",
      originalPrice: 3500,
      salePrice: 1800,
      savings: 49,
      image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg",
      condition: "Good",
      seller: "BookWorm Collection",
      rating: 4.6,
      location: "Hyderabad, Telangana",
      verified: true,
      description: "Complete set of programming books including Python, JavaScript, and React guides."
    },
    {
      id: 8,
      title: "Gaming Chair",
      category: "furniture",
      originalPrice: 18000,
      salePrice: 9000,
      savings: 50,
      image: "https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg",
      condition: "Very Good",
      seller: "Gaming Gear",
      rating: 4.7,
      location: "Gurgaon, Haryana",
      verified: true,
      description: "Ergonomic gaming chair with lumbar support. Perfect for long gaming sessions."
    },
    {
      id: 9,
      title: "Smartwatch Series 7",
      category: "electronics",
      originalPrice: 41900,
      salePrice: 25000,
      savings: 40,
      image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg",
      condition: "Excellent",
      seller: "Smart Accessories",
      rating: 4.9,
      location: "Kolkata, West Bengal",
      verified: true,
      description: "Apple Watch Series 7 with GPS and cellular. Includes original charger and bands."
    },
    {
      id: 10,
      title: "Vintage Denim Jacket",
      category: "fashion",
      originalPrice: 4999,
      salePrice: 1500,
      savings: 70,
      image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg",
      condition: "Good",
      seller: "Retro Fashion",
      rating: 4.5,
      location: "Jaipur, Rajasthan",
      verified: true,
      description: "Classic vintage denim jacket with authentic wear. Perfect for casual styling."
    },
    {
      id: 11,
      title: "Study Table with Drawer",
      category: "furniture",
      originalPrice: 8500,
      salePrice: 3800,
      savings: 55,
      image: "https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg",
      condition: "Very Good",
      seller: "Home Essentials",
      rating: 4.6,
      location: "Ahmedabad, Gujarat",
      verified: true,
      description: "Compact study table with storage drawer. Ideal for students and home office."
    },
    {
      id: 12,
      title: "Fiction Novel Collection",
      category: "books",
      originalPrice: 2800,
      salePrice: 1400,
      savings: 50,
      image: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg",
      condition: "Good",
      seller: "Novel Paradise",
      rating: 4.4,
      location: "Kochi, Kerala",
      verified: true,
      description: "Collection of bestselling fiction novels from popular authors. Great for book lovers."
    }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products?.filter(product => product?.category === selectedCategory);

  const openProductModal = (product) => {
    setSelectedProduct(product);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  return (
    <section id="shop-products" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Featured <span className="text-primary">Products</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover amazing deals on quality pre-owned items from verified sellers
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => setSelectedCategory(category?.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-eco ${
                selectedCategory === category?.id
                  ? 'bg-primary text-primary-foreground shadow-eco-card'
                  : 'bg-card text-muted-foreground hover:text-foreground hover:bg-muted border border-border'
              }`}
            >
              <Icon name={category?.icon} size={18} />
              <span className="font-medium">{category?.name}</span>
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts?.map((product) => (
            <div
              key={product?.id}
              className="bg-card rounded-2xl shadow-eco-card border border-border hover:shadow-eco-cta transition-eco cursor-pointer group"
              onClick={() => openProductModal(product)}
            >
              {/* Product Image */}
              <div className="relative overflow-hidden rounded-t-2xl">
                <Image
                  src={product?.image}
                  alt={product?.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Savings Badge */}
                <div className="absolute top-3 left-3 bg-success text-success-foreground px-2 py-1 rounded-full text-xs font-bold">
                  {product?.savings}% OFF
                </div>
                
                {/* Verified Badge */}
                {product?.verified && (
                  <div className="absolute top-3 right-3 bg-primary text-primary-foreground p-1 rounded-full">
                    <Icon name="ShieldCheck" size={16} />
                  </div>
                )}

                {/* Quick View Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button variant="default" size="sm" iconName="Eye" iconPosition="left">
                    Quick View
                  </Button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {product?.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{product?.condition}</p>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-primary">
                    ₹{product?.salePrice?.toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm text-muted-foreground line-through">
                    ₹{product?.originalPrice?.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Seller Info */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={14} className="text-warning fill-current" />
                    <span className="font-medium">{product?.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <Icon name="MapPin" size={14} />
                    <span className="truncate">{product?.location?.split(',')?.[0]}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            iconName="Plus"
            iconPosition="left"
          >
            Load More Products
          </Button>
        </div>

        {/* Product Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 z-300 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h3 className="text-xl font-bold text-foreground">Product Details</h3>
                <button
                  onClick={closeProductModal}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Product Image */}
                  <div className="relative">
                    <Image
                      src={selectedProduct?.image}
                      alt={selectedProduct?.title}
                      className="w-full h-64 object-cover rounded-xl"
                    />
                    <div className="absolute top-3 left-3 bg-success text-success-foreground px-3 py-1 rounded-full text-sm font-bold">
                      {selectedProduct?.savings}% OFF
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-2xl font-bold text-foreground mb-2">
                        {selectedProduct?.title}
                      </h4>
                      <p className="text-muted-foreground">{selectedProduct?.description}</p>
                    </div>

                    {/* Price */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl font-bold text-primary">
                          ₹{selectedProduct?.salePrice?.toLocaleString('en-IN')}
                        </span>
                        <span className="text-lg text-muted-foreground line-through">
                          ₹{selectedProduct?.originalPrice?.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <p className="text-sm text-success font-medium">
                        You save ₹{(selectedProduct?.originalPrice - selectedProduct?.salePrice)?.toLocaleString('en-IN')}
                      </p>
                    </div>

                    {/* Seller Info */}
                    <div className="bg-muted/50 rounded-xl p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-foreground">{selectedProduct?.seller}</span>
                        {selectedProduct?.verified && (
                          <div className="flex items-center space-x-1 text-primary">
                            <Icon name="ShieldCheck" size={16} />
                            <span className="text-sm">Verified</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Icon name="Star" size={14} className="text-warning fill-current" />
                          <span>{selectedProduct?.rating} rating</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="MapPin" size={14} />
                          <span>{selectedProduct?.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Condition */}
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">Condition:</span>
                      <span className="text-sm font-medium text-foreground">{selectedProduct?.condition}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <Button variant="default" fullWidth iconName="MessageCircle" iconPosition="left">
                    Contact Seller
                  </Button>
                  <Button variant="outline" fullWidth iconName="Heart" iconPosition="left">
                    Save Item
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;