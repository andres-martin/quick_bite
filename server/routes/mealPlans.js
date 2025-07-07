const express = require('express');
const router = express.Router();

// In-memory storage for meal plans (in production, use a database)
let mealPlans = [];
let nextId = 1;

// Get all meal plans
router.get('/', (req, res) => {
  try {
    res.json({
      mealPlans: mealPlans,
      total: mealPlans.length
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch meal plans' });
  }
});

// Create a new meal plan
router.post('/', (req, res) => {
  try {
    const { name, week, meals } = req.body;

    if (!name || !week || !meals) {
      return res.status(400).json({ error: 'Name, week, and meals are required' });
    }

    const newMealPlan = {
      id: nextId++,
      name,
      week, // Format: "2024-01-01" (Monday of the week)
      meals: meals || {
        monday: { breakfast: null, lunch: null, dinner: null },
        tuesday: { breakfast: null, lunch: null, dinner: null },
        wednesday: { breakfast: null, lunch: null, dinner: null },
        thursday: { breakfast: null, lunch: null, dinner: null },
        friday: { breakfast: null, lunch: null, dinner: null },
        saturday: { breakfast: null, lunch: null, dinner: null },
        sunday: { breakfast: null, lunch: null, dinner: null }
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    mealPlans.push(newMealPlan);
    res.status(201).json(newMealPlan);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create meal plan' });
  }
});

// Get meal plan by ID
router.get('/:id', (req, res) => {
  try {
    const mealPlanId = parseInt(req.params.id);
    const mealPlan = mealPlans.find(mp => mp.id === mealPlanId);

    if (!mealPlan) {
      return res.status(404).json({ error: 'Meal plan not found' });
    }

    res.json(mealPlan);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch meal plan' });
  }
});

// Update meal plan
router.put('/:id', (req, res) => {
  try {
    const mealPlanId = parseInt(req.params.id);
    const mealPlanIndex = mealPlans.findIndex(mp => mp.id === mealPlanId);

    if (mealPlanIndex === -1) {
      return res.status(404).json({ error: 'Meal plan not found' });
    }

    const { name, week, meals } = req.body;

    mealPlans[mealPlanIndex] = {
      ...mealPlans[mealPlanIndex],
      name: name || mealPlans[mealPlanIndex].name,
      week: week || mealPlans[mealPlanIndex].week,
      meals: meals || mealPlans[mealPlanIndex].meals,
      updatedAt: new Date().toISOString()
    };

    res.json(mealPlans[mealPlanIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update meal plan' });
  }
});

// Delete meal plan
router.delete('/:id', (req, res) => {
  try {
    const mealPlanId = parseInt(req.params.id);
    const mealPlanIndex = mealPlans.findIndex(mp => mp.id === mealPlanId);

    if (mealPlanIndex === -1) {
      return res.status(404).json({ error: 'Meal plan not found' });
    }

    mealPlans.splice(mealPlanIndex, 1);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete meal plan' });
  }
});

// Add recipe to meal plan
router.post('/:id/meals', (req, res) => {
  try {
    const mealPlanId = parseInt(req.params.id);
    const mealPlan = mealPlans.find(mp => mp.id === mealPlanId);

    if (!mealPlan) {
      return res.status(404).json({ error: 'Meal plan not found' });
    }

    const { day, mealType, recipeId } = req.body;

    if (!day || !mealType || !recipeId) {
      return res.status(400).json({ error: 'Day, mealType, and recipeId are required' });
    }

    if (!mealPlan.meals[day]) {
      return res.status(400).json({ error: 'Invalid day' });
    }

    if (!['breakfast', 'lunch', 'dinner'].includes(mealType)) {
      return res.status(400).json({ error: 'Invalid meal type' });
    }

    mealPlan.meals[day][mealType] = recipeId;
    mealPlan.updatedAt = new Date().toISOString();

    res.json(mealPlan);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add recipe to meal plan' });
  }
});

// Remove recipe from meal plan
router.delete('/:id/meals', (req, res) => {
  try {
    const mealPlanId = parseInt(req.params.id);
    const mealPlan = mealPlans.find(mp => mp.id === mealPlanId);

    if (!mealPlan) {
      return res.status(404).json({ error: 'Meal plan not found' });
    }

    const { day, mealType } = req.body;

    if (!day || !mealType) {
      return res.status(400).json({ error: 'Day and mealType are required' });
    }

    if (!mealPlan.meals[day]) {
      return res.status(400).json({ error: 'Invalid day' });
    }

    if (!['breakfast', 'lunch', 'dinner'].includes(mealType)) {
      return res.status(400).json({ error: 'Invalid meal type' });
    }

    mealPlan.meals[day][mealType] = null;
    mealPlan.updatedAt = new Date().toISOString();

    res.json(mealPlan);
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove recipe from meal plan' });
  }
});

module.exports = router;
