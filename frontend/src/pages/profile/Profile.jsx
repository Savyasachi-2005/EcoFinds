import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import ProfileHeader from '../../components/profile/ProfileHeader';
import ProfileTabs from '../../components/profile/ProfileTabs';
import MyListings from '../../components/profile/MyListings';
import SavedItems from '../../components/profile/SavedItems';
import OrderHistory from '../../components/profile/OrderHistory';
import Settings from '../../components/profile/Settings';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('listings');

  // Mock data - replace with API calls
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Abhisek Hiremath',
    email: user?.email || 'abhisek.h@example.com',
    location: 'Bengaluru, Karnataka',
    avatar: user?.avatar || 'https://randomuser.me/api/portraits/men/44.jpg'
  });

  const handleProfileUpdate = (updatedData) => {
    setProfileData({ ...profileData, ...updatedData });
    // TODO: API call to update profile
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'listings':
        return <MyListings />;
      case 'saved':
        return <SavedItems />;
      case 'orders':
        return <OrderHistory />;
      case 'settings':
        return <Settings user={profileData} onUpdate={handleProfileUpdate} />;
      default:
        return <MyListings />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfileHeader 
          user={profileData}
          onUpdate={handleProfileUpdate}
        />
        
        <div className="mt-8">
          <ProfileTabs 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
          />
          
          <div className="mt-6 bg-white rounded-xl shadow-sm">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
