import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const QuickSellForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    condition: '',
    originalPrice: '',
    sellingPrice: '',
    photos: [],
    location: '',
    contactMethod: 'phone'
  });
  const [dragActive, setDragActive] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const categories = [
    { id: 'electronics', name: 'Electronics', icon: 'Smartphone', priceMultiplier: 0.6 },
    { id: 'fashion', name: 'Fashion', icon: 'Shirt', priceMultiplier: 0.4 },
    { id: 'furniture', name: 'Furniture', icon: 'Armchair', priceMultiplier: 0.5 },
    { id: 'books', name: 'Books', icon: 'Book', priceMultiplier: 0.3 },
    { id: 'sports', name: 'Sports', icon: 'Dumbbell', priceMultiplier: 0.45 },
    { id: 'home', name: 'Home & Garden', icon: 'Home', priceMultiplier: 0.4 }
  ];

  const conditions = [
    { id: 'excellent', name: 'Excellent', desc: 'Like new, minimal wear', multiplier: 1.0 },
    { id: 'very-good', name: 'Very Good', desc: 'Minor signs of use', multiplier: 0.85 },
    { id: 'good', name: 'Good', desc: 'Noticeable wear but functional', multiplier: 0.7 },
    { id: 'fair', name: 'Fair', desc: 'Significant wear, fully functional', multiplier: 0.55 }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Auto-calculate price estimate
    if (field === 'originalPrice' || field === 'condition' || field === 'category') {
      calculatePriceEstimate({ ...formData, [field]: value });
    }
  };

  const calculatePriceEstimate = (data) => {
    if (data?.originalPrice && data?.category && data?.condition) {
      const category = categories?.find(cat => cat?.id === data?.category);
      const condition = conditions?.find(cond => cond?.id === data?.condition);
      
      if (category && condition) {
        const basePrice = parseFloat(data?.originalPrice);
        const estimated = Math.round(basePrice * category?.priceMultiplier * condition?.multiplier);
        setEstimatedPrice(estimated);
        handleInputChange('sellingPrice', estimated?.toString());
      }
    }
  };

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFiles(e?.dataTransfer?.files);
    }
  };

  const handleFiles = (files) => {
    const fileArray = Array.from(files)?.slice(0, 5); // Max 5 photos
    const photoUrls = fileArray?.map(file => URL.createObjectURL(file));
    setFormData(prev => ({ ...prev, photos: [...prev?.photos, ...photoUrls]?.slice(0, 5) }));
    
    // Simulate AI category detection
    if (fileArray?.length > 0 && !formData?.category) {
      setIsProcessing(true);
      setTimeout(() => {
        const randomCategory = categories?.[Math.floor(Math.random() * categories?.length)];
        handleInputChange('category', randomCategory?.id);
        setIsProcessing(false);
      }, 2000);
    }
  };

  const removePhoto = (index) => {
    setFormData(prev => ({
      ...prev,
      photos: prev?.photos?.filter((_, i) => i !== index)
    }));
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const submitForm = () => {
    // Simulate form submission
    alert('Your item has been listed successfully! You will receive notifications when buyers show interest.');
    // Reset form
    setFormData({
      category: '',
      title: '',
      description: '',
      condition: '',
      originalPrice: '',
      sellingPrice: '',
      photos: [],
      location: '',
      contactMethod: 'phone'
    });
    setCurrentStep(1);
    setEstimatedPrice(null);
  };

  return (
    <section id="start-selling" className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Start <span className="text-primary">Selling</span> in Minutes
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            List your items quickly with our smart form that helps you get the best price
          </p>
        </div>

        <div className="bg-card rounded-3xl shadow-eco-cta border border-border overflow-hidden">
          {/* Progress Bar */}
          <div className="bg-muted/30 px-8 py-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Step {currentStep} of 3</span>
              <span className="text-sm text-muted-foreground">
                {currentStep === 1 && 'Item Details'}
                {currentStep === 2 && 'Photos & Pricing'}
                {currentStep === 3 && 'Contact Info'}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              />
            </div>
          </div>

          <div className="p-8">
            {/* Step 1: Item Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">What are you selling?</h3>
                  
                  {/* Category Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-foreground mb-3">Category</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {categories?.map((category) => (
                        <button
                          key={category?.id}
                          onClick={() => handleInputChange('category', category?.id)}
                          className={`p-4 rounded-xl border-2 transition-eco text-center ${
                            formData?.category === category?.id
                              ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          <Icon name={category?.icon} size={24} className="mx-auto mb-2" />
                          <span className="text-sm font-medium">{category?.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Item Title */}
                  <Input
                    label="Item Title"
                    type="text"
                    placeholder="e.g., iPhone 13 Pro Max 256GB"
                    value={formData?.title}
                    onChange={(e) => handleInputChange('title', e?.target?.value)}
                    required
                    className="mb-4"
                  />

                  {/* Description */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                    <textarea
                      placeholder="Describe your item's condition, features, and any included accessories..."
                      value={formData?.description}
                      onChange={(e) => handleInputChange('description', e?.target?.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    />
                  </div>

                  {/* Condition */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">Condition</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {conditions?.map((condition) => (
                        <button
                          key={condition?.id}
                          onClick={() => handleInputChange('condition', condition?.id)}
                          className={`p-4 rounded-xl border-2 transition-eco text-left ${
                            formData?.condition === condition?.id
                              ? 'border-primary bg-primary/10' :'border-border hover:border-primary/50'
                          }`}
                        >
                          <div className="font-medium text-foreground">{condition?.name}</div>
                          <div className="text-sm text-muted-foreground">{condition?.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Photos & Pricing */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">Add Photos & Set Price</h3>
                
                {/* Photo Upload */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Photos (up to 5)
                    {isProcessing && <span className="text-primary ml-2">🤖 AI detecting category...</span>}
                  </label>
                  
                  <div
                    className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                      dragActive 
                        ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleFiles(e?.target?.files)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    
                    <Icon name="Upload" size={32} className="mx-auto mb-4 text-muted-foreground" />
                    <p className="text-foreground font-medium mb-2">
                      Drag & drop photos here, or click to browse
                    </p>
                    <p className="text-sm text-muted-foreground">
                      JPG, PNG up to 10MB each. First photo will be the main image.
                    </p>
                  </div>

                  {/* Photo Preview */}
                  {formData?.photos?.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                      {formData?.photos?.map((photo, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={photo}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => removePhoto(index)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Icon name="X" size={14} />
                          </button>
                          {index === 0 && (
                            <div className="absolute bottom-1 left-1 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                              Main
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Pricing */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="Original Price (₹)"
                    type="number"
                    placeholder="What did you pay for it?"
                    value={formData?.originalPrice}
                    onChange={(e) => handleInputChange('originalPrice', e?.target?.value)}
                    required
                  />
                  
                  <Input
                    label="Selling Price (₹)"
                    type="number"
                    placeholder="Your asking price"
                    value={formData?.sellingPrice}
                    onChange={(e) => handleInputChange('sellingPrice', e?.target?.value)}
                    required
                    description={estimatedPrice ? `AI suggests: ₹${estimatedPrice?.toLocaleString('en-IN')}` : ''}
                  />
                </div>

                {/* Price Suggestion */}
                {estimatedPrice && (
                  <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                      <Icon name="Lightbulb" size={20} className="text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium text-foreground mb-1">Smart Pricing Suggestion</h4>
                        <p className="text-sm text-muted-foreground">
                          Based on your item's category and condition, we suggest pricing it at{' '}
                          <span className="font-semibold text-primary">₹{estimatedPrice?.toLocaleString('en-IN')}</span>.
                          This gives you a good balance between quick sale and fair value.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Contact Info */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">How can buyers reach you?</h3>
                
                <Input
                  label="Your Location"
                  type="text"
                  placeholder="e.g., Bandra West, Mumbai"
                  value={formData?.location}
                  onChange={(e) => handleInputChange('location', e?.target?.value)}
                  required
                  className="mb-4"
                />

                {/* Contact Method */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">Preferred Contact Method</label>
                  <div className="space-y-3">
                    {[
                      { id: 'phone', name: 'Phone Call', icon: 'Phone', desc: 'Buyers can call you directly' },
                      { id: 'whatsapp', name: 'WhatsApp', icon: 'MessageCircle', desc: 'Chat via WhatsApp' },
                      { id: 'platform', name: 'Platform Messages', icon: 'Mail', desc: 'Messages through EcoFinds' }
                    ]?.map((method) => (
                      <button
                        key={method?.id}
                        onClick={() => handleInputChange('contactMethod', method?.id)}
                        className={`w-full p-4 rounded-xl border-2 transition-eco text-left flex items-center space-x-4 ${
                          formData?.contactMethod === method?.id
                            ? 'border-primary bg-primary/10' :'border-border hover:border-primary/50'
                        }`}
                      >
                        <Icon name={method?.icon} size={20} className="text-primary" />
                        <div>
                          <div className="font-medium text-foreground">{method?.name}</div>
                          <div className="text-sm text-muted-foreground">{method?.desc}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-muted/50 rounded-xl p-6">
                  <h4 className="font-semibold text-foreground mb-4">Listing Summary</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Item:</span>
                      <span className="ml-2 font-medium text-foreground">{formData?.title || 'Not specified'}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Category:</span>
                      <span className="ml-2 font-medium text-foreground">
                        {categories?.find(cat => cat?.id === formData?.category)?.name || 'Not selected'}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Condition:</span>
                      <span className="ml-2 font-medium text-foreground">
                        {conditions?.find(cond => cond?.id === formData?.condition)?.name || 'Not selected'}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Price:</span>
                      <span className="ml-2 font-medium text-primary">
                        ₹{formData?.sellingPrice ? parseInt(formData?.sellingPrice)?.toLocaleString('en-IN') : '0'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                iconName="ChevronLeft"
                iconPosition="left"
              >
                Previous
              </Button>

              <div className="flex space-x-3">
                {currentStep < 3 ? (
                  <Button
                    variant="default"
                    onClick={nextStep}
                    iconName="ChevronRight"
                    iconPosition="right"
                  >
                    Next Step
                  </Button>
                ) : (
                  <Button
                    variant="default"
                    onClick={submitForm}
                    iconName="Check"
                    iconPosition="left"
                  >
                    List My Item
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            { icon: 'Zap', title: 'Quick Listing', desc: 'List items in under 5 minutes' },
            { icon: 'TrendingUp', title: 'Smart Pricing', desc: 'AI-powered price suggestions' },
            { icon: 'Users', title: 'Verified Buyers', desc: 'Connect with genuine buyers only' }
          ]?.map((benefit, index) => (
            <div key={index} className="bg-card rounded-xl p-6 shadow-eco-card border border-border text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name={benefit?.icon} size={24} className="text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">{benefit?.title}</h4>
              <p className="text-sm text-muted-foreground">{benefit?.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickSellForm;