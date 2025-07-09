import '@testing-library/jest-dom';

// Polyfill for TextEncoder and TextDecoder
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

// Mock fetch for tests
global.fetch = jest.fn();

// Mock data for testing
const mockRecipes = [
  {
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
      "Toast the bread",
      "Mash the avocado",
      "Spread avocado on toast",
      "Season with salt and pepper"
    ]
  },
  {
    id: 2,
    title: "Classic Spaghetti Carbonara",
    description: "Authentic Italian pasta dish with eggs and cheese",
    prepTime: 10,
    cookTime: 15,
    totalTime: 25,
    servings: 4,
    difficulty: "Medium",
    dietaryTags: ["vegetarian"],
    ingredients: [
      "400g spaghetti",
      "4 egg yolks",
      "100g Pecorino Romano",
      "200g guanciale"
    ],
    instructions: [
      "Cook pasta",
      "Prepare sauce",
      "Combine ingredients",
      "Serve immediately"
    ]
  }
];

// Mock API responses
export const mockFetch = (url, options = {}) => {
  return new Promise((resolve) => {
    let mockResponse;

    if (url.includes('/api/recipes')) {
      if (url.includes('/api/recipes/1')) {
        mockResponse = { ok: true, json: () => Promise.resolve(mockRecipes[0]) };
      } else if (url.includes('/api/recipes/random')) {
        // Return a recipes object for the random endpoint
        mockResponse = { ok: true, json: () => Promise.resolve({ recipes: mockRecipes }) };
      } else if (url.includes('/api/recipes/meta/tags')) {
        mockResponse = {
          ok: true,
          json: () => Promise.resolve({
            tags: ["vegetarian", "vegan", "quick", "healthy"]
          })
        };
      } else {
        // Return a recipes object for the regular recipes endpoint
        mockResponse = { ok: true, json: () => Promise.resolve({ recipes: mockRecipes }) };
      }
    } else if (url.includes('/api/health')) {
      mockResponse = {
        ok: true,
        json: () => Promise.resolve({
          message: 'QuickBite API is running!',
          timestamp: new Date().toISOString()
        })
      };
    } else {
      mockResponse = { ok: false, status: 404 };
    }

    resolve(mockResponse);
  });
};

// Set up fetch mock
beforeEach(() => {
  fetch.mockImplementation(mockFetch);
});

afterEach(() => {
  fetch.mockClear();
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor(cb) {
    this.cb = cb;
  }
  observe() { }
  unobserve() { }
  disconnect() { }
};

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  observe() { }
  unobserve() { }
  disconnect() { }
};

export { mockRecipes };
