import React, { createContext, useState, useEffect } from "react";

// Create the context
export const AuthContext = createContext();

// Mock user for development
const MOCK_USER = {
  id: "user1",
  name: "Abhishek Hiremath",
  email: "user@ecofinds.com",
  role: "user",
  avatar:
    "C:\\Users\\prave\\OneDrive\\Desktop\\EcoFindsFinal\\EcoFinds\\frontend\\src\\images\\1757051386187.png",
  createdAt: "2023-01-15T09:24:00Z",
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
      const savedToken = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");

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

      // Mock successful login
      const mockResponse = {
        token: "mock_jwt_token",
        user: MOCK_USER,
      };

      // Save to localStorage
      localStorage.setItem("token", JSON.stringify(mockResponse.token));
      localStorage.setItem("user", JSON.stringify(mockResponse.user));

      // Update state
      setToken(mockResponse.token);
      setUser(mockResponse.user);

      return mockResponse;
    } catch (err) {
      setError(err.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Reset state
    setToken(null);
    setUser(null);
    setError(null);
  };

  // Update user function
  const updateUserProfile = (updatedData) => {
    try {
      const updatedUser = { ...user, ...updatedData };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      return updatedUser;
    } catch (err) {
      setError(err.message || "Failed to update profile");
      throw err;
    }
  };

  const value = {
    user,
    token,
    loading,
    error,
    login,
    logout,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
