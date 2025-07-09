const request = require('supertest');
const { createTestApp } = require('./setup');

describe('Meal Plans API', () => {
  let app;

  beforeAll(() => {
    app = createTestApp();
  });

  describe('GET /api/meal-plans', () => {
    it('should return all meal plans', async () => {
      const response = await request(app)
        .get('/api/meal-plans')
        .expect(200);

      expect(response.body).toHaveProperty('mealPlans');
      expect(response.body).toHaveProperty('total');
      expect(Array.isArray(response.body.mealPlans)).toBe(true);
      expect(response.body.total).toBe(response.body.mealPlans.length);
    });
  });

  describe('POST /api/meal-plans', () => {
    it('should create a new meal plan', async () => {
      const newMealPlan = {
        name: 'Test Meal Plan',
        week: '2024-01-01',
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

      const response = await request(app)
        .post('/api/meal-plans')
        .send(newMealPlan)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('name', 'Test Meal Plan');
      expect(response.body).toHaveProperty('week', '2024-01-01');
      expect(response.body).toHaveProperty('meals');
      expect(response.body).toHaveProperty('createdAt');
      expect(response.body).toHaveProperty('updatedAt');
    });

    it('should return 400 for missing required fields', async () => {
      const incompleteMealPlan = {
        name: 'Test Meal Plan'
        // Missing week and meals
      };

      const response = await request(app)
        .post('/api/meal-plans')
        .send(incompleteMealPlan)
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Name and week are required');
    });

    it('should create meal plan with default meals structure', async () => {
      const simpleMealPlan = {
        name: 'Simple Plan',
        week: '2024-01-08'
        // No meals property - should use default structure
      };

      const response = await request(app)
        .post('/api/meal-plans')
        .send(simpleMealPlan)
        .expect(201);

      expect(response.body.meals).toHaveProperty('monday');
      expect(response.body.meals).toHaveProperty('tuesday');
      expect(response.body.meals).toHaveProperty('wednesday');
      expect(response.body.meals).toHaveProperty('thursday');
      expect(response.body.meals).toHaveProperty('friday');
      expect(response.body.meals).toHaveProperty('saturday');
      expect(response.body.meals).toHaveProperty('sunday');
    });
  });

  describe('GET /api/meal-plans/:id', () => {
    let mealPlanId;

    beforeEach(async () => {
      // Create a meal plan for testing
      const newMealPlan = {
        name: 'Test Meal Plan',
        week: '2024-01-01',
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

      const response = await request(app)
        .post('/api/meal-plans')
        .send(newMealPlan);

      mealPlanId = response.body.id;
    });

    it('should return a specific meal plan', async () => {
      const response = await request(app)
        .get(`/api/meal-plans/${mealPlanId}`)
        .expect(200);

      expect(response.body).toHaveProperty('id', mealPlanId);
      expect(response.body).toHaveProperty('name', 'Test Meal Plan');
      expect(response.body).toHaveProperty('week', '2024-01-01');
      expect(response.body).toHaveProperty('meals');
    });

    it('should return 404 for non-existent meal plan', async () => {
      const response = await request(app)
        .get('/api/meal-plans/999')
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Meal plan not found');
    });
  });

  describe('PUT /api/meal-plans/:id', () => {
    let mealPlanId;

    beforeEach(async () => {
      const newMealPlan = {
        name: 'Test Meal Plan',
        week: '2024-01-01',
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

      const response = await request(app)
        .post('/api/meal-plans')
        .send(newMealPlan);

      mealPlanId = response.body.id;
    });

    it('should update a meal plan', async () => {
      const updatedData = {
        name: 'Updated Meal Plan',
        week: '2024-01-08'
      };

      const response = await request(app)
        .put(`/api/meal-plans/${mealPlanId}`)
        .send(updatedData)
        .expect(200);

      expect(response.body).toHaveProperty('id', mealPlanId);
      expect(response.body).toHaveProperty('name', 'Updated Meal Plan');
      expect(response.body).toHaveProperty('week', '2024-01-08');
      expect(response.body).toHaveProperty('updatedAt');
    });

    it('should return 404 for non-existent meal plan', async () => {
      const response = await request(app)
        .put('/api/meal-plans/999')
        .send({ name: 'Updated' })
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Meal plan not found');
    });
  });

  describe('DELETE /api/meal-plans/:id', () => {
    let mealPlanId;

    beforeEach(async () => {
      const newMealPlan = {
        name: 'Test Meal Plan',
        week: '2024-01-01',
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

      const response = await request(app)
        .post('/api/meal-plans')
        .send(newMealPlan);

      mealPlanId = response.body.id;
    });

    it('should delete a meal plan', async () => {
      await request(app)
        .delete(`/api/meal-plans/${mealPlanId}`)
        .expect(204);

      // Verify it's deleted
      await request(app)
        .get(`/api/meal-plans/${mealPlanId}`)
        .expect(404);
    });

    it('should return 404 for non-existent meal plan', async () => {
      const response = await request(app)
        .delete('/api/meal-plans/999')
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Meal plan not found');
    });
  });

  describe('POST /api/meal-plans/:id/meals', () => {
    let mealPlanId;

    beforeEach(async () => {
      const newMealPlan = {
        name: 'Test Meal Plan',
        week: '2024-01-01',
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

      const response = await request(app)
        .post('/api/meal-plans')
        .send(newMealPlan);

      mealPlanId = response.body.id;
    });

    it('should add a recipe to meal plan', async () => {
      const mealData = {
        day: 'monday',
        mealType: 'breakfast',
        recipeId: 1
      };

      const response = await request(app)
        .post(`/api/meal-plans/${mealPlanId}/meals`)
        .send(mealData)
        .expect(200);

      expect(response.body.meals.monday.breakfast).toBe(1);
      expect(response.body).toHaveProperty('updatedAt');
    });

    it('should return 400 for missing required fields', async () => {
      const incompleteMealData = {
        day: 'monday',
        mealType: 'breakfast'
        // Missing recipeId
      };

      const response = await request(app)
        .post(`/api/meal-plans/${mealPlanId}/meals`)
        .send(incompleteMealData)
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Day, mealType, and recipeId are required');
    });

    it('should return 400 for invalid day', async () => {
      const invalidMealData = {
        day: 'invalidday',
        mealType: 'breakfast',
        recipeId: 1
      };

      const response = await request(app)
        .post(`/api/meal-plans/${mealPlanId}/meals`)
        .send(invalidMealData)
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Invalid day');
    });

    it('should return 400 for invalid meal type', async () => {
      const invalidMealData = {
        day: 'monday',
        mealType: 'invalidmeal',
        recipeId: 1
      };

      const response = await request(app)
        .post(`/api/meal-plans/${mealPlanId}/meals`)
        .send(invalidMealData)
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Invalid meal type');
    });

    it('should return 404 for non-existent meal plan', async () => {
      const mealData = {
        day: 'monday',
        mealType: 'breakfast',
        recipeId: 1
      };

      const response = await request(app)
        .post('/api/meal-plans/999/meals')
        .send(mealData)
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Meal plan not found');
    });
  });

  describe('DELETE /api/meal-plans/:id/meals', () => {
    let mealPlanId;

    beforeEach(async () => {
      const newMealPlan = {
        name: 'Test Meal Plan',
        week: '2024-01-01',
        meals: {
          monday: { breakfast: 1, lunch: null, dinner: null },
          tuesday: { breakfast: null, lunch: null, dinner: null },
          wednesday: { breakfast: null, lunch: null, dinner: null },
          thursday: { breakfast: null, lunch: null, dinner: null },
          friday: { breakfast: null, lunch: null, dinner: null },
          saturday: { breakfast: null, lunch: null, dinner: null },
          sunday: { breakfast: null, lunch: null, dinner: null }
        }
      };

      const response = await request(app)
        .post('/api/meal-plans')
        .send(newMealPlan);

      mealPlanId = response.body.id;
    });

    it('should remove a recipe from meal plan', async () => {
      const mealData = {
        day: 'monday',
        mealType: 'breakfast'
      };

      const response = await request(app)
        .delete(`/api/meal-plans/${mealPlanId}/meals`)
        .send(mealData)
        .expect(200);

      expect(response.body.meals.monday.breakfast).toBe(null);
      expect(response.body).toHaveProperty('updatedAt');
    });

    it('should return 400 for missing required fields', async () => {
      const incompleteMealData = {
        day: 'monday'
        // Missing mealType
      };

      const response = await request(app)
        .delete(`/api/meal-plans/${mealPlanId}/meals`)
        .send(incompleteMealData)
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Day and mealType are required');
    });

    it('should return 404 for non-existent meal plan', async () => {
      const mealData = {
        day: 'monday',
        mealType: 'breakfast'
      };

      const response = await request(app)
        .delete('/api/meal-plans/999/meals')
        .send(mealData)
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Meal plan not found');
    });
  });
});
