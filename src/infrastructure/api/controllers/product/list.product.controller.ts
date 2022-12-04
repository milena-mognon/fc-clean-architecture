import { Request, Response } from 'express';
import { ListProductUseCase } from '../../../../usecase/product/list/list.product.usecase';
import { ProductRepository } from '../../../product/repository/product.repository';

class ListProductController {
  async handle(request: Request, response: Response) {
    const listProductUserCase = new ListProductUseCase(new ProductRepository());

    try {
      const output = await listProductUserCase.execute({});

      response.send(output);
    } catch (error) {
      response.status(500).send();
    }
  }
}

export default new ListProductController();
