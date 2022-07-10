import { Sequelize } from 'sequelize-typescript';
import { Customer } from '../../../../domain/customer/entity/customer';
import { Address } from '../../../../domain/customer/value-object/address';
import { CustomerRepository } from './customer.repository';
import { CustomerModel } from './models/customer.model';

describe('Customer Repository Test', () => {
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

  it('should create a customer', async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer('1', 'Customer 1');
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1');
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: '1' } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: '1',
      name: customer.name,
      street: customer.address.street,
      number: customer.address.number,
      zipcode: customer.address.zip,
      city: customer.address.city,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
    });
  });

  it('should update a customer', async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer('1', 'Customer 1');
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1');
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: '1' } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: '1',
      name: customer.name,
      street: customer.address.street,
      number: customer.address.number,
      zipcode: customer.address.zip,
      city: customer.address.city,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
    });

    customer.changeName('Customer 2');

    await customerRepository.update(customer);

    const customerModel2 = await CustomerModel.findOne({ where: { id: '1' } });

    expect(customerModel2.toJSON()).toStrictEqual({
      id: '1',
      name: 'Customer 2',
      street: customer.address.street,
      number: customer.address.number,
      zipcode: customer.address.zip,
      city: customer.address.city,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
    });
  });

  it('should find a customer', async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer('1', 'Customer 1');
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1');
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const foundCustomer = await customerRepository.find('1');

    expect(customer).toStrictEqual(foundCustomer);
  });

  it('should throw an error when customer is not found', () => {
    const customerRepository = new CustomerRepository();

    expect(async () => {
      await customerRepository.find('43562');
    }).rejects.toThrow('Customer not found');
  });

  it('should find all customers', async () => {
    const customerRepository = new CustomerRepository();

    const customer1 = new Customer('1', 'Customer 1');
    const address1 = new Address('Street 1', 1, 'Zipcode 1', 'City 1');
    customer1.changeAddress(address1);
    customer1.addRewardPoints(10);
    customer1.activate();

    const customer2 = new Customer('2', 'Customer 2');
    const address2 = new Address('Street 2', 2, 'Zipcode 2', 'City 2');
    customer2.changeAddress(address2);
    customer2.addRewardPoints(20);

    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    const customers = await customerRepository.findAll();

    expect(customers).toHaveLength(2);
    expect(customers).toContainEqual(customer1);
    expect(customers).toContainEqual(customer2);
  });
});
