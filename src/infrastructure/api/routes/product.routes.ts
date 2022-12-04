import { Router } from 'express';
import { CreateProductUseCase } from '../../../usecase/product/create/create.product.usecase';
import { FindProductUseCase } from '../../../usecase/product/find/find.product.usecase';
import { ListProductUseCase } from '../../../usecase/product/list/list.product.usecase';
import { ProductRepository } from '../../product/repository/product.repository';

export const productRoutes = Router();

productRoutes.post('/', async (request, response) => {
  const { type, name, price } = request.body;
  const createProductUserCase = new CreateProductUseCase(
    new ProductRepository(),
  );

  try {
    const productDTO = {
      type,
      name,
      price,
    };

    const output = await createProductUserCase.execute(productDTO);

    response.send(output);
  } catch (error) {
    response.status(500).send(error);
  }
});

productRoutes.get('/', async (request, response) => {
  const listProductUserCase = new ListProductUseCase(new ProductRepository());

  try {
    const output = await listProductUserCase.execute({});

    response.send(output);
  } catch (error) {
    response.status(500).send();
  }
});

productRoutes.get('/:id', async (request, response) => {
  const { id } = request.params;

  const findProductUserCase = new FindProductUseCase(new ProductRepository());

  try {
    const output = await findProductUserCase.execute({ id });

    response.send(output);
  } catch (error) {
    response.status(500).send();
  }
});
