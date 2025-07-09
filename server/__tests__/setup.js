// Test setup file for server-side tests
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// Create a test version of the app without starting the server
const createTestApp = () => {
  const app = express();

  // Middleware
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Import routes
  const recipeRoutes = require('../routes/recipes');
  const mealPlanRoutes = require('../routes/mealPlans');

  // Routes
  app.use('/api/recipes', recipeRoutes);
  app.use('/api/meal-plans', mealPlanRoutes);

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ message: 'QuickBite API is running!', timestamp: new Date().toISOString() });
  });

  return app;
};

module.exports = { createTestApp };
