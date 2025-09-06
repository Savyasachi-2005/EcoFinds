import React from 'react';

const ListingCard = ({ listing }) => (
  <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
    <div className="aspect-w-3 aspect-h-2">
      <img
        src={listing.image}
        alt={listing.title}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-900">{listing.title}</h3>
      <p className="text-emerald-600 font-medium mt-1">₹{listing.price}</p>
      <div className="flex items-center justify-between mt-2">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
          ${listing.status === 'active' 
            ? 'bg-emerald-100 text-emerald-800'
            : 'bg-gray-100 text-gray-800'
          }`}>
          {listing.status}
        </span>
        <span className="text-sm text-gray-500">{listing.views} views</span>
      </div>
    </div>
  </div>
);

const MyListings = () => {
  // Mock data - replace with API call
  const listings = [
    {
      id: 1,
      title: "Vintage Camera",
      price: 12000,
      image: "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848",
      status: "active",
      views: 245
    },
    {
      id: 2,
      title: "Mechanical Keyboard",
      price: 8500,
      image: "https://images.unsplash.com/photo-1601445638532-3c6f6c3282ba",
      status: "sold",
      views: 182
    },
    // Add more mock listings here
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">My Listings</h2>
        <button className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition-colors">
          Add New Listing
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map(listing => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
};

export default MyListings;
