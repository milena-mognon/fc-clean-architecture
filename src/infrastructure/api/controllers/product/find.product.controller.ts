import { Request, Response } from 'express';
import { FindProductUseCase } from '../../../../usecase/product/find/find.product.usecase';
import { ProductRepository } from '../../../product/repository/product.repository';

class FindProductController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const findProductUserCase = new FindProductUseCase(new ProductRepository());

    try {
      const output = await findProductUserCase.execute({ id });

      response.send(output);
    } catch (error) {
      response.status(500).send();
    }
  }
}

export default new FindProductController();
