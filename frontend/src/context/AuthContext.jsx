import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const AuthContext = createContext();

// Mock user for development
const MOCK_USER = {
  id: "user1",
  name: "Demo User",
  email: "user@ecofinds.com",
  role: "user",
  avatar: "https://randomuser.me/api/portraits/women/48.jpg",
  createdAt: "2023-01-15T09:24:00Z"
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load auth state from localStorage on initial render
  useEffect(() => {
    try {
      const savedToken = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');
      
      if (savedToken) {
        setToken(JSON.parse(savedToken));
      }
      
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        // For development purposes, auto-login with mock user
        setUser(MOCK_USER);
      }
    } catch (err) {
      console.error("Error loading auth state:", err);
      setError("Failed to restore login session");
    } finally {
      setLoading(false);
    }
  }, []);

  // Login function
  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, you would call an API here
      // const response = await api.login(credentials);
      // const { token, user } = response.data;
      
      // For development, simulate successful login with mock user
      const mockToken = "mock-jwt-token-" + Math.random().toString(36).substring(2);
      
      // Save to state and localStorage
      setToken(mockToken);
      setUser(MOCK_USER);
      
      localStorage.setItem('token', JSON.stringify(mockToken));
      localStorage.setItem('user', JSON.stringify(MOCK_USER));
      
      return { success: true };
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Login failed");
      return { success: false, error: err.message || "Login failed" };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  // Register function
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, you would call an API here
      // const response = await api.register(userData);
      
      // For development, simulate successful registration
      // After registration, we can auto-login the user
      return await login({
        email: userData.email,
        password: userData.password
      });
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message || "Registration failed");
      return { success: false, error: err.message || "Registration failed" };
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, you would call an API here
      // const response = await api.updateProfile(userData);
      
      // For development, simulate successful update
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return { success: true, user: updatedUser };
    } catch (err) {
      console.error("Profile update error:", err);
      setError(err.message || "Profile update failed");
      return { success: false, error: err.message || "Profile update failed" };
    } finally {
      setLoading(false);
    }
  };

  // Context value
  const value = {
    user,
    token,
    loading,
    error,
    login,
    logout,
    register,
    updateProfile,
    isAuthenticated: !!token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
