import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, ChefHat, Users, Calendar } from 'lucide-react';
import RecipeCard from '../components/RecipeCard';

const Home = () => {
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [quickRecipes, setQuickRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedRecipes();
  }, []);

  const fetchFeaturedRecipes = async () => {
    try {
      setLoading(true);

      // Fetch random featured recipes
      const featuredResponse = await fetch('/api/recipes/random/3');
      const featuredData = await featuredResponse.json();
      setFeaturedRecipes(featuredData.recipes || []);

      // Fetch quick recipes (under 20 minutes)
      const quickResponse = await fetch('/api/recipes?maxTotalTime=20&limit=3');
      const quickData = await quickResponse.json();
      setQuickRecipes(quickData.recipes || []);

    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: Clock,
      title: "Quick & Easy",
      description: "Find recipes that fit your schedule, from 5-minute breakfasts to 30-minute dinners."
    },
    {
      icon: ChefHat,
      title: "Curated Recipes",
      description: "Handpicked recipes focusing on simplicity and everyday ingredients."
    },
    {
      icon: Users,
      title: "For Everyone",
      description: "Recipes for all dietary needs and skill levels, no account required."
    },
    {
      icon: Calendar,
      title: "Meal Planning",
      description: "Organize your week with our simple meal planning tool."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-500 to-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to <span className="text-primary-100">QuickBite</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
              Smart Recipe & Meal Planner for busy people. Discover quick, delicious recipes
              and plan your meals with ease. No signup required!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/recipes"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors inline-flex items-center justify-center"
              >
                <Search className="h-5 w-5 mr-2" />
                Find Recipes
              </Link>
              <Link
                to="/meal-planner"
                className="bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-800 transition-colors inline-flex items-center justify-center"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Plan Meals
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose QuickBite?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make cooking simple and meal planning effortless for your busy lifestyle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Recipes
            </h2>
            <p className="text-xl text-gray-600">
              Discover today's handpicked recipes
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-300"></div>
                  <div className="p-4">
                    <div className="h-6 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/recipes"
              className="bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors"
            >
              View All Recipes
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Recipes */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Quick & Easy Recipes
            </h2>
            <p className="text-xl text-gray-600">
              Ready in 20 minutes or less
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-300"></div>
                  <div className="p-4">
                    <div className="h-6 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {quickRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/recipes?maxTotalTime=20"
              className="bg-secondary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary-600 transition-colors"
            >
              View All Quick Recipes
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Cooking?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Join thousands of home cooks who've simplified their meal planning with QuickBite.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/recipes"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              Browse Recipes
            </Link>
            <Link
              to="/meal-planner"
              className="bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-800 transition-colors border border-primary-500"
            >
              Start Planning
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
