import { Sequelize } from 'sequelize-typescript';
import { ProductFactory } from '../../../domain/product/factory/product.factory';
import { ProductModel } from '../../../infrastructure/product/repository/models/product.model';
import { ProductRepository } from '../../../infrastructure/product/repository/product.repository';
import { CreateProductUseCase } from '../create/create.product.usecase';
import { UpdateProductUseCase } from './update.product.usecase';

const input = {
  type: 'A',
  name: 'Product 2',
  price: 30,
};

describe('Integration Test Update Product Use Case', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should update a product', async () => {
    const productRepository = new ProductRepository();

    const createProductUseCase = new CreateProductUseCase(productRepository);
    const updateProductUseCase = new UpdateProductUseCase(productRepository);

    const product = await createProductUseCase.execute(input);

    const updateInput = {
      id: product.id,
      name: 'Product 2 updated',
      price: 40,
    };

    const output = await updateProductUseCase.execute(updateInput);

    expect(output).toEqual(updateInput);
  });
});
