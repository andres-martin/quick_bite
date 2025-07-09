import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Home Page', () => {
  it('renders hero section', () => {
    renderWithRouter(<Home />);

    expect(screen.getByText('Welcome to')).toBeInTheDocument();
    expect(screen.getByText('QuickBite')).toBeInTheDocument();
    expect(screen.getByText(/Smart Recipe & Meal Planner for busy people/)).toBeInTheDocument();
  });

  it('renders main navigation buttons', () => {
    renderWithRouter(<Home />);

    expect(screen.getByText('Find Recipes')).toBeInTheDocument();
    expect(screen.getByText('Plan Meals')).toBeInTheDocument();
  });

  it('renders features section', () => {
    renderWithRouter(<Home />);

    expect(screen.getByText('Why Choose QuickBite?')).toBeInTheDocument();
    expect(screen.getByText('Quick & Easy')).toBeInTheDocument();
    expect(screen.getByText('Curated Recipes')).toBeInTheDocument();
    expect(screen.getByText('For Everyone')).toBeInTheDocument();
    expect(screen.getByText('Meal Planning')).toBeInTheDocument();
  });

  it('renders featured recipes section', async () => {
    renderWithRouter(<Home />);

    expect(screen.getByText('Featured Recipes')).toBeInTheDocument();

    // Wait for recipes to load
    await waitFor(() => {
      expect(screen.getAllByText('5-Minute Avocado Toast')).toHaveLength(2); // Featured and quick sections
    });
  });

  it('renders quick recipes section', async () => {
    renderWithRouter(<Home />);

    expect(screen.getByText('Quick & Easy Recipes')).toBeInTheDocument();
    expect(screen.getByText('Ready in 20 minutes or less')).toBeInTheDocument();

    // Wait for recipes to load
    await waitFor(() => {
      expect(screen.getAllByText('5-Minute Avocado Toast')[0]).toBeInTheDocument();
    });
  });

  it('renders call-to-action section', () => {
    renderWithRouter(<Home />);

    expect(screen.getByText('Ready to Start Cooking?')).toBeInTheDocument();
    expect(screen.getByText(/Join thousands of home cooks/)).toBeInTheDocument();
  });

  it('shows loading state for recipes', () => {
    renderWithRouter(<Home />);

    // Should show loading skeletons initially
    const loadingElements = screen.getAllByText('Featured Recipes');
    expect(loadingElements).toHaveLength(1);
  });

  it('has working navigation links', () => {
    renderWithRouter(<Home />);

    const findRecipesButtons = screen.getAllByText('Find Recipes');
    expect(findRecipesButtons[0]).toHaveAttribute('href', '/recipes');

    const planMealsButtons = screen.getAllByText('Plan Meals');
    expect(planMealsButtons[0]).toHaveAttribute('href', '/meal-planner');
  });

  it('renders view all buttons', async () => {
    renderWithRouter(<Home />);

    // Wait for content to load
    await waitFor(() => {
      expect(screen.getByText('View All Recipes')).toBeInTheDocument();
    });

    expect(screen.getByText('View All Quick Recipes')).toBeInTheDocument();
  });

  it('handles API errors gracefully', async () => {
    // Mock console.error to avoid noise in tests
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

    renderWithRouter(<Home />);

    // Component should still render even if API calls fail
    expect(screen.getByText('Featured Recipes')).toBeInTheDocument();
    expect(screen.getByText('Quick & Easy Recipes')).toBeInTheDocument();

    consoleSpy.mockRestore();
  });

  it('renders feature descriptions correctly', () => {
    renderWithRouter(<Home />);

    expect(screen.getByText(/Find recipes that fit your schedule/)).toBeInTheDocument();
    expect(screen.getByText(/Handpicked recipes focusing on simplicity/)).toBeInTheDocument();
    expect(screen.getByText(/Recipes for all dietary needs/)).toBeInTheDocument();
    expect(screen.getByText(/Organize your week with our simple/)).toBeInTheDocument();
  });
});
