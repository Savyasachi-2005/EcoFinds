import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import UserProfileCard from '../../components/profile/UserProfileCard';

const HomePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Section */}
          {user && (
            <div className="lg:col-span-1">
              <UserProfileCard className="sticky top-8" />
            </div>
          )}

          {/* Main Content */}
          <div className={user ? 'lg:col-span-3' : 'lg:col-span-4'}>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Welcome to EcoFinds
              </h1>
              <p className="text-gray-600">
                Discover sustainable and eco-friendly products in your community.
              </p>
              {/* Add more homepage content here */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
