import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const LocalPickupMap = () => {
  const [selectedCity, setSelectedCity] = useState('mumbai');
  const [activeLocation, setActiveLocation] = useState(null);

  const cities = [
    { id: 'mumbai', name: 'Mumbai', lat: 19.0760, lng: 72.8777, locations: 45 },
    { id: 'delhi', name: 'Delhi', lat: 28.7041, lng: 77.1025, locations: 38 },
    { id: 'bangalore', name: 'Bangalore', lat: 12.9716, lng: 77.5946, locations: 32 },
    { id: 'pune', name: 'Pune', lat: 18.5204, lng: 73.8567, locations: 28 },
    { id: 'chennai', name: 'Chennai', lat: 13.0827, lng: 80.2707, locations: 25 },
    { id: 'hyderabad', name: 'Hyderabad', lat: 17.3850, lng: 78.4867, locations: 22 }
  ];

  const pickupLocations = {
    mumbai: [
      { id: 1, name: 'Bandra West Hub', address: 'Linking Road, Bandra West', sellers: 12, distance: '2.3 km', available: true },
      { id: 2, name: 'Andheri East Center', address: 'Chakala, Andheri East', sellers: 8, distance: '4.1 km', available: true },
      { id: 3, name: 'Powai Collection Point', address: 'Hiranandani Gardens, Powai', sellers: 15, distance: '6.8 km', available: false },
      { id: 4, name: 'Malad West Hub', address: 'Malad West Station Road', sellers: 6, distance: '8.2 km', available: true },
      { id: 5, name: 'Thane Central', address: 'Thane Station Complex', sellers: 9, distance: '12.5 km', available: true }
    ],
    delhi: [
      { id: 1, name: 'Connaught Place Hub', address: 'CP Metro Station', sellers: 18, distance: '1.5 km', available: true },
      { id: 2, name: 'Karol Bagh Center', address: 'Karol Bagh Metro', sellers: 11, distance: '3.2 km', available: true },
      { id: 3, name: 'Lajpat Nagar Point', address: 'Central Market, Lajpat Nagar', sellers: 14, distance: '5.7 km', available: true },
      { id: 4, name: 'Gurgaon Cyber Hub', address: 'DLF Cyber City', sellers: 20, distance: '18.3 km', available: false },
      { id: 5, name: 'Noida Sector 18', address: 'Atta Market, Sector 18', sellers: 13, distance: '22.1 km', available: true }
    ],
    bangalore: [
      { id: 1, name: 'Koramangala Hub', address: '5th Block, Koramangala', sellers: 16, distance: '2.8 km', available: true },
      { id: 2, name: 'Indiranagar Center', address: '100 Feet Road, Indiranagar', sellers: 12, distance: '4.5 km', available: true },
      { id: 3, name: 'Whitefield Point', address: 'ITPL Main Road', sellers: 9, distance: '15.2 km', available: true },
      { id: 4, name: 'Jayanagar Hub', address: '4th Block, Jayanagar', sellers: 7, distance: '6.3 km', available: false },
      { id: 5, name: 'Electronic City', address: 'Hosur Road, Electronic City', sellers: 11, distance: '18.7 km', available: true }
    ]
  };

  const selectedCityData = cities?.find(city => city?.id === selectedCity);
  const locations = pickupLocations?.[selectedCity] || pickupLocations?.mumbai;

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            <span className="text-primary">Local Pickup</span> Locations
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find convenient pickup points near you for safe and easy item collection
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* City Selection & Locations List */}
          <div className="lg:col-span-1 space-y-6">
            {/* City Selector */}
            <div className="bg-card rounded-2xl p-6 shadow-eco-card border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Select Your City</h3>
              <div className="grid grid-cols-2 gap-3">
                {cities?.map((city) => (
                  <button
                    key={city?.id}
                    onClick={() => setSelectedCity(city?.id)}
                    className={`p-3 rounded-xl text-sm font-medium transition-eco ${
                      selectedCity === city?.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                    }`}
                  >
                    <div>{city?.name}</div>
                    <div className="text-xs opacity-80">{city?.locations} locations</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Pickup Locations */}
            <div className="bg-card rounded-2xl p-6 shadow-eco-card border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Pickup Points in {selectedCityData?.name}
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {locations?.map((location) => (
                  <div
                    key={location?.id}
                    className={`p-4 rounded-xl border transition-eco cursor-pointer ${
                      activeLocation === location?.id
                        ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                    } ${!location?.available ? 'opacity-60' : ''}`}
                    onClick={() => setActiveLocation(location?.id)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-foreground text-sm">{location?.name}</h4>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        location?.available 
                          ? 'bg-success/10 text-success' :'bg-destructive/10 text-destructive'
                      }`}>
                        {location?.available ? 'Available' : 'Busy'}
                      </div>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mb-2">{location?.address}</p>
                    
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        <Icon name="Users" size={12} />
                        <span>{location?.sellers} sellers</span>
                      </div>
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        <Icon name="MapPin" size={12} />
                        <span>{location?.distance}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-2xl shadow-eco-card border border-border overflow-hidden">
              {/* Map Header */}
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {selectedCityData?.name} Pickup Locations
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedCityData?.locations} active pickup points
                    </p>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-success rounded-full"></div>
                      <span className="text-muted-foreground">Available</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-destructive rounded-full"></div>
                      <span className="text-muted-foreground">Busy</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Maps Iframe */}
              <div className="relative h-96">
                <iframe
                  width="100%"
                  height="100%"
                  loading="lazy"
                  title={`${selectedCityData?.name} Pickup Locations`}
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${selectedCityData?.lat},${selectedCityData?.lng}&z=12&output=embed`}
                  className="border-0"
                />
                
                {/* Map Overlay Info */}
                <div className="absolute top-4 left-4 bg-card/95 backdrop-blur-sm rounded-lg p-3 shadow-eco-card">
                  <div className="flex items-center space-x-2 text-sm">
                    <Icon name="MapPin" size={16} className="text-primary" />
                    <span className="font-medium text-foreground">{selectedCityData?.name}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {locations?.filter(loc => loc?.available)?.length} locations available now
                  </div>
                </div>
              </div>
            </div>

            {/* How It Works */}
            <div className="mt-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-6 border border-primary/10">
              <h3 className="text-lg font-semibold text-foreground mb-4">How Pickup Works</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground text-sm">Choose Location</h4>
                    <p className="text-xs text-muted-foreground">Select a convenient pickup point near you</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground text-sm">Schedule Time</h4>
                    <p className="text-xs text-muted-foreground">Book a time slot that works for you</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground text-sm">Collect Item</h4>
                    <p className="text-xs text-muted-foreground">Meet the seller and inspect your purchase</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-16 grid md:grid-cols-4 gap-6">
          {[
            { icon: 'Shield', title: 'Safe Meetings', desc: 'Secure, public locations' },
            { icon: 'Clock', title: 'Flexible Hours', desc: '7 AM to 10 PM daily' },
            { icon: 'Users', title: 'Community Verified', desc: 'Trusted by locals' },
            { icon: 'MapPin', title: 'Easy to Find', desc: 'Near metro & bus stops' }
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

export default LocalPickupMap;