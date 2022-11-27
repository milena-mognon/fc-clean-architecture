import { ProductFactory } from '../../../domain/product/factory/product.factory';
import { ListProductUseCase } from './list.product.usecase';

const product1 = ProductFactory.create('A', 'Prodict 1', 10);
const product2 = ProductFactory.create('B', 'Prodict 2', 20);

const MockRepository = () => {
  // faz um Mock (simula) um repositório
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('Unit Test List Product Use Case', () => {
  it('should list a product', async () => {
    const productRepository = MockRepository(); // instancia um repositório de product
    const listProductUseCase = new ListProductUseCase(productRepository); // instancia o use case

    const output = await listProductUseCase.execute({});

    expect(output.products.length).toBe(2);

    expect(output.products[0].id).toBe(product1.id);
    expect(output.products[0].name).toBe(product1.name);

    expect(output.products[1].id).toBe(product2.id);
    expect(output.products[1].name).toBe(product2.name);
  });
});
