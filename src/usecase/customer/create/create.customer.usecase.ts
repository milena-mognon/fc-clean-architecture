import { CustomerFactory } from '../../../domain/customer/factory/customer.factory';
import { CustomerRepositoryInterface } from '../../../domain/customer/repository/customer.repository.interface';
import { Address } from '../../../domain/customer/value-object/address';
import {
  InputCreateCustomerDto,
  OutputCreateCustomerDto,
} from './create.customer.dto';

export class CreateCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  async execute(
    input: InputCreateCustomerDto,
  ): Promise<OutputCreateCustomerDto> {
    const { street, number, zip, city } = input.address;

    const customer = CustomerFactory.createWithAddress(
      input.name,
      new Address(street, number, zip, city),
    );

    await this.customerRepository.create(customer);

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        number: customer.address.number,
        zip: customer.address.zip,
        city: customer.address.city,
      },
    };
  }
}
