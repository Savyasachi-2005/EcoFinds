import React from 'react';

const ProfileTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'listings', label: 'My Listings', icon: 'ShoppingBag' },
    { id: 'saved', label: 'Saved Items', icon: 'Heart' },
    { id: 'orders', label: 'Orders', icon: 'ShoppingCart' },
    { id: 'settings', label: 'Settings', icon: 'Cog' }
  ];

  return (
    <div className="border-b border-gray-200">
      <nav className="flex -mb-px space-x-8">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === tab.id
                ? 'border-emerald-500 text-emerald-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default ProfileTabs;
