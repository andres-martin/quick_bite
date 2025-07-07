import React, { useState, useEffect } from 'react';
import { Plus, Calendar, Trash2, Edit } from 'lucide-react';

const MealPlanner = () => {
  const [mealPlans, setMealPlans] = useState([]);
  const [currentMealPlan, setCurrentMealPlan] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(true);

  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const mealTypes = ['breakfast', 'lunch', 'dinner'];

  useEffect(() => {
    fetchMealPlans();
    fetchRecipes();
  }, []);

  const fetchMealPlans = async () => {
    try {
      const response = await fetch('/api/meal-plans');
      const data = await response.json();
      setMealPlans(data.mealPlans || []);

      // Set current meal plan to the first one, or create a default one
      if (data.mealPlans && data.mealPlans.length > 0) {
        setCurrentMealPlan(data.mealPlans[0]);
      } else {
        // Create a default meal plan
        createDefaultMealPlan();
      }
    } catch (error) {
      console.error('Error fetching meal plans:', error);
      createDefaultMealPlan();
    } finally {
      setLoading(false);
    }
  };

  const fetchRecipes = async () => {
    try {
      const response = await fetch('/api/recipes');
      const data = await response.json();
      setRecipes(data.recipes || []);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const createDefaultMealPlan = async () => {
    try {
      const today = new Date();
      const monday = new Date(today);
      monday.setDate(today.getDate() - today.getDay() + 1);

      const defaultMealPlan = {
        name: 'My Meal Plan',
        week: monday.toISOString().split('T')[0],
        meals: {
          monday: { breakfast: null, lunch: null, dinner: null },
          tuesday: { breakfast: null, lunch: null, dinner: null },
          wednesday: { breakfast: null, lunch: null, dinner: null },
          thursday: { breakfast: null, lunch: null, dinner: null },
          friday: { breakfast: null, lunch: null, dinner: null },
          saturday: { breakfast: null, lunch: null, dinner: null },
          sunday: { breakfast: null, lunch: null, dinner: null }
        }
      };

      const response = await fetch('/api/meal-plans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(defaultMealPlan),
      });

      if (response.ok) {
        const newMealPlan = await response.json();
        setMealPlans([newMealPlan]);
        setCurrentMealPlan(newMealPlan);
      }
    } catch (error) {
      console.error('Error creating default meal plan:', error);
    }
  };

  const handleSlotClick = (day, mealType) => {
    setSelectedSlot({ day, mealType });
    setShowRecipeModal(true);
  };

  const handleRecipeSelect = async (recipeId) => {
    if (!selectedSlot || !currentMealPlan) return;

    try {
      const response = await fetch(`/api/meal-plans/${currentMealPlan.id}/meals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          day: selectedSlot.day,
          mealType: selectedSlot.mealType,
          recipeId: recipeId
        }),
      });

      if (response.ok) {
        const updatedMealPlan = await response.json();
        setCurrentMealPlan(updatedMealPlan);
        setMealPlans(mealPlans.map(mp => mp.id === updatedMealPlan.id ? updatedMealPlan : mp));
        setShowRecipeModal(false);
        setSelectedSlot(null);
      }
    } catch (error) {
      console.error('Error adding recipe to meal plan:', error);
    }
  };

  const handleRemoveRecipe = async (day, mealType) => {
    if (!currentMealPlan) return;

    try {
      const response = await fetch(`/api/meal-plans/${currentMealPlan.id}/meals`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          day: day,
          mealType: mealType
        }),
      });

      if (response.ok) {
        const updatedMealPlan = await response.json();
        setCurrentMealPlan(updatedMealPlan);
        setMealPlans(mealPlans.map(mp => mp.id === updatedMealPlan.id ? updatedMealPlan : mp));
      }
    } catch (error) {
      console.error('Error removing recipe from meal plan:', error);
    }
  };

  const getRecipeById = (recipeId) => {
    return recipes.find(r => r.id === recipeId);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getWeekDates = (startDate) => {
    const dates = {};
    const start = new Date(startDate);

    daysOfWeek.forEach((day, index) => {
      const date = new Date(start);
      date.setDate(start.getDate() + index);
      dates[day] = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    });

    return dates;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading meal planner...</p>
        </div>
      </div>
    );
  }

  const weekDates = currentMealPlan ? getWeekDates(currentMealPlan.week) : {};

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Weekly Meal Planner
          </h1>
          <p className="text-xl text-gray-600">
            Plan your meals for the week ahead
          </p>
        </div>

        {/* Meal Plan Info */}
        {currentMealPlan && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">{currentMealPlan.name}</h2>
                <p className="text-gray-600">
                  Week of {formatDate(currentMealPlan.week)}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="flex items-center space-x-2 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>New Plan</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Meal Grid */}
        {currentMealPlan && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7 gap-6">
            {daysOfWeek.map((day) => (
              <div key={day} className="meal-plan-day">
                <div className="meal-plan-day-header">
                  <div className="capitalize font-bold">{day}</div>
                  <div className="text-sm text-gray-500">{weekDates[day]}</div>
                </div>

                {mealTypes.map((mealType) => {
                  const recipeId = currentMealPlan.meals[day][mealType];
                  const recipe = recipeId ? getRecipeById(recipeId) : null;

                  return (
                    <div key={mealType} className="meal-slot">
                      <div className="meal-slot-header capitalize">
                        {mealType}
                      </div>

                      {recipe ? (
                        <div className="meal-slot-content meal-slot-filled group">
                          <div className="flex-1">
                            <div className="font-medium text-sm mb-1">{recipe.title}</div>
                            <div className="text-xs text-primary-600">
                              {recipe.totalTime} min • {recipe.servings} servings
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemoveRecipe(day, mealType)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700 ml-2"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <div
                          className="meal-slot-content"
                          onClick={() => handleSlotClick(day, mealType)}
                        >
                          <div className="text-center">
                            <Plus className="h-6 w-6 mx-auto mb-1" />
                            <div className="text-xs">Add Recipe</div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}

        {!currentMealPlan && (
          <div className="text-center py-12">
            <Calendar className="h-24 w-24 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No meal plan found</h3>
            <p className="text-gray-600 mb-6">Create your first meal plan to get started.</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors"
            >
              Create Meal Plan
            </button>
          </div>
        )}
      </div>

      {/* Recipe Selection Modal */}
      {showRecipeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  Select Recipe for {selectedSlot?.day} {selectedSlot?.mealType}
                </h3>
                <button
                  onClick={() => setShowRecipeModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Plus className="h-6 w-6 rotate-45" />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    onClick={() => handleRecipeSelect(recipe.id)}
                    className="bg-gray-50 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-32 object-cover rounded-md mb-3"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop';
                      }}
                    />
                    <h4 className="font-medium text-sm mb-1">{recipe.title}</h4>
                    <p className="text-xs text-gray-600 mb-2">{recipe.description}</p>
                    <div className="text-xs text-gray-500">
                      {recipe.totalTime} min • {recipe.servings} servings
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlanner;
