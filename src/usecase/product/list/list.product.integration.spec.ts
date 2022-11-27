import { Sequelize } from 'sequelize-typescript';
import { ProductModel } from '../../../infrastructure/product/repository/models/product.model';
import { ProductRepository } from '../../../infrastructure/product/repository/product.repository';
import { CreateProductUseCase } from '../create/create.product.usecase';
import { ListProductUseCase } from './list.product.usecase';

const product1 = {
  type: 'A',
  name: 'Prodict 1',
  price: 10,
};
const product2 = {
  type: 'A',
  name: 'Prodict 2',
  price: 20,
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

  it('should list products', async () => {
    const productRepository = new ProductRepository();

    const listProductUseCase = new ListProductUseCase(productRepository);
    const createtProductUseCase = new CreateProductUseCase(productRepository);

    const output1 = await createtProductUseCase.execute(product1);
    const output2 = await createtProductUseCase.execute(product2);

    const output = await listProductUseCase.execute({});

    expect(output.products.length).toBe(2);

    expect(output.products[0].id).toBe(output1.id);
    expect(output.products[0].name).toBe(output1.name);

    expect(output.products[1].id).toBe(output2.id);
    expect(output.products[1].name).toBe(output2.name);
  });
});
