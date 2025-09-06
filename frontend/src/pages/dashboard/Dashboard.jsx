import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../../components/dashboard/StatCard';
import ProfileCard from '../../components/dashboard/ProfileCard';
import { AuthContext } from '../../context/AuthContext';
import {
  getCurrentUser,
  updateUser,
  getListingsByUser,
  getActiveListingsByUser,
  getPurchasesByUser,
  getCartItems
} from '../../data/store';

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <ProfileCard user={user} onUpdate={handleProfileUpdate} />
        </div>

        {/* Stats Grid */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard
            title="Active Listings"
            value={stats.activeListings}
            trend={5}
          />
          <StatCard
            title="Total Sales"
            value={`$${stats.totalSales.toFixed(2)}`}
            trend={12}
          />
          <StatCard
            title="Total Purchases"
            value={stats.totalPurchases}
            trend={-3}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
