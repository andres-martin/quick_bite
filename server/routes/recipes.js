const express = require('express');
const router = express.Router();
const recipes = require('../data/recipes.json');

// Get all recipes with optional filtering
router.get('/', (req, res) => {
  try {
    let filteredRecipes = [...recipes];

    // Filter by max prep time
    if (req.query.maxPrepTime) {
      const maxPrepTime = parseInt(req.query.maxPrepTime);
      filteredRecipes = filteredRecipes.filter(recipe => recipe.prepTime <= maxPrepTime);
    }

    // Filter by max total time
    if (req.query.maxTotalTime) {
      const maxTotalTime = parseInt(req.query.maxTotalTime);
      filteredRecipes = filteredRecipes.filter(recipe => recipe.totalTime <= maxTotalTime);
    }

    // Filter by dietary tags
    if (req.query.diet) {
      const dietaryReq = req.query.diet.toLowerCase();
      filteredRecipes = filteredRecipes.filter(recipe =>
        recipe.dietaryTags.some(tag => tag.toLowerCase().includes(dietaryReq))
      );
    }

    // Filter by difficulty
    if (req.query.difficulty) {
      const difficulty = req.query.difficulty.toLowerCase();
      filteredRecipes = filteredRecipes.filter(recipe =>
        recipe.difficulty.toLowerCase() === difficulty
      );
    }

    // Filter by tags
    if (req.query.tags) {
      const requestedTags = req.query.tags.toLowerCase().split(',');
      filteredRecipes = filteredRecipes.filter(recipe =>
        requestedTags.some(tag =>
          recipe.tags.some(recipeTag => recipeTag.toLowerCase().includes(tag.trim()))
        )
      );
    }

    // Search by title or description
    if (req.query.search) {
      const searchTerm = req.query.search.toLowerCase();
      filteredRecipes = filteredRecipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm) ||
        recipe.description.toLowerCase().includes(searchTerm) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    // Limit results
    if (req.query.limit) {
      const limit = parseInt(req.query.limit);
      filteredRecipes = filteredRecipes.slice(0, limit);
    }

    res.json({
      recipes: filteredRecipes,
      total: filteredRecipes.length,
      filters: req.query
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

// Get recipe by ID
router.get('/:id', (req, res) => {
  try {
    const recipeId = parseInt(req.params.id);
    const recipe = recipes.find(r => r.id === recipeId);

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    res.json(recipe);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recipe' });
  }
});

// Get random recipes
router.get('/random/:count', (req, res) => {
  try {
    const count = parseInt(req.params.count) || 3;
    const shuffled = [...recipes].sort(() => 0.5 - Math.random());
    const randomRecipes = shuffled.slice(0, Math.min(count, recipes.length));

    res.json({
      recipes: randomRecipes,
      total: randomRecipes.length
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch random recipes' });
  }
});

// Get recipe categories/tags
router.get('/meta/tags', (req, res) => {
  try {
    const allTags = recipes.reduce((acc, recipe) => {
      return acc.concat(recipe.tags, recipe.dietaryTags);
    }, []);

    const uniqueTags = [...new Set(allTags)];

    res.json({
      tags: uniqueTags.sort(),
      total: uniqueTags.length
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tags' });
  }
});

module.exports = router;
