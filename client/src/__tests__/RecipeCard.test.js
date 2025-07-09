import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';

// Mock recipe data
const mockRecipe = {
  id: 1,
  title: "5-Minute Avocado Toast",
  description: "Quick and healthy breakfast with just 3 ingredients",
  prepTime: 5,
  cookTime: 0,
  totalTime: 5,
  servings: 1,
  difficulty: "Easy",
  dietaryTags: ["vegetarian", "vegan", "quick"],
  ingredients: [
    "2 slices whole grain bread",
    "1 ripe avocado",
    "Salt and pepper to taste"
  ],
  instructions: [
    "Toast the bread slices until golden brown",
    "Mash the avocado with a fork",
    "Spread avocado on toast and season with salt and pepper"
  ],
  image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop",
  tags: ["breakfast", "quick", "healthy"],
  nutrition: {
    calories: 320,
    protein: "8g",
    carbs: "30g",
    fat: "20g"
  }
};

// Mock navigator.share
const mockShare = jest.fn();
Object.defineProperty(navigator, 'share', {
  value: mockShare,
  writable: true,
});

// Mock navigator.clipboard
const mockClipboard = {
  writeText: jest.fn(),
};
Object.defineProperty(navigator, 'clipboard', {
  value: mockClipboard,
  writable: true,
});

// Mock window.alert
window.alert = jest.fn();

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('RecipeCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders recipe information correctly', () => {
    renderWithRouter(<RecipeCard recipe={mockRecipe} />);

    expect(screen.getByText('5-Minute Avocado Toast')).toBeInTheDocument();
    expect(screen.getByText('Quick and healthy breakfast with just 3 ingredients')).toBeInTheDocument();
    expect(screen.getByText('5 min')).toBeInTheDocument();
    expect(screen.getByText('1 servings')).toBeInTheDocument();
    expect(screen.getByText('Easy')).toBeInTheDocument();
    expect(screen.getByText('320 cal')).toBeInTheDocument();
    expect(screen.getByText('8g protein')).toBeInTheDocument();
    expect(screen.getByText('30g carbs')).toBeInTheDocument();
    expect(screen.getByText('20g fat')).toBeInTheDocument();
  });

  it('renders recipe image with correct alt text', () => {
    renderWithRouter(<RecipeCard recipe={mockRecipe} />);

    const image = screen.getByAltText('5-Minute Avocado Toast');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockRecipe.image);
  });

  it('renders recipe tags', () => {
    renderWithRouter(<RecipeCard recipe={mockRecipe} />);

    expect(screen.getByText('breakfast')).toBeInTheDocument();
    expect(screen.getByText('quick')).toBeInTheDocument();
    expect(screen.getByText('healthy')).toBeInTheDocument();
    expect(screen.getByText('vegetarian')).toBeInTheDocument();
    expect(screen.getByText('vegan')).toBeInTheDocument();
  });

  it('links to recipe detail page', () => {
    renderWithRouter(<RecipeCard recipe={mockRecipe} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/recipes/1');
  });

  it('handles share functionality with navigator.share', () => {
    mockShare.mockResolvedValue(undefined);

    renderWithRouter(<RecipeCard recipe={mockRecipe} />);

    const shareButton = screen.getByTitle('Share recipe');
    fireEvent.click(shareButton);

    expect(mockShare).toHaveBeenCalledWith({
      title: '5-Minute Avocado Toast',
      text: 'Quick and healthy breakfast with just 3 ingredients',
      url: 'http://localhost/recipes/1'
    });
  });

  it('handles share functionality with clipboard fallback', () => {
    // Mock navigator.share as undefined
    Object.defineProperty(navigator, 'share', {
      value: undefined,
      writable: true,
    });

    renderWithRouter(<RecipeCard recipe={mockRecipe} />);

    const shareButton = screen.getByTitle('Share recipe');
    fireEvent.click(shareButton);

    expect(mockClipboard.writeText).toHaveBeenCalledWith('http://localhost/recipes/1');
    expect(window.alert).toHaveBeenCalledWith('Recipe link copied to clipboard!');
  });

  it('handles image loading error', () => {
    renderWithRouter(<RecipeCard recipe={mockRecipe} />);

    const image = screen.getByAltText('5-Minute Avocado Toast');
    fireEvent.error(image);

    expect(image).toHaveAttribute('src', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop');
  });

  it('displays limited number of tags', () => {
    const recipeWithManyTags = {
      ...mockRecipe,
      tags: ['breakfast', 'quick', 'healthy', 'extra1', 'extra2'],
      dietaryTags: ['vegetarian', 'vegan', 'gluten-free', 'extra3']
    };

    renderWithRouter(<RecipeCard recipe={recipeWithManyTags} />);

    // Should only show first 3 regular tags and first 2 dietary tags
    expect(screen.getByText('breakfast')).toBeInTheDocument();
    expect(screen.getByText('quick')).toBeInTheDocument();
    expect(screen.getByText('healthy')).toBeInTheDocument();
    expect(screen.queryByText('extra1')).not.toBeInTheDocument();

    expect(screen.getByText('vegetarian')).toBeInTheDocument();
    expect(screen.getByText('vegan')).toBeInTheDocument();
    expect(screen.queryByText('gluten-free')).not.toBeInTheDocument();
  });

  it('renders without nutrition information', () => {
    const recipeWithoutNutrition = {
      ...mockRecipe,
      nutrition: null
    };

    renderWithRouter(<RecipeCard recipe={recipeWithoutNutrition} />);

    expect(screen.queryByText('320 cal')).not.toBeInTheDocument();
    expect(screen.queryByText('8g protein')).not.toBeInTheDocument();
  });
});
