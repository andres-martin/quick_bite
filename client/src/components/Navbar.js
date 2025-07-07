import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Search, Calendar, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <ChefHat className="h-8 w-8 text-primary-500" />
            <span className="text-xl font-bold text-gray-900">QuickBite</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary-500 transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              to="/recipes"
              className="flex items-center space-x-1 text-gray-700 hover:text-primary-500 transition-colors font-medium"
            >
              <Search className="h-4 w-4" />
              <span>Recipes</span>
            </Link>
            <Link
              to="/meal-planner"
              className="flex items-center space-x-1 text-gray-700 hover:text-primary-500 transition-colors font-medium"
            >
              <Calendar className="h-4 w-4" />
              <span>Meal Planner</span>
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-primary-500 transition-colors font-medium"
            >
              About
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary-500 transition-colors p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-primary-500 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/recipes"
                className="flex items-center space-x-1 text-gray-700 hover:text-primary-500 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <Search className="h-4 w-4" />
                <span>Recipes</span>
              </Link>
              <Link
                to="/meal-planner"
                className="flex items-center space-x-1 text-gray-700 hover:text-primary-500 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <Calendar className="h-4 w-4" />
                <span>Meal Planner</span>
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-primary-500 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
