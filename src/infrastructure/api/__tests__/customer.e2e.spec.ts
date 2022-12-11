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

  it('should not create a customer', async () => {
    const response = await request(app).post('/customer').send({
      name: 'John Doe',
    });

    expect(response.status).toBe(500);
  });

  it('should list all customers', async () => {
    const response1 = await request(app)
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
    expect(response1.status).toBe(200);

    const response2 = await request(app)
      .post('/customer')
      .send({
        name: 'John Doe',
        address: {
          street: 'Street 2',
          city: 'City 2',
          number: 456,
          zip: '45678',
        },
      });
    expect(response2.status).toBe(200);

    const response3 = await request(app).get('/customer').send();

    const customers = response3.body.customers;
    const customer1 = response1.body;
    const customer2 = response2.body;

    expect(response3.status).toBe(200);
    expect(customers.length).toBe(2);
    expect(customers[0].name).toBe(customer1.name);
    expect(customers[0].address.street).toBe(customer1.address.street);
    expect(customers[0].address.city).toBe(customer1.address.city);
    expect(customers[0].address.number).toBe(customer1.address.number);
    expect(customers[0].address.zip).toBe(customer1.address.zip);

    expect(customers[1].name).toBe(customer2.name);
    expect(customers[1].address.street).toBe(customer2.address.street);
    expect(customers[1].address.city).toBe(customer2.address.city);
    expect(customers[1].address.number).toBe(customer2.address.number);
    expect(customers[1].address.zip).toBe(customer2.address.zip);

    const responseXML = await request(app)
      .get('/customer')
      .set('Accept', 'application/xml')
      .send();

    expect(responseXML.status).toBe(200);
    expect(responseXML.text).toContain(
      '<?xml version="1.0" encoding="UTF-8"?>',
    );
    expect(responseXML.text).toContain('<customers>');
    expect(responseXML.text).toContain('<customer>');
    expect(responseXML.text).toContain(`<name>${customer1.name}</name>`);
    expect(responseXML.text).toContain(`<address>`);
    expect(responseXML.text).toContain(
      `<street>${customer1.address.street}</street>`,
    );
    expect(responseXML.text).toContain(
      `<number>${customer1.address.number}</number>`,
    );
    expect(responseXML.text).toContain(`<zip>${customer1.address.zip}</zip>`);
    expect(responseXML.text).toContain(
      `<city>${customer1.address.city}</city>`,
    );
    expect(responseXML.text).toContain(`</address>`);
    expect(responseXML.text).toContain('</customer>');
    expect(responseXML.text).toContain('<customer>');
    expect(responseXML.text).toContain(`<name>${customer2.name}</name>`);
    expect(responseXML.text).toContain(`<address>`);
    expect(responseXML.text).toContain(
      `<street>${customer2.address.street}</street>`,
    );
    expect(responseXML.text).toContain(
      `<number>${customer2.address.number}</number>`,
    );
    expect(responseXML.text).toContain(`<zip>${customer2.address.zip}</zip>`);
    expect(responseXML.text).toContain(
      `<city>${customer2.address.city}</city>`,
    );
    expect(responseXML.text).toContain(`</address>`);
    expect(responseXML.text).toContain('</customer>');
    expect(responseXML.text).toContain('</customers>');
  });

  it('should find a customer', async () => {
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

    const customer1 = response.body;

    const response2 = await request(app).get(`/customer/${customer1.id}`);

    expect(response2.status).toBe(200);
    expect(response2.body.name).toBe(customer1.name);
    expect(response2.body.address.street).toBe(customer1.address.street);
    expect(response2.body.address.city).toBe(customer1.address.city);
    expect(response2.body.address.number).toBe(customer1.address.number);
    expect(response2.body.address.zip).toBe(customer1.address.zip);
  });
});
