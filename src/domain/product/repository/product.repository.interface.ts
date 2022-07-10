import { Product } from '../entity/Product';
import { RepositoryInterface } from '../../@shared/repository/repository.interface';

export interface ProductRepositoryInterface
  extends RepositoryInterface<Product> {
  // findByName(name: string): Promise<Product>;
}
