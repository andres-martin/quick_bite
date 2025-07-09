import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';

const RecipeFilters = ({ filters, onFiltersChange, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters };

    if (filterType === 'maxTotalTime' || filterType === 'maxPrepTime') {
      newFilters[filterType] = value === '' ? '' : parseInt(value);
    } else {
      newFilters[filterType] = value;
    }

    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    onFiltersChange({
      maxTotalTime: '',
      maxPrepTime: '',
      diet: '',
      difficulty: '',
      tags: ''
    });
    setSearchTerm('');
    onSearch('');
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search recipes by name, description, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                onSearch('');
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </form>

      {/* Filter Toggle */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 text-gray-700 hover:text-primary-500 font-medium"
        >
          <Filter className="h-5 w-5" />
          <span>Filters</span>
          {hasActiveFilters && (
            <span className="bg-primary-500 text-white text-xs px-2 py-1 rounded-full">
              Active
            </span>
          )}
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
          {/* Max Total Time */}
          <div>
            <label htmlFor="maxTotalTime" className="block text-sm font-medium text-gray-700 mb-2">
              Max Total Time
            </label>
            <select
              id="maxTotalTime"
              value={filters.maxTotalTime}
              onChange={(e) => handleFilterChange('maxTotalTime', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Any time</option>
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="45">45 minutes</option>
              <option value="60">1 hour</option>
            </select>
          </div>

          {/* Max Prep Time */}
          <div>
            <label htmlFor="maxPrepTime" className="block text-sm font-medium text-gray-700 mb-2">
              Max Prep Time
            </label>
            <select
              id="maxPrepTime"
              value={filters.maxPrepTime}
              onChange={(e) => handleFilterChange('maxPrepTime', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Any prep time</option>
              <option value="5">5 minutes</option>
              <option value="10">10 minutes</option>
              <option value="15">15 minutes</option>
              <option value="20">20 minutes</option>
            </select>
          </div>

          {/* Diet */}
          <div>
            <label htmlFor="diet" className="block text-sm font-medium text-gray-700 mb-2">
              Diet
            </label>
            <select
              id="diet"
              value={filters.diet}
              onChange={(e) => handleFilterChange('diet', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Any diet</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="gluten-free">Gluten-free</option>
              <option value="high-protein">High Protein</option>
              <option value="healthy">Healthy</option>
            </select>
          </div>

          {/* Difficulty */}
          <div>
            <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-2">
              Difficulty
            </label>
            <select
              id="difficulty"
              value={filters.difficulty}
              onChange={(e) => handleFilterChange('difficulty', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Any difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="mealType" className="block text-sm font-medium text-gray-700 mb-2">
              Meal Type
            </label>
            <select
              id="mealType"
              value={filters.tags}
              onChange={(e) => handleFilterChange('tags', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Any meal type</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snack</option>
              <option value="dessert">Dessert</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeFilters;
