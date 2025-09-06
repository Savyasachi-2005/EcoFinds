// User management functions
export const getCurrentUser = () => {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
};

export const updateUser = (userData) => {
  localStorage.setItem('currentUser', JSON.stringify(userData));
  return userData;
};

// Listing management functions
export const getListingsByUser = (userId) => {
  const listings = localStorage.getItem('listings');
  if (!listings) return [];
  const allListings = JSON.parse(listings);
  return allListings.filter(listing => listing.userId === userId);
};

export const getActiveListingsByUser = (userId) => {
  const listings = getListingsByUser(userId);
  return listings.filter(listing => listing.status === 'active');
};

// Purchase management functions
export const getPurchasesByUser = (userId) => {
  const purchases = localStorage.getItem('purchases');
  if (!purchases) return [];
  const allPurchases = JSON.parse(purchases);
  return allPurchases.filter(purchase => purchase.userId === userId);
};

// Cart management functions
export const getCartItems = (userId) => {
  const cart = localStorage.getItem(`cart_${userId}`);
  return cart ? JSON.parse(cart) : [];
};
