import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RecipeFilters from '../components/RecipeFilters';

const mockFilters = {
  maxTotalTime: '',
  maxPrepTime: '',
  diet: '',
  difficulty: '',
  tags: ''
};

const mockOnFiltersChange = jest.fn();
const mockOnSearch = jest.fn();

describe('RecipeFilters', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders search input', () => {
    render(
      <RecipeFilters
        filters={mockFilters}
        onFiltersChange={mockOnFiltersChange}
        onSearch={mockOnSearch}
      />
    );

    expect(screen.getByPlaceholderText('Search recipes by name, description, or tags...')).toBeInTheDocument();
  });

  it('handles search input changes', async () => {
    const user = userEvent.setup();

    render(
      <RecipeFilters
        filters={mockFilters}
        onFiltersChange={mockOnFiltersChange}
        onSearch={mockOnSearch}
      />
    );

    const searchInput = screen.getByPlaceholderText('Search recipes by name, description, or tags...');
    await user.type(searchInput, 'avocado');

    expect(searchInput).toHaveValue('avocado');
  });

  it('handles search form submission', async () => {
    const user = userEvent.setup();

    render(
      <RecipeFilters
        filters={mockFilters}
        onFiltersChange={mockOnFiltersChange}
        onSearch={mockOnSearch}
      />
    );

    const searchInput = screen.getByPlaceholderText('Search recipes by name, description, or tags...');
    await user.type(searchInput, 'avocado');

    fireEvent.submit(searchInput);

    expect(mockOnSearch).toHaveBeenCalledWith('avocado');
  });

  it('shows filters when toggle is clicked', async () => {
    const user = userEvent.setup();

    render(
      <RecipeFilters
        filters={mockFilters}
        onFiltersChange={mockOnFiltersChange}
        onSearch={mockOnSearch}
      />
    );

    const filterToggle = screen.getByText('Filters');
    await user.click(filterToggle);

    expect(screen.getByText('Max Total Time')).toBeInTheDocument();
    expect(screen.getByText('Max Prep Time')).toBeInTheDocument();
    expect(screen.getByText('Diet')).toBeInTheDocument();
    expect(screen.getByText('Difficulty')).toBeInTheDocument();
    expect(screen.getByText('Meal Type')).toBeInTheDocument();
  });

  it('handles filter changes', async () => {
    const user = userEvent.setup();

    render(
      <RecipeFilters
        filters={mockFilters}
        onFiltersChange={mockOnFiltersChange}
        onSearch={mockOnSearch}
      />
    );

    // Open filters
    const filterToggle = screen.getByText('Filters');
    await user.click(filterToggle);

    // Change max total time
    const maxTotalTimeSelect = screen.getByLabelText('Max Total Time');
    await user.selectOptions(maxTotalTimeSelect, '30');

    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      ...mockFilters,
      maxTotalTime: 30
    });
  });

  it('handles diet filter changes', async () => {
    const user = userEvent.setup();

    render(
      <RecipeFilters
        filters={mockFilters}
        onFiltersChange={mockOnFiltersChange}
        onSearch={mockOnSearch}
      />
    );

    // Open filters
    const filterToggle = screen.getByText('Filters');
    await user.click(filterToggle);

    // Change diet
    const dietSelect = screen.getByLabelText('Diet');
    await user.selectOptions(dietSelect, 'vegetarian');

    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      ...mockFilters,
      diet: 'vegetarian'
    });
  });

  it('handles difficulty filter changes', async () => {
    const user = userEvent.setup();

    render(
      <RecipeFilters
        filters={mockFilters}
        onFiltersChange={mockOnFiltersChange}
        onSearch={mockOnSearch}
      />
    );

    // Open filters
    const filterToggle = screen.getByText('Filters');
    await user.click(filterToggle);

    // Change difficulty
    const difficultySelect = screen.getByLabelText('Difficulty');
    await user.selectOptions(difficultySelect, 'easy');

    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      ...mockFilters,
      difficulty: 'easy'
    });
  });

  it('shows active filters indicator', () => {
    const activeFilters = {
      ...mockFilters,
      maxTotalTime: '30',
      diet: 'vegetarian'
    };

    render(
      <RecipeFilters
        filters={activeFilters}
        onFiltersChange={mockOnFiltersChange}
        onSearch={mockOnSearch}
      />
    );

    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('shows clear all button when filters are active', () => {
    const activeFilters = {
      ...mockFilters,
      maxTotalTime: '30',
      diet: 'vegetarian'
    };

    render(
      <RecipeFilters
        filters={activeFilters}
        onFiltersChange={mockOnFiltersChange}
        onSearch={mockOnSearch}
      />
    );

    expect(screen.getByText('Clear all')).toBeInTheDocument();
  });

  it('clears all filters when clear all is clicked', async () => {
    const user = userEvent.setup();
    const activeFilters = {
      ...mockFilters,
      maxTotalTime: '30',
      diet: 'vegetarian'
    };

    render(
      <RecipeFilters
        filters={activeFilters}
        onFiltersChange={mockOnFiltersChange}
        onSearch={mockOnSearch}
      />
    );

    const clearAllButton = screen.getByText('Clear all');
    await user.click(clearAllButton);

    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      maxTotalTime: '',
      maxPrepTime: '',
      diet: '',
      difficulty: '',
      tags: ''
    });
    expect(mockOnSearch).toHaveBeenCalledWith('');
  });

  it('clears search when X button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <RecipeFilters
        filters={mockFilters}
        onFiltersChange={mockOnFiltersChange}
        onSearch={mockOnSearch}
      />
    );

    const searchInput = screen.getByPlaceholderText('Search recipes by name, description, or tags...');
    await user.type(searchInput, 'avocado');

    const clearButton = screen.getByRole('button', { name: '' }); // X button
    await user.click(clearButton);

    expect(searchInput).toHaveValue('');
    expect(mockOnSearch).toHaveBeenCalledWith('');
  });

  it('handles empty filter values correctly', async () => {
    const user = userEvent.setup();

    render(
      <RecipeFilters
        filters={mockFilters}
        onFiltersChange={mockOnFiltersChange}
        onSearch={mockOnSearch}
      />
    );

    // Open filters
    const filterToggle = screen.getByText('Filters');
    await user.click(filterToggle);

    // Set and then clear max total time
    const maxTotalTimeSelect = screen.getByLabelText('Max Total Time');
    await user.selectOptions(maxTotalTimeSelect, '30');
    await user.selectOptions(maxTotalTimeSelect, '');

    expect(mockOnFiltersChange).toHaveBeenLastCalledWith({
      ...mockFilters,
      maxTotalTime: ''
    });
  });

  it('renders all filter options', async () => {
    const user = userEvent.setup();

    render(
      <RecipeFilters
        filters={mockFilters}
        onFiltersChange={mockOnFiltersChange}
        onSearch={mockOnSearch}
      />
    );

    // Open filters
    const filterToggle = screen.getByText('Filters');
    await user.click(filterToggle);

    // Check all filter options are present
    expect(screen.getAllByText('15 minutes')).toHaveLength(2); // One in maxTotalTime, one in maxPrepTime
    expect(screen.getByText('30 minutes')).toBeInTheDocument();
    expect(screen.getByText('Vegetarian')).toBeInTheDocument();
    expect(screen.getByText('Vegan')).toBeInTheDocument();
    expect(screen.getByText('Easy')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
    expect(screen.getByText('Breakfast')).toBeInTheDocument();
    expect(screen.getByText('Lunch')).toBeInTheDocument();
    expect(screen.getByText('Dinner')).toBeInTheDocument();
  });
});
