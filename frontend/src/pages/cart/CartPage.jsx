import React from 'react';
import { Link } from 'react-router-dom';

const CartPage = () => {
  // Mock cart data
  const cartItems = [
    {
      id: 1,
      title: "Eco-Friendly Water Bottle",
      price: 599,
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=200"
    },
    {
      id: 2,
      title: "Bamboo Utensil Set",
      price: 399,
      image: "https://images.unsplash.com/photo-1585438102009-c17d464a4da5?w=200"
    },
    {
      id: 3,
      title: "Reusable Shopping Bag",
      price: 299,
      image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=200"
    }
  ];

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-bold text-green-600">
              EcoFinds
            </Link>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 text-gray-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        {/* Cart Items */}
        <div className="space-y-4 mb-8">
          {cartItems.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row items-center sm:justify-between space-y-4 sm:space-y-0"
            >
              <div className="flex items-center space-x-4">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                  <p className="text-green-600 font-semibold">Rs. {item.price}</p>
                </div>
              </div>
              <button 
                className="text-red-500 hover:text-red-700 transition-colors"
                aria-label="Remove item"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="bg-white rounded-lg shadow p-6 mb-8 flex justify-between items-center text-lg font-semibold">
          <span>Total Price:</span>
          <span className="text-green-600">Rs. {totalPrice}</span>
        </div>

        {/* Checkout Button */}
        <Link
          to="/checkout"
          className="block w-full bg-green-600 text-white text-center py-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
        >
          Proceed to Checkout
        </Link>
      </main>
    </div>
  );
};

export default CartPage;