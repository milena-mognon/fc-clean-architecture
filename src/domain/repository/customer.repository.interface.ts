import { Customer } from '../entity/customer';
import { RepositoryInterface } from './repository.interface';

export interface CustomerRepositoryInterface
  extends RepositoryInterface<Customer> {
  // findByName(name: string): Promise<Customer>;
}
