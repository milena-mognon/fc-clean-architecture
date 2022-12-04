import { Request, Response } from 'express';
import { FindCustomerUseCase } from '../../../../usecase/customer/find/find.customer.usecase';
import { CustomerRepository } from '../../../customer/repository/sequelize/customer.repository';

class FindCustomerController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const findCustomerUserCase = new FindCustomerUseCase(
      new CustomerRepository(),
    );

    try {
      const output = await findCustomerUserCase.execute({ id });

      response.send(output);
    } catch (error) {
      response.status(500).send();
    }
  }
}

export default new FindCustomerController();
