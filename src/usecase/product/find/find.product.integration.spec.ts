import { Sequelize } from 'sequelize-typescript';
import { Product } from '../../../domain/product/entity/Product';
import { ProductModel } from '../../../infrastructure/product/repository/models/product.model';
import { ProductRepository } from '../../../infrastructure/product/repository/product.repository';
import { FindProductUseCase } from './find.product.usecase';

describe('Integration Test Find Product Use Case', () => {
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

  it('should find a product', async () => {
    const productRepository = new ProductRepository(); // instancia um repositório de product
    const useCase = new FindProductUseCase(productRepository); // instancia o use case

    // para conseguir realizar o teste é necessário criar um product antes
    const product = new Product('123', 'Product 1', 10);

    const productCreated = await productRepository.create(product); // realiza o cadastro no banco de dados

    const input = {
      id: '123',
    };

    const output = {
      id: '123',
      name: 'Product 1',
      price: 10,
    };

    const result = await useCase.execute(input);

    expect(result).toEqual(output);
  });
});
