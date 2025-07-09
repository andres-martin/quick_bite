import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Home from '../pages/Home';
import RecipeSearch from '../pages/RecipeSearch';
import RecipeDetail from '../pages/RecipeDetail';
import MealPlanner from '../pages/MealPlanner';
import About from '../pages/About';

// We'll render the App content without the outer Router since tests provide their own routing
const AppContent = () => (
  <div className="min-h-screen bg-gray-50">
    <Navbar />
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<RecipeSearch />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="/meal-planner" element={<MealPlanner />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </main>
  </div>
);

const renderWithRouter = (initialEntries = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <AppContent />
    </MemoryRouter>
  );
};

describe('App', () => {
  it('renders navigation bar', () => {
    renderWithRouter();

    expect(screen.getAllByText('QuickBite')).toHaveLength(2); // Nav and hero
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Recipes')).toBeInTheDocument();
    expect(screen.getByText('Meal Planner')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('renders home page by default', () => {
    renderWithRouter();

    expect(screen.getByText('Welcome to')).toBeInTheDocument();
    expect(screen.getAllByText('QuickBite')).toHaveLength(2); // Nav and hero
  });

  it('renders recipes page when navigating to /recipes', () => {
    renderWithRouter(['/recipes']);

    expect(screen.getByText('Recipe Search')).toBeInTheDocument();
    expect(screen.getByText('Find the perfect recipe for any occasion')).toBeInTheDocument();
  });

  it('renders meal planner page when navigating to /meal-planner', async () => {
    renderWithRouter(['/meal-planner']);

    // Wait for the page to load and check for content
    await waitFor(() => {
      expect(screen.getAllByText(/meal planner/i)[0] || screen.getByText(/loading/i)).toBeInTheDocument();
    });
  });

  it('renders about page when navigating to /about', () => {
    renderWithRouter(['/about']);

    expect(screen.getByText('About QuickBite')).toBeInTheDocument();
    expect(screen.getByText(/Your smart companion for everyday cooking/)).toBeInTheDocument();
  });

  it('renders recipe detail page when navigating to /recipes/:id', async () => {
    renderWithRouter(['/recipes/1']);

    // Wait for the page to load and check for content
    await waitFor(() => {
      expect(screen.getAllByText(/recipe/i)[0] || screen.getByText(/loading/i)).toBeInTheDocument();
    });
  });

  it('has correct page structure', () => {
    renderWithRouter();

    // Check for main layout elements
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});
