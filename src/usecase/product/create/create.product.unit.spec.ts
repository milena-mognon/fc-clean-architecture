import { CreateProductUseCase } from './create.product.usecase';

const input = {
  type: 'A',
  name: 'Product 1',
  price: 10,
};

const MockRepository = () => {
  // faz um Mock (simula) um repositório
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('Unit Test Create Product', () => {
  it('should create a product', async () => {
    const productRepository = MockRepository();

    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const output = await productCreateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it('should throw an error when name is missing', async () => {
    const productRepository = MockRepository();

    const productCreateUseCase = new CreateProductUseCase(productRepository);

    input.name = '';

    await expect(productCreateUseCase.execute(input)).rejects.toThrow(
      'Name is required',
    );
  });

  it('should throw an error when price is negative', async () => {
    const productRepository = MockRepository();

    const productCreateUseCase = new CreateProductUseCase(productRepository);

    input.name = 'Product 1';
    input.price = -1;

    await expect(productCreateUseCase.execute(input)).rejects.toThrow(
      'Price must be greater than 0',
    );
  });
});
