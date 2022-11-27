import { Product } from '../../../domain/product/entity/Product';
import { FindProductUseCase } from './find.product.usecase';

// para conseguir realizar o teste é necessário criar um product antes
const product = new Product('123', 'Product 1', 10);

const MockRepository = () => {
  // faz um Mock (simula) um repositório
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)), // a função find retorna uma promise com o valor simulado de um product
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('Unit Test Find Product Use Case', () => {
  it('should find a product', async () => {
    const productRepository = MockRepository(); // instancia um repositório de product
    const useCase = new FindProductUseCase(productRepository); // instancia o use case

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

  it('should not find a product', async () => {
    const productRepository = MockRepository();

    productRepository.find.mockImplementation(() => {
      throw new Error('Product not found');
    });

    const useCase = new FindProductUseCase(productRepository); // instancia o use case

    const input = {
      id: '123',
    };

    expect(() => {
      return useCase.execute(input);
    }).rejects.toThrow('Product not found');
  });
});
