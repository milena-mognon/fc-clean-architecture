import { app, sequilize } from '../express';
import request from 'supertest';

describe('End 2 End test for product', () => {
  beforeEach(async () => {
    await sequilize.sync({ force: true });
  });

  afterAll(async () => {
    await sequilize.close();
  });

  it('should create a product', async () => {
    const response = await request(app).post('/product').send({
      name: 'Product 1',
      price: 10,
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Product 1');
    expect(response.body.price).toBe(10);
  });
});
