import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Tag, Share2 } from 'lucide-react';

const RecipeCard = ({ recipe }) => {
  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (navigator.share) {
      navigator.share({
        title: recipe.title,
        text: recipe.description,
        url: window.location.origin + `/recipes/${recipe.id}`
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.origin + `/recipes/${recipe.id}`);
      alert('Recipe link copied to clipboard!');
    }
  };

  return (
    <div className="recipe-card animate-fade-in">
      <Link to={`/recipes/${recipe.id}`}>
        <img
          src={recipe.image}
          alt={recipe.title}
          className="recipe-card-image"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop';
          }}
        />
        <div className="recipe-card-content">
          <div className="flex justify-between items-start mb-2">
            <h3 className="recipe-card-title">{recipe.title}</h3>
            <button
              onClick={handleShare}
              className="text-gray-400 hover:text-primary-500 transition-colors p-1"
              title="Share recipe"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>

          <p className="recipe-card-description">{recipe.description}</p>

          <div className="recipe-card-meta">
            <Clock className="h-4 w-4 mr-1" />
            <span className="mr-4">{recipe.totalTime} min</span>
            <Users className="h-4 w-4 mr-1" />
            <span className="mr-4">{recipe.servings} servings</span>
            <Tag className="h-4 w-4 mr-1" />
            <span className="capitalize">{recipe.difficulty}</span>
          </div>

          <div className="recipe-card-tags">
            {recipe.tags && recipe.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="recipe-tag">
                {tag}
              </span>
            ))}
            {recipe.dietaryTags && recipe.dietaryTags.slice(0, 2).map((tag, index) => (
              <span key={index} className="dietary-tag">
                {tag}
              </span>
            ))}
          </div>

          {recipe.nutrition && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="flex justify-between text-xs text-gray-600">
                <span>{recipe.nutrition.calories} cal</span>
                <span>{recipe.nutrition.protein} protein</span>
                <span>{recipe.nutrition.carbs} carbs</span>
                <span>{recipe.nutrition.fat} fat</span>
              </div>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;
