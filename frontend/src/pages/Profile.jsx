import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from '../components/DashboardLayout';
import { AuthContext } from "../context/AuthContext";
import ListingCard from "../components/ListingCard";
import PurchaseCard from "../components/PurchaseCard";
import { EmptyState, ErrorState, LoadingSkeleton } from "../components/UIStates";
import { getUser, getUserListings, getUserPurchases, updateUserProfile } from "../data/store";

export default function Profile() {
  const { user: authUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [userListings, setUserListings] = useState([]);
  const [userPurchases, setUserPurchases] = useState([]);
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  // Load user data
  useEffect(() => {
    const fetchData = async () => {
      if (!authUser?.id) return;

      try {
        setLoading(true);
        
        // Get user profile data
        const userData = await getUser(authUser.id);
        setUser(userData);
        setFormData({
          name: userData.name,
          bio: userData.bio || "",
          email: userData.email,
          phone: userData.phone || "",
          address: userData.address || ""
        });

        // Get user listings
        const listings = await getUserListings(authUser.id);
        setUserListings(listings);

        // Get user purchases
        const purchases = await getUserPurchases(authUser.id);
        setUserPurchases(purchases);
      } catch (err) {
        setError(err.message || "Failed to load profile data");
        console.error("Error fetching profile data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [authUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const updatedUser = await updateUserProfile(authUser.id, formData);
      setUser(updatedUser);
      setEditMode(false);
    } catch (err) {
      setError(err.message || "Failed to update profile");
      console.error("Error updating profile:", err);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-6">My Profile</h1>
        <ErrorState 
          error={error}
          action={
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg"
            >
              Try Again
            </button>
          }
        />
      </div>
    );
  }

  if (loading || !user) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-6">My Profile</h1>
        <div className="bg-white rounded-xl shadow p-6">
          <LoadingSkeleton count={1} type="card" />
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold mb-6">My Profile</h1>
      
      {/* Tab navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-3 px-6 text-sm font-medium mr-4 border-b-2 ${
            activeTab === "profile"
              ? "border-emerald-500 text-emerald-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </button>
        <button
          className={`py-3 px-6 text-sm font-medium mr-4 border-b-2 ${
            activeTab === "listings"
              ? "border-emerald-500 text-emerald-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("listings")}
        >
          My Listings <span className="ml-1 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">{userListings.length}</span>
        </button>
        <button
          className={`py-3 px-6 text-sm font-medium mr-4 border-b-2 ${
            activeTab === "purchases"
              ? "border-emerald-500 text-emerald-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("purchases")}
        >
          Purchase History <span className="ml-1 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">{userPurchases.length}</span>
        </button>
      </div>
      
      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium">Account Information</h2>
            <button
              className="text-sm bg-emerald-50 text-emerald-600 px-4 py-2 rounded-lg hover:bg-emerald-100"
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          {editMode ? (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  ></textarea>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-2 rounded-lg"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Name</p>
                <p className="font-medium">{user.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
              {user.phone && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Phone</p>
                  <p className="font-medium">{user.phone}</p>
                </div>
              )}
              {user.address && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Address</p>
                  <p className="font-medium">{user.address}</p>
                </div>
              )}
              {user.bio && (
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500 mb-1">Bio</p>
                  <p className="font-medium">{user.bio}</p>
                </div>
              )}
              <div className="md:col-span-2 mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500 mb-1">Member Since</p>
                <p className="font-medium">
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Listings Tab */}
      {activeTab === "listings" && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium">My Listings</h2>
            <button
              className="text-sm bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg"
              onClick={() => navigate("/listings/new")}
            >
              Create New Listing
            </button>
          </div>
          
          {userListings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userListings.map(listing => (
                <ListingCard
                  key={listing.id}
                  {...listing}
                  onClick={(id) => navigate(`/listings/${id}`)}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No listings yet"
              message="You haven't created any listings. Create your first listing to start selling."
              icon="📦"
              action={
                <button
                  onClick={() => navigate("/listings/new")}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2 rounded-lg"
                >
                  Create Listing
                </button>
              }
            />
          )}
        </div>
      )}
      
      {/* Purchases Tab */}
      {activeTab === "purchases" && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium">Purchase History</h2>
            <button
              className="text-sm bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg"
              onClick={() => navigate("/listings")}
            >
              Browse Marketplace
            </button>
          </div>
          
          {userPurchases.length > 0 ? (
            <div className="space-y-4">
              {userPurchases.map(purchase => (
                <PurchaseCard
                  key={purchase.id}
                  {...purchase}
                  onClick={(id) => navigate(`/purchases/${id}`)}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No purchases yet"
              message="You haven't made any purchases. Browse the marketplace to find eco-friendly items."
              icon="🛍️"
              action={
                <button
                  onClick={() => navigate("/listings")}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2 rounded-lg"
                >
                  Browse Marketplace
                </button>
              }
            />
          )}
        </div>
      )}
    </DashboardLayout>
  );
}
