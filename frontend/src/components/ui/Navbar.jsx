import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../AppIcon";
import Button from "./Button";
import { cn } from "../../utils/cn";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const isAuthPage =
    location.pathname.startsWith("/signin") ||
    location.pathname.startsWith("/signup");

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={cn("sticky top-0 z-50 w-full")}
      style={{
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        backgroundColor: "rgba(255, 255, 255, 0.6)",
      }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <Icon name="Leaf" size={22} color="white" />
          </div>
          <span className="text-lg font-bold text-foreground">EcoFinds</span>
        </Link>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <Button
            asChild
            variant="ghost"
            size="sm"
            iconName="Store"
            className={isActive("/sell") ? "bg-primary/10 text-primary" : ""}
          >
            <Link
              to="/sell"
              aria-current={isActive("/sell") ? "page" : undefined}
            >
              Sell
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="sm"
            iconName="Grid2X2"
            className={isActive("/explore") ? "bg-primary/10 text-primary" : ""}
          >
            <Link
              to="/explore"
              aria-current={isActive("/explore") ? "page" : undefined}
            >
              Explore
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="sm"
            iconName="Calculator"
            className={isActive("/impact") ? "bg-primary/10 text-primary" : ""}
          >
            <Link
              to="/impact"
              aria-current={isActive("/impact") ? "page" : undefined}
            >
              Impact
            </Link>
          </Button>
          {!isAuthPage && (
            <>
              {user ? (
                <>
                  <Button 
                    asChild 
                    variant="ghost" 
                    size="sm" 
                    iconName="LayoutDashboard"
                    className={isActive("/dashboard") ? "bg-primary/10 text-primary" : ""}
                  >
                    <Link 
                      to="/dashboard"
                      aria-current={isActive("/dashboard") ? "page" : undefined}
                    >
                      Dashboard
                    </Link>
                  </Button>
                  <Button 
                    asChild 
                    variant="ghost" 
                    size="sm" 
                    iconName="User"
                    className={isActive("/profile") ? "bg-primary/10 text-primary" : ""}
                  >
                    <Link 
                      to="/profile"
                      aria-current={isActive("/profile") ? "page" : undefined}
                    >
                      Profile
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild variant="outline" size="sm">
                    <Link to="/signin">Sign in</Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link to="/signup">Sign up</Link>
                  </Button>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* Bottom-only fade + extended blur: softly blur content below and fade out */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-2 h-3 z-0"
        style={{
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.85), rgba(0,0,0,0))",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.85), rgba(0,0,0,0))",
        }}
      />
    </header>
  );
};

export default Navbar;
