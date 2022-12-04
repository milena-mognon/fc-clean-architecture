import { Router } from 'express';
import { CreateCustomerUseCase } from '../../../usecase/customer/create/create.customer.usecase';
import { CustomerRepository } from '../../customer/repository/sequelize/customer.repository';

export const customerRoutes = Router();

customerRoutes.post('/', async (request, response) => {
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
});
