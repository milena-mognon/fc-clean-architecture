import { Request, Response } from 'express';
import { CreateProductUseCase } from '../../../../usecase/product/create/create.product.usecase';
import { ProductRepository } from '../../../product/repository/product.repository';

class CreateProductController {
  async handle(request: Request, response: Response) {
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
  }
}

export default new CreateProductController();
