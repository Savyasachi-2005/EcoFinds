import React from "react";
import { Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/landing-page/LandingPage";
import SignIn from "./pages/auth/Auth";
import SignUp from "./pages/auth/Auth";
import ImpactPage from "./pages/impact/ImpactPage";
import ExplorePage from "./pages/explore/ExplorePage";
import SellPage from "./pages/sell/SellPage";
import Dashboard from "./pages/dashboard/Dashboard";
import ListingsPage from "./pages/dashboard/ListingsPage";
import SavedPage from "./pages/dashboard/SavedPage";
import OrdersPage from "./pages/dashboard/OrdersPage";
import SettingsPage from "./pages/dashboard/SettingsPage";
import Profile from "./pages/profile/Profile";
import CartPage from "./pages/cart/CartPage";

const Routes = () => {
  return (
    <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/impact" element={<ImpactPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/sell" element={<SellPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/listings" element={<ListingsPage />} />
        <Route path="/dashboard/saved" element={<SavedPage />} />
        <Route path="/dashboard/orders" element={<OrdersPage />} />
        <Route path="/dashboard/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<CartPage/>} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
    </ErrorBoundary>
  );
};

export default Routes;
