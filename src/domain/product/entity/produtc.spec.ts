import { Product } from './Product';

describe('Product unit test', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      let procuct = new Product('', 'Product 1', 100);
    }).toThrowError('product: Id is required');
  });
  it('should throw error when name is empty', () => {
    expect(() => {
      let procuct = new Product('1', '', 100);
    }).toThrowError('product: Name is required');
  });
  it('should throw error when price less than 0', () => {
    expect(() => {
      let procuct = new Product('1', 'Product 1', -1);
    }).toThrowError('product: Price must be greater than 0');
  });

  it('should throw error when id, name and price are invalid', () => {
    expect(() => {
      let procuct = new Product('', '', -1);
    }).toThrowError(
      'product: Id is required,product: Name is required,product: Price must be greater than 0',
    );
  });

  it('should change name', () => {
    let procuct = new Product('1', 'Product 1', 100);
    procuct.changeName('Product 2');

    expect(procuct.name).toBe('Product 2');
  });
  it('should change price', () => {
    let procuct = new Product('1', 'Product 1', 100);
    procuct.changePrice(200);

    expect(procuct.price).toBe(200);
  });
});
