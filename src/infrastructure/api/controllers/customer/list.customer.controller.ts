import { Request, Response } from 'express';
import { ListCustomerUseCase } from '../../../../usecase/customer/list/list.customer.usecase';
import { CustomerRepository } from '../../../customer/repository/sequelize/customer.repository';

class ListCustomerController {
  async handle(request: Request, response: Response) {
    const listCustomerUserCase = new ListCustomerUseCase(
      new CustomerRepository(),
    );

    try {
      const output = await listCustomerUserCase.execute({});

      response.send(output);
    } catch (error) {
      response.status(500).send();
    }
  }
}

export default new ListCustomerController();
