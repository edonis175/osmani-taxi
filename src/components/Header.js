import React, { useState, useEffect } from "react";
import { Link, NavLink as RouterNavLink, useLocation } from "react-router-dom";

const Header = () => {
  // Initialize state based on actual scroll position to prevent flash
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    // Set initial state based on current scroll position
    // This prevents the flash of navbar on refresh
    const handleInitialScroll = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY;
        setIsVisible(currentScrollY <= 10);
        setLastScrollY(currentScrollY);
      }
    };

    // Check scroll position immediately
    handleInitialScroll();

    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 10) {
          // Scrolling down - hide navbar immediately and fast
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY && currentScrollY <= 100) {
          // Scrolling up AND near the top (banner area) - show navbar
          setIsVisible(true);
        } else if (currentScrollY < lastScrollY && currentScrollY > 100) {
          // Scrolling up but still in middle/bottom of page - keep hidden
          setIsVisible(false);
        } else if (currentScrollY <= 10) {
          // At the top of the page - always show navbar
          setIsVisible(true);
        }

        setLastScrollY(currentScrollY);
      }
    };

    if (typeof window !== "undefined") {
      // Use requestAnimationFrame to ensure DOM is ready
      const rafId = requestAnimationFrame(() => {
        handleInitialScroll();
        window.addEventListener("scroll", controlNavbar, { passive: true });
      });

      return () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <header
      className={`fixed w-full z-50 py-2 px-4 transition-transform duration-150 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto relative">
        <div
          className={`shadow-lg rounded-full px-4 py-3 mx-4 flex items-center transition-all duration-300 bg-white border border-gray-100`}
        >
          <div className="flex items-center">
            <img
              src={require("../assets/images/osmaniTlogo.png")}
              alt="OSMANI TAXI Logo"
              className="h-12 w-auto -mt-2 -mb-2"
            />
          </div>

          <div className="flex items-center ml-auto space-x-4">
            <div className="hidden md:flex space-x-2 items-center">
              <NavLink to="/" label="Home" />
              <NavLink to="/about" label="About" />
              <NavLink to="/services" label="Services" />
              <NavLink to="/popular-places" label="Popular Places" />
              <NavLink to="/fleet" label="Fleet" />
              <NavLink to="/contact" label="Contact" />
            </div>

            <button
              className="md:hidden text-gray-800 transition-all duration-300 transform hover:scale-110 hover:text-orange-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-white z-50 flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <img
                src={require("../assets/images/osmaniTlogo.png")}
                alt="OSMANI TAXI Logo"
                className="h-10 w-auto"
              />
              <button
                className="text-gray-500 hover:text-gray-700 p-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <nav className="w-full max-w-md px-4">
                <div className="space-y-3">
                  <div onClick={() => setIsMenuOpen(false)}>
                    <MobileNavLink to="/" label="Home" />
                  </div>
                  <div onClick={() => setIsMenuOpen(false)}>
                    <MobileNavLink to="/about" label="About" />
                  </div>
                  <div onClick={() => setIsMenuOpen(false)}>
                    <MobileNavLink to="/services" label="Services" />
                  </div>
                  <div onClick={() => setIsMenuOpen(false)}>
                    <MobileNavLink
                      to="/popular-places"
                      label="Popular Places"
                    />
                  </div>
                  <div onClick={() => setIsMenuOpen(false)}>
                    <MobileNavLink to="/fleet" label="Fleet" />
                  </div>
                  <div onClick={() => setIsMenuOpen(false)}>
                    <MobileNavLink to="/contact" label="Contact" />
                  </div>
                </div>
              </nav>
            </div>
            <div className="p-4 text-center text-gray-500 text-sm border-t border-gray-200">
              © {new Date().getFullYear()} OSMANI TAXI. All rights reserved.
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

const NavLink = ({ to, label }) => {
  const location = useLocation();

  // Enhanced active detection: explicitly check location for home route
  const isHomeRoute = to === "/";
  const pathname = location.pathname;

  // Check if this route is active
  const checkIsActive = (isActive) => {
    if (isHomeRoute) {
      // For home route, check if pathname is "/" or empty (handles various scenarios)
      return pathname === "/" || pathname === "" || isActive;
    }
    return isActive;
  };

  return (
    <RouterNavLink
      to={to}
      end={isHomeRoute}
      className={({ isActive }) => {
        const active = checkIsActive(isActive);
        return `text-lg px-4 py-2 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 font-medium ${
          active ? "!text-orange-500" : "text-gray-700 hover:text-orange-500"
        }`;
      }}
    >
      {label}
    </RouterNavLink>
  );
};

const MobileNavLink = ({ to, label }) => {
  const location = useLocation();

  // Enhanced active detection: explicitly check location for home route
  const isHomeRoute = to === "/";
  const pathname = location.pathname;

  // Check if this route is active
  const checkIsActive = (isActive) => {
    if (isHomeRoute) {
      // For home route, check if pathname is "/" or empty (handles various scenarios)
      return pathname === "/" || pathname === "" || isActive;
    }
    return isActive;
  };

  return (
    <RouterNavLink
      to={to}
      end={isHomeRoute}
      className={({ isActive }) => {
        const active = checkIsActive(isActive);
        return `block w-full text-center py-4 px-6 rounded-xl text-lg transition-all duration-300 font-medium ${
          active ? "!text-orange-500" : "text-gray-700 hover:text-orange-500"
        }`;
      }}
    >
      {label}
    </RouterNavLink>
  );
};

export default Header;
