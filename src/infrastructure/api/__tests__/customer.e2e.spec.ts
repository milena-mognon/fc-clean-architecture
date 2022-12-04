import { app, sequilize } from '../express';
import request from 'supertest';

describe('End 2 End test for customer', () => {
  beforeEach(async () => {
    await sequilize.sync({ force: true });
  });

  afterAll(async () => {
    await sequilize.close();
  });

  it('should create a customer', async () => {
    const response = await request(app)
      .post('/customer')
      .send({
        name: 'Jane Doe',
        address: {
          street: 'Street 1',
          city: 'City 1',
          number: 123,
          zip: '12345',
        },
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Jane Doe');
    expect(response.body.address.street).toBe('Street 1');
    expect(response.body.address.city).toBe('City 1');
    expect(response.body.address.number).toBe(123);
    expect(response.body.address.zip).toBe('12345');
  });
});
