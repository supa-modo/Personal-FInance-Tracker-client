import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  TbHome, 
  TbWallet, 
  TbChartPie, 
  TbLogout, 
  TbMenu2, 
  TbX,
  TbChevronDown,
  TbUserCircle,
  TbSettings,
} from 'react-icons/tb';
import useAuth from '../../hooks/useAuth';
import { PiUserDuotone } from 'react-icons/pi';
import { MdSpaceDashboard } from "react-icons/md";
import { LuLogOut } from 'react-icons/lu';

const MainLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navigationItems = [
    { path: '/', label: 'Dashboard', icon: <MdSpaceDashboard size={20} /> },
    { path: '/financial-sources', label: 'Financial Sources', icon: <TbWallet size={20} /> },
  ];


  return (
    <div className="min-h-screen bg-slate-900 flex flex-col relative">
      {/* Premium background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 z-0"></div>
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 opacity-20 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/10 via-indigo-600/5 to-purple-800/10 animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-3/4 h-3/4 bg-gradient-to-tl from-primary-600/10 via-transparent to-transparent rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/4 right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-primary-400/5 via-transparent to-transparent rounded-full filter blur-3xl"></div>
      </div>
      
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-3 z-0"></div>

      {/* Header */}
      <header className="bg-slate-800/80 backdrop-blur-md border-b border-slate-700/50 fixed w-full z-30 shadow-lg">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and mobile menu button */}
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="flex items-center">
                  <div className="p-1.5 bg-gradient-to-br from-primary-500/30 to-primary-700/30 rounded-xl backdrop-blur-xl shadow-xl border border-primary-500/20">
                    <TbChartPie className="h-6 w-6 text-primary-300" />
                  </div>
                  <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-primary-200">FinanceFlow</span>
                </Link>
              </div>
            </div>

            {/* Desktop navigation */}
            <nav className="hidden md:flex space-x-8 items-center">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'text-primary-400 border-b-2 border-primary-500'
                      : 'text-slate-400 hover:text-slate-200 hover:border-b-2 hover:border-slate-500'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* User profile and mobile menu button */}
            <div className="flex items-center space-x-4">
              
              
              {/* Profile dropdown */}
              <div className="relative">
                <div>
                  <button
                    type="button"
                    className="flex items-center max-w-xs rounded-full text-sm focus:outline-none  p-1.5 hover:bg-slate-700/50 transition-colors"
                    id="user-menu"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={toggleProfileMenu}
                  >
                    <span className="sr-only">Open user menu</span>
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white shadow-lg shadow-primary-900/30">
                      <PiUserDuotone className="h-5 w-5" />
                    </div>
                    <span className="ml-2.5 text-gray-300 font-semibold hidden md:block">{user?.name}</span>
                    <TbChevronDown className="ml-2 h-4 w-4 text-slate-400 hidden md:block" />
                  </button>
                </div>

                {/* Profile dropdown menu */}
                {isProfileMenuOpen && (
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-slate-800 border border-slate-700/50 backdrop-blur-md focus:outline-none overflow-hidden"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <div className="" role="none">
                      <Link
                        to="/profile"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="w-full text-left block px-4 py-2 text-sm text-slate-300 hover:bg-primary-600/40 transition-colors"
                        role="menuitem"
                      >
                        <div className="flex items-center">
                          <TbUserCircle className="mr-2 h-4 w-4" />
                          Profile Settings
                        </div>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left block px-4 py-2 text-sm text-slate-300 hover:bg-red-600/20 transition-colors"
                        role="menuitem"
                      >
                        <div className="flex items-center">
                          <TbLogout className="mr-2 h-4 w-4" />
                          Sign out
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                  aria-expanded="false"
                  onClick={toggleMobileMenu}
                >
                  <span className="sr-only">Open main menu</span>
                  {isMobileMenuOpen ? (
                    <TbX className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <TbMenu2 className="block h-6 w-6" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-700/50 bg-slate-800/90 backdrop-blur-md">
            <div className="pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center pl-3 pr-4 py-2 text-base font-medium ${
                    location.pathname === item.path
                      ? 'bg-slate-700/50 text-primary-400 border-l-4 border-primary-500'
                      : 'text-slate-300 hover:bg-slate-700/30 hover:text-white border-l-4 border-transparent'
                  } transition-colors`}
                  onClick={closeMobileMenu}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
              <Link
                to="/profile"
                onClick={closeMobileMenu}
                className="flex w-full items-center pl-3 pr-4 py-2 text-base font-medium text-slate-300 hover:bg-slate-700/30 hover:text-white border-l-4 border-transparent transition-colors"
              >
                <TbUserCircle size={20} className="mr-3" />
                Profile Settings
              </Link>
              <button
                onClick={() => {
                  closeMobileMenu();
                  handleLogout();
                }}
                className="flex w-full items-center pl-3 pr-4 py-2 text-base font-medium text-slate-300 hover:bg-slate-700/30 hover:text-white border-l-4 border-transparent transition-colors"
              >
                <LuLogOut size={20} className="mr-3" />
                Sign out
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1 pt-16 relative z-10">
        <div className="max-w-screen-2xl mx-auto px-0 md:px-6 lg:px-8 py-6">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800/60 backdrop-blur-md border-t border-slate-700/50 py-4 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-slate-400">
            &copy; {new Date().getFullYear()} FinanceFlow. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
