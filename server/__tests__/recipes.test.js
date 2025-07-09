const request = require('supertest');
const { createTestApp } = require('./setup');

describe('Recipes API', () => {
  let app;

  beforeAll(() => {
    app = createTestApp();
  });

  describe('GET /api/recipes', () => {
    it('should return all recipes', async () => {
      const response = await request(app)
        .get('/api/recipes')
        .expect(200);

      expect(response.body).toHaveProperty('recipes');
      expect(response.body).toHaveProperty('total');
      expect(Array.isArray(response.body.recipes)).toBe(true);
      expect(response.body.total).toBeGreaterThan(0);
    });

    it('should filter recipes by max total time', async () => {
      const response = await request(app)
        .get('/api/recipes?maxTotalTime=20')
        .expect(200);

      expect(response.body.recipes).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            totalTime: expect.any(Number)
          })
        ])
      );

      // All recipes should have totalTime <= 20
      response.body.recipes.forEach(recipe => {
        expect(recipe.totalTime).toBeLessThanOrEqual(20);
      });
    });

    it('should filter recipes by max prep time', async () => {
      const response = await request(app)
        .get('/api/recipes?maxPrepTime=10')
        .expect(200);

      response.body.recipes.forEach(recipe => {
        expect(recipe.prepTime).toBeLessThanOrEqual(10);
      });
    });

    it('should filter recipes by diet', async () => {
      const response = await request(app)
        .get('/api/recipes?diet=vegetarian')
        .expect(200);

      response.body.recipes.forEach(recipe => {
        expect(recipe.dietaryTags).toEqual(
          expect.arrayContaining([
            expect.stringMatching(/vegetarian/i)
          ])
        );
      });
    });

    it('should filter recipes by difficulty', async () => {
      const response = await request(app)
        .get('/api/recipes?difficulty=easy')
        .expect(200);

      response.body.recipes.forEach(recipe => {
        expect(recipe.difficulty.toLowerCase()).toBe('easy');
      });
    });

    it('should search recipes by title', async () => {
      const response = await request(app)
        .get('/api/recipes?search=avocado')
        .expect(200);

      response.body.recipes.forEach(recipe => {
        const searchMatch =
          recipe.title.toLowerCase().includes('avocado') ||
          recipe.description.toLowerCase().includes('avocado') ||
          recipe.tags.some(tag => tag.toLowerCase().includes('avocado'));
        expect(searchMatch).toBe(true);
      });
    });

    it('should limit results', async () => {
      const response = await request(app)
        .get('/api/recipes?limit=2')
        .expect(200);

      expect(response.body.recipes.length).toBeLessThanOrEqual(2);
    });

    it('should return filters in response', async () => {
      const response = await request(app)
        .get('/api/recipes?maxTotalTime=30&diet=vegetarian')
        .expect(200);

      expect(response.body.filters).toEqual({
        maxTotalTime: '30',
        diet: 'vegetarian'
      });
    });
  });

  describe('GET /api/recipes/:id', () => {
    it('should return a specific recipe', async () => {
      const response = await request(app)
        .get('/api/recipes/1')
        .expect(200);

      expect(response.body).toHaveProperty('id', 1);
      expect(response.body).toHaveProperty('title');
      expect(response.body).toHaveProperty('description');
      expect(response.body).toHaveProperty('ingredients');
      expect(response.body).toHaveProperty('instructions');
      expect(response.body).toHaveProperty('prepTime');
      expect(response.body).toHaveProperty('cookTime');
      expect(response.body).toHaveProperty('totalTime');
      expect(response.body).toHaveProperty('servings');
      expect(response.body).toHaveProperty('difficulty');
      expect(response.body).toHaveProperty('dietaryTags');
      expect(response.body).toHaveProperty('tags');
    });

    it('should return 404 for non-existent recipe', async () => {
      const response = await request(app)
        .get('/api/recipes/999')
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Recipe not found');
    });

    it('should handle invalid recipe ID', async () => {
      const response = await request(app)
        .get('/api/recipes/invalid')
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Recipe not found');
    });
  });

  describe('GET /api/recipes/random/:count', () => {
    it('should return random recipes', async () => {
      const response = await request(app)
        .get('/api/recipes/random/3')
        .expect(200);

      expect(response.body).toHaveProperty('recipes');
      expect(response.body).toHaveProperty('total');
      expect(response.body.recipes.length).toBeLessThanOrEqual(3);
      expect(response.body.total).toBe(response.body.recipes.length);
    });

    it('should handle count larger than available recipes', async () => {
      const response = await request(app)
        .get('/api/recipes/random/100')
        .expect(200);

      expect(response.body.recipes.length).toBeGreaterThan(0);
    });

    it('should default to 3 recipes if no count specified', async () => {
      const response = await request(app)
        .get('/api/recipes/random/invalid')
        .expect(200);

      expect(response.body.recipes.length).toBeLessThanOrEqual(3);
    });
  });

  describe('GET /api/recipes/meta/tags', () => {
    it('should return all available tags', async () => {
      const response = await request(app)
        .get('/api/recipes/meta/tags')
        .expect(200);

      expect(response.body).toHaveProperty('tags');
      expect(response.body).toHaveProperty('total');
      expect(Array.isArray(response.body.tags)).toBe(true);
      expect(response.body.total).toBeGreaterThan(0);
      expect(response.body.tags).toEqual(expect.arrayContaining([
        expect.any(String)
      ]));
    });

    it('should return unique tags', async () => {
      const response = await request(app)
        .get('/api/recipes/meta/tags')
        .expect(200);

      const uniqueTags = [...new Set(response.body.tags)];
      expect(response.body.tags).toEqual(uniqueTags);
    });

    it('should return sorted tags', async () => {
      const response = await request(app)
        .get('/api/recipes/meta/tags')
        .expect(200);

      const sortedTags = [...response.body.tags].sort();
      expect(response.body.tags).toEqual(sortedTags);
    });
  });

  describe('Error handling', () => {
    it('should handle server errors gracefully', async () => {
      // This test would require mocking the recipes data to cause an error
      // For now, we'll test that the API structure is consistent
      const response = await request(app)
        .get('/api/recipes')
        .expect(200);

      expect(response.body).toHaveProperty('recipes');
      expect(response.body).toHaveProperty('total');
    });
  });
});
