import React, { useState } from 'react';
import { Shield, Menu, LogOut, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LanguageSelector from './LanguageSelector';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().substring(0, 2);
  };

  const isVictim = (user?.role || '').toLowerCase().includes('victim');

  const authorityLinks = [
    { name: 'Dashboard', path: '/authority/dashboard' },
    { name: 'Cases', path: '/authority/dashboard' },
    { name: 'Reports', path: '/authority/dashboard' },
    { name: 'Settings', path: '/authority/dashboard' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              <Shield className="h-8 w-8 text-[#1C4E3D]" />
              <span className="font-bold text-xl text-[#1C4E3D]">Sahayak Kavach</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden sm:flex sm:items-center sm:gap-6">
            {isAuthenticated && !isVictim && (
              <div className="flex space-x-4">
                {authorityLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="text-gray-600 hover:text-[#1C4E3D] hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
            
            <div className="flex items-center gap-4 border-l border-gray-200 pl-4 ml-2">
              <LanguageSelector />
              
              {isAuthenticated && (
                <div className="flex items-center gap-4">
                  {!isVictim && (
                    <div className="h-8 w-8 rounded-full bg-[#E0A96D] text-white flex items-center justify-center font-semibold text-sm">
                      {getInitials(user?.name)}
                    </div>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex items-center text-gray-500 hover:text-red-600 transition-colors focus:outline-none"
                    aria-label="Logout"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden gap-3">
            <LanguageSelector />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-gray-200 bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {isAuthenticated && !isVictim && authorityLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#1C4E3D] hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            {isAuthenticated && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full text-left flex items-center px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-5 w-5 mr-2" /> Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
