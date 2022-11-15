import { Customer } from '../../../domain/customer/entity/customer';
import { Address } from '../../../domain/customer/value-object/address';
import { FindCustomerUseCase } from './find.customer.usecase';

// para conseguir realizar o teste é necessário criar um customer antes
const customer = new Customer('123', 'Jane Doe');
const address = new Address('Street 1', 123, '456', 'New York');
customer.changeAddress(address);

const MockRepository = () => {
  // faz um Mock (simula) um repositório
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)), // a função find retorna uma promise com o valor simulado de um customer
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

/**
 * Nesse teste de unidade será usado Mock. Diferente do teste de integração, esse não depende de banco de dados, repositório, etc
 * para funcionar. A simulação é exclusivamente do use case FindCustomer.
 */
describe('Unit Test Find Customer Use Case', () => {
  it('should find a customer', async () => {
    const customerRepository = MockRepository(); // instancia um repositório de customer
    const useCase = new FindCustomerUseCase(customerRepository); // instancia o use case

    const input = {
      id: '123',
    };

    const output = {
      id: '123',
      name: 'Jane Doe',
      address: {
        street: 'Street 1',
        number: 123,
        zip: '456',
        city: 'New York',
      },
    };

    const result = await useCase.execute(input);

    expect(result).toEqual(output);
  });

  it('should not find a customer', async () => {
    const customerRepository = MockRepository();

    customerRepository.find.mockImplementation(() => {
      throw new Error('Customer not found');
    });

    const useCase = new FindCustomerUseCase(customerRepository); // instancia o use case

    const input = {
      id: '123',
    };

    expect(() => {
      return useCase.execute(input);
    }).rejects.toThrow('Customer not found');
  });
});
