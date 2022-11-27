import { ProductFactory } from '../../../domain/product/factory/product.factory';
import { UpdateProductUseCase } from './update.product.usecase';

describe('Unit Teste Update Product', () => {
  // para conseguir realizar o teste é necessário criar um product antes
  const product = ProductFactory.create('A', 'Product 1', 10);

  const output = {
    id: product.id,
    name: 'Product 1 updated',
    price: 20,
  };

  const MockRepository = () => {
    // faz um Mock (simula) um repositório
    return {
      find: jest.fn().mockReturnValue(Promise.resolve(product)), // para fazer o update é preciso verificar se ele existe, portanto é preciso ter o método find implementado (no caso do mock "simulado")
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(), // .mockReturnValue(Promise.resolve(input)), // é esse input que o repositorio precisa retornar após a atualização. No nosso caso, como o update retorna void ele não será utilizado assim
    };
  };

  it('should update a product', async () => {
    const productRepository = MockRepository();
    const updateProductUseCase = new UpdateProductUseCase(productRepository);

    const input = {
      id: product.id,
      name: 'Product 1 updated',
      price: 20,
    };
    const output = await updateProductUseCase.execute(input);

    expect(output).toEqual(input);
  });
});
