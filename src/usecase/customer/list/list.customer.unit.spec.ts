import { CustomerFactory } from '../../../domain/customer/factory/customer.factory';
import { Address } from '../../../domain/customer/value-object/address';
import { ListCustomerUseCase } from './list.customer.usecase';

const customer1 = CustomerFactory.createWithAddress(
  'Jane Doe',
  new Address('Street 1', 123, '456', 'New York'),
);

const customer2 = CustomerFactory.createWithAddress(
  'John Doe',
  new Address('Street 2', 456, '789', 'São Paulo'),
);

const MockRepository = () => {
  // faz um Mock (simula) um repositório
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('Unit Test for listing customer use case', () => {
  it('should list custumers', async () => {
    const customerRepository = MockRepository(); // instancia um repositório de customer
    const useCase = new ListCustomerUseCase(customerRepository); // instancia o use case

    const output = await useCase.execute({});

    expect(output.customers.length).toBe(2);

    expect(output.customers[0].id).toBe(customer1.id);
    expect(output.customers[0].name).toBe(customer1.id);
    expect(output.customers[0].address.street).toBe(customer1.address.street);

    expect(output.customers[1].id).toBe(customer2.id);
    expect(output.customers[1].name).toBe(customer2.id);
    expect(output.customers[1].address.street).toBe(customer2.address.street);
  });
});
