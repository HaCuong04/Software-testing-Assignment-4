import express from 'express';
import request from 'supertest';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import dogRoutes from '../routes/dogRoutes';

const app = express();
app.use(express.json());
app.use('/api/dogs', dogRoutes);

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
  });
});

describe('API tests for dog routes', () => {

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('Test 1 - GET /api/dogs/random returns 200, success true and imageUrl string', async () => {

    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        message: 'https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg',
        status: 'success',
      }),
    } as unknown as Response);

    const res = await request(app).get('/api/dogs/random');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
    expect(res.body.data).toHaveProperty('imageUrl');
    expect(typeof res.body.data.imageUrl).toBe('string');
  });

  test('Test 2 - GET /api/dogs/invalid returns 404 and correct error message', async () => {

    const res = await request(app).get('/api/dogs/invalid');

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toBe('Route not found');
  });

});