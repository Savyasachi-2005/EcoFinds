import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout.jsx';
import StatCard from '../components/dashboard/StatCard.jsx';
import ProfileCard from '../components/dashboard/ProfileCard.jsx';
import Toast from '../components/Toast.jsx';
import { AuthContext } from '../context/AuthContext';
import {
  getCurrentUser,
  updateUser,
  getListingsByUser,
  getActiveListingsByUser,
  getPurchasesByUser,
  getCartItems
} from '../data/store';

// Maximum number of recent items to show
const MAX_RECENT_ITEMS = 3;


export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalListings: 0,
    activeListings: 0,
    purchases: 0,
    cartItems: 0
  });
  const [recentListings, setRecentListings] = useState([]);
  const [recentPurchases, setRecentPurchases] = useState([]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (user) {
      // Fetch all data
      const allListings = getListingsByUser(user.id);
      const activeListings = getActiveListingsByUser(user.id);
      const purchases = getPurchasesByUser(user.id);
      const cartItems = getCartItems(user.id);

      setStats({
        totalListings: allListings.length,
        activeListings: activeListings.length,
        purchases: purchases.length,
        cartItems: cartItems.length
      });

      // Get recent items
      setRecentListings(allListings
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, MAX_RECENT_ITEMS)
      );

      setRecentPurchases(purchases
        .sort((a, b) => new Date(b.purchasedAt) - new Date(a.purchasedAt))
        .slice(0, MAX_RECENT_ITEMS)
      );

      setLoading(false);
    }
  }, [user]);

  const handleProfileUpdate = (userData) => {
    try {
      updateUser({ ...user, ...userData });
      setToast({
        message: 'Profile updated successfully',
        type: 'success'
      });
    } catch (error) {
      setToast({
        message: 'Failed to update profile',
        type: 'error'
      });
    }
  };

  if (!user) {
    return (
      <DashboardLayout>
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <h2 className="text-lg font-medium text-yellow-800 mb-2">Log in to manage your listings</h2>
            <button
              onClick={() => navigate('/auth')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg"
            >
              Log In
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <main className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Page header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">EcoFinds Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Sustainable second-hand marketplace</p>
        </div>

        {/* Profile Card */}
        <section aria-labelledby="profile-heading">
          <h2 id="profile-heading" className="sr-only">Profile</h2>
          <ProfileCard user={user} onSave={handleProfileUpdate} />
        </section>

        {/* Stats Grid */}
        <section aria-labelledby="stats-heading">
          <h2 id="stats-heading" className="sr-only">Account Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="My Listings"
              value={stats.totalListings}
              description="Total items listed"
              onClick={() => navigate('/listings')}
            />
            <StatCard
              title="Active Listings"
              value={stats.activeListings}
              description="Currently for sale"
              onClick={() => navigate('/listings')}
            />
            <StatCard
              title="Previous Purchases"
              value={stats.purchases}
              description="Items bought"
              onClick={() => navigate('/purchases')}
            />
            <StatCard
              title="Items in Cart"
              value={stats.cartItems}
              description="Ready to purchase"
              onClick={() => navigate('/cart')}
            />
          </div>
        </section>

        {/* Actions Row */}
        <section aria-labelledby="actions-heading" className="flex flex-wrap gap-4">
          <button
            onClick={() => navigate('/listings/new')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg inline-flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Listing
          </button>
          
          <button
            onClick={() => navigate('/listings')}
            className="border border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-6 py-2 rounded-lg"
          >
            View My Listings
          </button>
          
          <button
            onClick={() => navigate('/purchases')}
            className="border border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-6 py-2 rounded-lg"
          >
            View Purchases
          </button>
          
          <button
            onClick={() => navigate('/cart')}
            className="border border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-6 py-2 rounded-lg"
          >
            Open Cart
          </button>
        </section>

        {/* Recent Items Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Listings */}
          <section aria-labelledby="recent-listings-heading">
            <h2 id="recent-listings-heading" className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Recent Listings
            </h2>
            {loading ? (
              <div className="space-y-4">
                <div className="h-20 bg-gray-200 rounded-lg animate-pulse" />
                <div className="h-20 bg-gray-200 rounded-lg animate-pulse" />
                <div className="h-20 bg-gray-200 rounded-lg animate-pulse" />
              </div>
            ) : recentListings.length > 0 ? (
              <div className="space-y-4">
                {recentListings.map(listing => (
                  <div
                    key={listing.id}
                    onClick={() => navigate(`/listings/${listing.id}`)}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-gray-900 dark:text-white">{listing.name}</h3>
                      <span className="text-emerald-600 font-medium">${listing.price}</span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Status: {listing.status}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-gray-600 dark:text-gray-400">No listings yet</p>
                <button
                  onClick={() => navigate('/listings/new')}
                  className="mt-4 text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Create your first listing
                </button>
              </div>
            )}
          </section>

          {/* Recent Purchases */}
          <section aria-labelledby="recent-purchases-heading">
            <h2 id="recent-purchases-heading" className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Recent Purchases
            </h2>
            {loading ? (
              <div className="space-y-4">
                <div className="h-20 bg-gray-200 rounded-lg animate-pulse" />
                <div className="h-20 bg-gray-200 rounded-lg animate-pulse" />
                <div className="h-20 bg-gray-200 rounded-lg animate-pulse" />
              </div>
            ) : recentPurchases.length > 0 ? (
              <div className="space-y-4">
                {recentPurchases.map(purchase => (
                  <div
                    key={purchase.id}
                    onClick={() => navigate(`/purchases/${purchase.id}`)}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-gray-900 dark:text-white">{purchase.name}</h3>
                      <span className="text-emerald-600 font-medium">${purchase.price}</span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Purchased on {new Date(purchase.purchasedAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-gray-600 dark:text-gray-400">No purchases yet</p>
                <button
                  onClick={() => navigate('/listings')}
                  className="mt-4 text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Browse listings
                </button>
              </div>
            )}
          </section>
        </div>

        {/* Toast */}
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onDismiss={() => setToast(null)}
          />
        )}
      </main>
    </DashboardLayout>
  );
}

