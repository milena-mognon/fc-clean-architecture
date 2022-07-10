import { Address } from '../value-object/address';
import { Customer } from './customer';

describe('custumer unit test', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      let customer = new Customer('', 'Milena');
    }).toThrowError('Id is required');
  });

  it('should throw error when name is empty', () => {
    expect(() => {
      let customer = new Customer('123', '');
    }).toThrowError('Name is required');
  });

  it('should change name', () => {
    // arrange
    let customer = new Customer('123', 'Milena');

    //act
    customer.changeName('Milena Mognon');

    //Assert
    expect(customer.name).toBe('Milena Mognon');
  });

  it('should activate customer', () => {
    // arrange
    let customer = new Customer('123', 'Customer 1');
    const address = new Address('Rua XXXX', 123, '88888-88', 'Guarapuava');
    customer.changeAddress(address);

    //act
    customer.activate();

    //Assert
    expect(customer.isActive()).toBe(true);
  });

  it('should deactivate customer', () => {
    // arrange
    let customer = new Customer('123', 'Customer 1');

    //act
    customer.deactivate();

    //Assert
    expect(customer.isActive()).toBe(false);
  });

  it('should throw erro when address is undefined when you activate a customer', () => {
    expect(() => {
      let customer = new Customer('123', 'Customer 1');
      customer.activate();
    }).toThrowError('Address is mandatory to activate a customer');
  });

  it('should add reward points', () => {
    const customer = new Customer('1', 'Customer 1');

    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });
});
