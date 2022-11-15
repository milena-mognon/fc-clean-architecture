import { CustomerRepositoryInterface } from '../../../domain/customer/repository/customer.repository.interface';
import { Address } from '../../../domain/customer/value-object/address';
import {
  InputUpdateCustomerDto,
  OutputUpdateCustomerDto,
} from './update.customer.dto';

export class UpdateCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  async execute(
    input: InputUpdateCustomerDto,
  ): Promise<OutputUpdateCustomerDto> {
    const customer = await this.customerRepository.find(input.id);

    const { street, number, zip, city } = input.address;

    customer.changeName(input.name);
    customer.changeAddress(new Address(street, number, zip, city));

    await this.customerRepository.update(customer);

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        city: customer.address.city,
        number: customer.address.number,
        zip: customer.address.zip,
      },
    };
  }
}
