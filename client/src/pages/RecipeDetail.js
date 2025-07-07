import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Users, ChefHat, Share2, ArrowLeft, Calendar } from 'lucide-react';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddToMealPlan, setShowAddToMealPlan] = useState(false);

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const fetchRecipe = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/recipes/${id}`);

      if (!response.ok) {
        throw new Error('Recipe not found');
      }

      const data = await response.json();
      setRecipe(data);
    } catch (error) {
      console.error('Error fetching recipe:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: recipe.title,
          text: recipe.description,
          url: window.location.href
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Recipe link copied to clipboard!');
    }
  };

  const handleAddToMealPlan = () => {
    setShowAddToMealPlan(true);
    // This would typically open a modal or redirect to meal planner
    // For now, just redirect to meal planner
    navigate('/meal-planner');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading recipe...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Recipe Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/recipes')}
            className="bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors"
          >
            Browse Recipes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/recipes')}
              className="flex items-center space-x-2 text-gray-600 hover:text-primary-500 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Recipes</span>
            </button>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleAddToMealPlan}
                className="flex items-center space-x-2 bg-secondary-500 text-white px-4 py-2 rounded-lg hover:bg-secondary-600 transition-colors"
              >
                <Calendar className="h-4 w-4" />
                <span>Add to Meal Plan</span>
              </button>
              <button
                onClick={handleShare}
                className="flex items-center space-x-2 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
              >
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recipe Image and Basic Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-8">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-64 object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop';
                }}
              />
              <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{recipe.title}</h1>
                <p className="text-gray-600 mb-4">{recipe.description}</p>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Total Time</p>
                      <p className="font-semibold">{recipe.totalTime} min</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Servings</p>
                      <p className="font-semibold">{recipe.servings}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ChefHat className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Difficulty</p>
                      <p className="font-semibold capitalize">{recipe.difficulty}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Prep Time</p>
                      <p className="font-semibold">{recipe.prepTime} min</p>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {recipe.tags && recipe.tags.map((tag, index) => (
                      <span key={index} className="recipe-tag">
                        {tag}
                      </span>
                    ))}
                    {recipe.dietaryTags && recipe.dietaryTags.map((tag, index) => (
                      <span key={index} className="dietary-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Nutrition Info */}
                {recipe.nutrition && (
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="font-semibold mb-2">Nutrition per serving</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">Calories:</span>
                        <span className="font-medium ml-2">{recipe.nutrition.calories}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Protein:</span>
                        <span className="font-medium ml-2">{recipe.nutrition.protein}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Carbs:</span>
                        <span className="font-medium ml-2">{recipe.nutrition.carbs}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Fat:</span>
                        <span className="font-medium ml-2">{recipe.nutrition.fat}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Recipe Content */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {/* Ingredients */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Ingredients</h2>
                <ul className="space-y-3">
                  {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-1 rounded-full mt-1">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Instructions</h2>
                <ol className="space-y-4">
                  {recipe.instructions && recipe.instructions.map((instruction, index) => (
                    <li key={index} className="flex items-start space-x-4">
                      <span className="bg-primary-500 text-white text-sm font-bold px-3 py-2 rounded-full flex-shrink-0">
                        {index + 1}
                      </span>
                      <p className="text-gray-700 leading-relaxed pt-1">{instruction}</p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Tips Section (Future Enhancement) */}
              <div className="bg-primary-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-primary-900 mb-2">Pro Tips</h3>
                <ul className="text-primary-800 space-y-1">
                  <li>• Read through all instructions before starting</li>
                  <li>• Prep all ingredients before cooking</li>
                  <li>• Adjust seasoning to taste</li>
                  <li>• Don't be afraid to make substitutions based on your preferences</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
