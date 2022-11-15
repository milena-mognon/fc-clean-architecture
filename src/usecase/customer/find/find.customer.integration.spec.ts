import { Sequelize } from 'sequelize-typescript';
import { Customer } from '../../../domain/customer/entity/customer';
import { Address } from '../../../domain/customer/value-object/address';
import { CustomerRepository } from '../../../infrastructure/customer/repository/sequelize/customer.repository';
import { CustomerModel } from '../../../infrastructure/customer/repository/sequelize/models/customer.model';
import { FindCustomerUseCase } from './find.customer.usecase';

describe('Test Find Customer Use Case', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should find a customer', async () => {
    const customerRepository = new CustomerRepository(); // instancia um repositório de customer
    const useCase = new FindCustomerUseCase(customerRepository); // instancia o use case

    // para conseguir realizar o teste é necessário criar um customer antes
    const customer = new Customer('123', 'Jane Doe');
    const address = new Address('Street 1', 123, '456', 'New York');
    customer.changeAddress(address);

    const customerCreted = await customerRepository.create(customer); // realiza o cadastro no banco de dados

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
});
