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
      type: 'A',
      name: 'Product 1',
      price: 10,
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Product 1');
    expect(response.body.price).toBe(10);
  });

  it('should not create a product', async () => {
    const response = await request(app).post('/product').send({
      name: 'John Doe',
    });

    expect(response.status).toBe(500);
  });

  it('should not list all products', async () => {
    const response1 = await request(app).post('/product').send({
      type: 'A',
      name: 'Product 1',
      price: 10,
    });
    expect(response1.status).toBe(200);

    const response2 = await request(app).post('/product').send({
      type: 'A',
      name: 'Product 2',
      price: 20,
    });
    expect(response2.status).toBe(200);

    const response3 = await request(app).get('/product');

    const product1 = response1.body;
    const product2 = response2.body;
    const products = response3.body.products;

    expect(response3.status).toBe(200);
    expect(products[0].name).toBe(product1.name);
    expect(products[0].price).toBe(product1.price);
    expect(products[1].name).toBe(product2.name);
    expect(products[1].price).toBe(product2.price);
  });
});
