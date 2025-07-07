import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import RecipeFilters from '../components/RecipeFilters';

const RecipeSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [filters, setFilters] = useState({
    maxTotalTime: searchParams.get('maxTotalTime') || '',
    maxPrepTime: searchParams.get('maxPrepTime') || '',
    diet: searchParams.get('diet') || '',
    difficulty: searchParams.get('difficulty') || '',
    tags: searchParams.get('tags') || ''
  });
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

  useEffect(() => {
    fetchRecipes();
  }, [filters, searchTerm]);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();

      // Add filters to query params
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          queryParams.append(key, value);
        }
      });

      if (searchTerm) {
        queryParams.append('search', searchTerm);
      }

      const response = await fetch(`/api/recipes?${queryParams}`);
      const data = await response.json();

      setRecipes(data.recipes || []);
      setTotalResults(data.total || 0);

      // Update URL with current filters
      setSearchParams(queryParams);

    } catch (error) {
      console.error('Error fetching recipes:', error);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const clearAll = () => {
    setFilters({
      maxTotalTime: '',
      maxPrepTime: '',
      diet: '',
      difficulty: '',
      tags: ''
    });
    setSearchTerm('');
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Recipe Search
          </h1>
          <p className="text-xl text-gray-600">
            Find the perfect recipe for any occasion
          </p>
        </div>

        {/* Filters */}
        <RecipeFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onSearch={handleSearch}
        />

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              {loading ? 'Searching...' : `${totalResults} Recipe${totalResults !== 1 ? 's' : ''} Found`}
            </h2>
            {(searchTerm || Object.values(filters).some(v => v)) && (
              <button
                onClick={clearAll}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {/* Active Filters Display */}
        {(searchTerm || Object.values(filters).some(v => v)) && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {searchTerm && (
                <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                  Search: "{searchTerm}"
                </span>
              )}
              {filters.maxTotalTime && (
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                  Max time: {filters.maxTotalTime} min
                </span>
              )}
              {filters.maxPrepTime && (
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                  Max prep: {filters.maxPrepTime} min
                </span>
              )}
              {filters.diet && (
                <span className="bg-secondary-100 text-secondary-800 px-3 py-1 rounded-full text-sm font-medium">
                  Diet: {filters.diet}
                </span>
              )}
              {filters.difficulty && (
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                  Difficulty: {filters.difficulty}
                </span>
              )}
              {filters.tags && (
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                  Type: {filters.tags}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-300"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : recipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">
              {searchTerm || Object.values(filters).some(v => v)
                ? 'No recipes found matching your criteria.'
                : 'No recipes available.'}
            </div>
            <p className="text-gray-400 mb-6">
              Try adjusting your filters or search terms.
            </p>
            <button
              onClick={clearAll}
              className="bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Load More Button (Future Enhancement) */}
        {recipes.length > 0 && recipes.length < totalResults && (
          <div className="text-center mt-12">
            <button className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
              Load More Recipes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeSearch;
