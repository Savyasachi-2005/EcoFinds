import React from 'react';

const SavedItemCard = ({ item }) => (
  <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
    <div className="aspect-w-3 aspect-h-2">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
      <p className="text-emerald-600 font-medium mt-1">₹{item.price}</p>
      <div className="flex items-center justify-between mt-2">
        <span className="text-sm text-gray-500">By {item.seller}</span>
        <button className="text-emerald-600 hover:text-emerald-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  </div>
);

const SavedItems = () => {
  // Mock data - replace with API call
  const savedItems = [
    {
      id: 1,
      title: "Vintage Record Player",
      price: 15000,
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
      seller: "Vintage Classics"
    },
    {
      id: 2,
      title: "Handmade Pottery Set",
      price: 3500,
      image: "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9",
      seller: "ArtisanCrafts"
    },
    // Add more mock items here
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Saved Items</h2>
        <div className="text-sm text-gray-500">
          {savedItems.length} items saved
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedItems.map(item => (
          <SavedItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default SavedItems;
