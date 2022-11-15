import { CreateCustomerUseCase } from './create.customer.usecase';

const input = {
  id: '123',
  name: 'Jane Doe',
  address: {
    street: 'Street 1',
    number: 123,
    zip: '456',
    city: 'New York',
  },
};

const MockRepository = () => {
  // faz um Mock (simula) um repositório
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('Unit Test Create Customer', () => {
  it('should create a customer', async () => {
    const customerRepository = MockRepository();

    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

    const output = await customerCreateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        zip: input.address.zip,
        city: input.address.city,
      },
    });
  });
});
