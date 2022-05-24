import { Product } from '../entity/Product';

/**
 * Domain Service
 * deve ser stateless
 */
export class ProductService {
  static increasePrice(products: Product[], percentage: number): void {
    // não faz sentido colocar isso na entidade
    products.forEach(product => {
      product.changePrice((product.price * percentage) / 100 + product.price);
    });
  }
}
