import { Address } from '../value-object/address';
import { CustomerFactory } from './customer.factory';

describe('Customer factory unit test', () => {
  it('should create a customer', () => {
    let customer = CustomerFactory.create('Milena');

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe('Milena');
    expect(customer.address).toBeUndefined();
  });

  it('should create a customer with an address', () => {
    const address = new Address('Street 1', 123, '85000-000', 'São Paulo');
    let customer = CustomerFactory.createWithAddress('Milena', address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe('Milena');
    expect(customer.address).toBe(address);
  });
});
