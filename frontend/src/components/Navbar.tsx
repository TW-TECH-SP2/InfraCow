import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { isAuthenticated, } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) return null;

  return (
    <header className="bg-gray-900 py-4">
      <nav className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/home" className="flex items-center">
          <p className="text-white text-3xl font-bold">InfraCow</p>
        </Link>
        <div className="flex space-x-8">
          <Link
            to="/home"
            className={`text-xl font-medium ${
              location.pathname === '/home' ? 'text-white' : 'text-gray-300 hover:text-white'
            } transition-colors`}
          >
            Home
          </Link>
          <Link
            to="/casos"
            className={`text-xl font-medium ${
              location.pathname === '/casos' ? 'text-white' : 'text-gray-300 hover:text-white'
            } transition-colors`}
          >
            Casos
          </Link>
        </div>
      </nav>
      <div className="w-full h-0.5 bg-gradient-to-r from-red-500 via-green-500 to-yellow-500"></div>
    </header>
  );
};

export default Navbar;