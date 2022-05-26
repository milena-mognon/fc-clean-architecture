import { Product } from '../entity/Product';
import { RepositoryInterface } from './repository.interface';

export interface ProductRepositoryInterface
  extends RepositoryInterface<Product> {
  // findByName(name: string): Promise<Product>;
}
