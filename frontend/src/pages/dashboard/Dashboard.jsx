import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../../components/dashboard/StatCard';
import ProfileCard from '../../components/dashboard/ProfileCard';
import Icon from '../../components/AppIcon';
import { AuthContext } from '../../context/AuthContext';
import {
  getCurrentUser,
  updateUser,
  getListingsByUser,
  getActiveListingsByUser,
  getPurchasesByUser,
  getCartItems
} from '../../data/store';

// Mock recent activities - replace with real data from backend
const recentActivities = [
  {
    icon: 'Package',
    title: 'New listing created',
    description: 'You listed "Vintage Eco-friendly Water Bottle" for $25',
    time: '2h ago'
  },
  {
    icon: 'ShoppingCart',
    title: 'Item sold',
    description: 'Your "Bamboo Cutlery Set" was purchased by Sarah',
    time: '5h ago'
  },
  {
    icon: 'Heart',
    title: 'Item saved',
    description: 'You saved "Recycled Denim Bag" to your wishlist',
    time: '1d ago'
  }
];

const MAX_RECENT_ITEMS = 3;

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    activeListings: 0,
    totalSales: 0,
    totalPurchases: 0,
    cartItems: 0
  });

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    // Fetch user statistics
    const activeListings = getActiveListingsByUser(user.id);
    const purchases = getPurchasesByUser(user.id);
    const cartItems = getCartItems(user.id);

    setStats({
      activeListings: activeListings.length,
      totalSales: activeListings.reduce((total, listing) => total + listing.price, 0),
      totalPurchases: purchases.length,
      cartItems: cartItems.length
    });
  }, [user, navigate]);

  const handleProfileUpdate = (updatedData) => {
    const updatedUser = updateUser({ ...user, ...updatedData });
    // Update context if needed
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome Header */}
        <div className="flex items-center justify-between bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center">
              <img
                src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=fff&color=10b981`}
                alt={user.name}
                className="h-12 w-12 rounded-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
              <p className="text-gray-500">Here's what's happening with your eco-friendly marketplace</p>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => navigate('/dashboard/listings')}
            className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:border-emerald-500 transition-all shadow-sm group"
          >
            <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
              <Icon name="ShoppingBag" className="h-5 w-5 text-emerald-600 group-hover:text-white" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">My Listings</h3>
              <p className="text-sm text-gray-500">Manage your items</p>
            </div>
          </button>
          <button
            onClick={() => navigate('/dashboard/saved')}
            className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:border-emerald-500 transition-all shadow-sm group"
          >
            <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
              <Icon name="Heart" className="h-5 w-5 text-emerald-600 group-hover:text-white" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">Saved Items</h3>
              <p className="text-sm text-gray-500">View your wishlist</p>
            </div>
          </button>
          <button
            onClick={() => navigate('/dashboard/orders')}
            className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:border-emerald-500 transition-all shadow-sm group"
          >
            <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
              <Icon name="Receipt" className="h-5 w-5 text-emerald-600 group-hover:text-white" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">Orders</h3>
              <p className="text-sm text-gray-500">Track transactions</p>
            </div>
          </button>
          <button
            onClick={() => navigate('/dashboard/settings')}
            className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:border-emerald-500 transition-all shadow-sm group"
          >
            <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
              <Icon name="Settings" className="h-5 w-5 text-emerald-600 group-hover:text-white" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">Settings</h3>
              <p className="text-sm text-gray-500">Manage your account</p>
            </div>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stats Grid */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard
              title="Active Listings"
              value={stats.activeListings}
              trend={5}
              icon={<Icon name="Package" className="h-5 w-5" />}
            />
            <StatCard
              title="Total Sales"
              value={`$${stats.totalSales.toFixed(2)}`}
              trend={12}
              icon={<Icon name="DollarSign" className="h-5 w-5" />}
            />
            <StatCard
              title="Total Purchases"
              value={stats.totalPurchases}
              trend={-3}
              icon={<Icon name="ShoppingCart" className="h-5 w-5" />}
            />
          </div>

          {/* Profile Card */}
          <div className="lg:col-span-1">
            <ProfileCard user={user} onUpdate={handleProfileUpdate} />
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            <button className="text-sm text-emerald-600 hover:text-emerald-700">View all</button>
          </div>
          <div className="space-y-4">
            {recentActivities?.slice(0, 3).map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50">
                <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Icon name={activity.icon} className="h-5 w-5 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-500">{activity.description}</p>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
