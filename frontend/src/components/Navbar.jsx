import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');
  const userName = localStorage.getItem('userName');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-700">
              {token ? (
                userRole === 'student' ? 'Student Dashboard' : 'Admin Dashboard'
              ) : (
                <Link to="/" className="hover:text-blue-800 transition-colors">
                  Campus Issue Tracker
                </Link>
              )}
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 lg:gap-8 items-center">
            {token ? (
              <>
                <span className="text-gray-700 text-base lg:text-lg">
                  Welcome, <span className="font-semibold text-blue-700">{userName || userRole}</span>
                </span>
                {userRole === 'student' && (
                  <Link to="/report-problem" className="text-blue-700 font-medium hover:underline text-base lg:text-lg">
                    Report New Problem
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="text-red-600 font-medium hover:underline text-base lg:text-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-blue-700 font-medium hover:underline text-base lg:text-lg">
                  Login
                </Link>
                <Link to="/register" className="text-blue-700 font-medium hover:underline text-base lg:text-lg">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-3 rounded-md text-gray-700 hover:text-blue-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-7 w-7`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-7 w-7`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
          {token ? (
            <>
              <div className="px-3 py-2 text-sm text-gray-700">
                Welcome, <span className="font-semibold text-blue-700">{userName || userRole}</span>
              </div>
              {userRole === 'student' && (
                <Link
                  to="/report-problem"
                  className="block px-3 py-2 text-base font-medium text-blue-700 hover:text-blue-800 hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Report New Problem
                </Link>
              )}
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:text-red-800 hover:bg-gray-50 rounded-md"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-3 py-2 text-base font-medium text-blue-700 hover:text-blue-800 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block px-3 py-2 text-base font-medium text-blue-700 hover:text-blue-800 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 