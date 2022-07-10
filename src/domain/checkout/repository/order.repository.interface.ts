import { Order } from '../entity/Order';
import { RepositoryInterface } from '../../@shared/repository/repository.interface';

export interface OrderRepositoryInterface extends RepositoryInterface<Order> {
  // findByName(name: string): Promise<Order>;
}
