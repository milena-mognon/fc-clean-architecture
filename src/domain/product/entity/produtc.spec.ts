import { Product } from './Product';

describe('Product unit test', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      let procuct = new Product('', 'Product 1', 100);
    }).toThrowError('Id is required');
  });
  it('should throw error when name is empty', () => {
    expect(() => {
      let procuct = new Product('1', '', 100);
    }).toThrowError('Name is required');
  });
  it('should throw error when price less than 0', () => {
    expect(() => {
      let procuct = new Product('1', 'Product 1', -1);
    }).toThrowError('Price must be greater than 0');
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
