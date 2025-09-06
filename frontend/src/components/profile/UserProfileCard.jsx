import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const QuickActionButton = ({ to, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`
      flex items-center justify-center gap-2 p-2 rounded-lg text-sm font-medium
      ${to ? 'bg-gray-50 text-gray-700 hover:bg-gray-100' : 
             'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}
      transition-colors w-full
    `}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const UserProfileCard = ({ className = "" }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className={`bg-white rounded-xl shadow-sm p-6 ${className}`}>
      <div className="flex flex-col items-center text-center">
        {/* Profile Picture */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-emerald-50">
            <img
              src={user.avatar || 'https://randomuser.me/api/portraits/men/44.jpg'}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
          <button 
            className="absolute bottom-0 right-0 bg-emerald-500 text-white p-1.5 rounded-full hover:bg-emerald-600 transition-colors"
            onClick={() => navigate('/profile')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
        </div>

        {/* User Info */}
        <h3 className="mt-4 text-lg font-semibold text-gray-900">
          {user.name || 'Abhisek Hiremath'}
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          {user.email || 'abhisek.h@example.com'}
        </p>
        {user.bio && (
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">
            {user.bio}
          </p>
        )}

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-2 gap-3 w-full">
          <Link to="/profile" className="col-span-2">
            <QuickActionButton
              label="Edit Profile"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              }
            />
          </Link>
          <Link to="/profile?tab=listings">
            <QuickActionButton
              label="My Listings"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                </svg>
              }
            />
          </Link>
          <Link to="/profile?tab=saved">
            <QuickActionButton
              label="Saved Items"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              }
            />
          </Link>
          <QuickActionButton
            onClick={handleLogout}
            label="Logout"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            }
            className="col-span-2 mt-2"
          />
        </div>

        {/* Stats Summary */}
        <div className="mt-6 w-full grid grid-cols-3 divide-x divide-gray-200">
          <div className="px-4 text-center">
            <div className="text-2xl font-semibold text-gray-900">12</div>
            <div className="text-xs text-gray-500">Listings</div>
          </div>
          <div className="px-4 text-center">
            <div className="text-2xl font-semibold text-gray-900">48</div>
            <div className="text-xs text-gray-500">Saved</div>
          </div>
          <div className="px-4 text-center">
            <div className="text-2xl font-semibold text-emerald-600">4.9</div>
            <div className="text-xs text-gray-500">Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
