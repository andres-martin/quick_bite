const request = require('supertest');
const { createTestApp } = require('./setup');

describe('Health API', () => {
  let app;

  beforeAll(() => {
    app = createTestApp();
  });

  describe('GET /api/health', () => {
    it('should return health check status', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      expect(response.body).toHaveProperty('message', 'QuickBite API is running!');
      expect(response.body).toHaveProperty('timestamp');
      expect(new Date(response.body.timestamp)).toBeInstanceOf(Date);
    });

    it('should return valid timestamp', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      const timestamp = new Date(response.body.timestamp);
      const now = new Date();

      // Check if timestamp is within the last minute
      expect(Math.abs(now.getTime() - timestamp.getTime())).toBeLessThan(60000);
    });
  });
});
