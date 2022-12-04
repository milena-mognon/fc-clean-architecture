import { Request, Response } from 'express';
import { CreateCustomerUseCase } from '../../../../usecase/customer/create/create.customer.usecase';
import { CustomerRepository } from '../../../customer/repository/sequelize/customer.repository';

class CreateCustomerController {
  async handle(request: Request, response: Response) {
    const { name, address } = request.body;
    const createCustomerUserCase = new CreateCustomerUseCase(
      new CustomerRepository(),
    );

    try {
      const customerDTO = {
        name,
        address: {
          street: address.street,
          city: address.city,
          number: address.number,
          zip: address.zip,
        },
      };

      const output = await createCustomerUserCase.execute(customerDTO);

      response.send(output);
    } catch (error) {
      response.status(500).send();
    }
  }
}

export default new CreateCustomerController();
