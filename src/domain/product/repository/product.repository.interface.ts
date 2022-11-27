import { Product } from '../entity/Product';
import { RepositoryInterface } from '../../@shared/repository/repository.interface';
import { ProductInterface } from '../entity/product.interface';

export interface ProductRepositoryInterface
  extends RepositoryInterface<Product> {
  create(entity: Product | ProductInterface): Promise<void>;
}
