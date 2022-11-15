import { CustomerFactory } from '../../../domain/customer/factory/customer.factory';
import { Address } from '../../../domain/customer/value-object/address';

const customer = CustomerFactory.createWithAddress(
  'Jane Doe',
  new Address('Street 1', 123, '456', 'New York'),
);

const input = {
  id: customer.id,
  name: 'Jane Doe Updated',
  address: {
    street: 'Street 1 Updated',
    number: 1234,
    zip: '456 Updated',
    city: 'New York Updated',
  },
};

const MockRepository = () => {
  // faz um Mock (simula) um repositório
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn().mockReturnValue(Promise.resolve(customer)), // para fazer o update é preciso verificar se ele existe, portanto é oreciso ter o método find implementado (no caso do mock "simulado")
    update: jest.fn(), // .mockReturnValue(Promise.resolve(input)), // é esse input que o repositorio precisa retornar após a atualização. No nosso caso, como o update retorna void ele não será utilizado assim
  };
};

describe('Unit Teste for customer update use case', () => {
  it('should update a customer', async () => {
    const customerRepository = MockRepository();

    const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

    const output = await customerUpdateUseCase.execute(input);

    expect(output).toEqual(input);
  });
});
