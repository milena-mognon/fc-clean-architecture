import { Router } from 'express';
import { CreateCustomerUseCase } from '../../../usecase/customer/create/create.customer.usecase';
import { FindCustomerUseCase } from '../../../usecase/customer/find/find.customer.usecase';
import { ListCustomerUseCase } from '../../../usecase/customer/list/list.customer.usecase';
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

customerRoutes.get('/', async (request, response) => {
  const listCustomerUserCase = new ListCustomerUseCase(
    new CustomerRepository(),
  );

  try {
    const output = await listCustomerUserCase.execute({});

    response.send(output);
  } catch (error) {
    response.status(500).send();
  }
});

customerRoutes.get('/:id', async (request, response) => {
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
});
