import { ValidatorInterface } from '../../@shared/validator/validator.interface';
import { Customer } from '../entity/customer';
import { CustomerYupValidator } from '../validator/customer.yup.validator';

export class CustomerValidatorFactory {
  static create(): ValidatorInterface<Customer> {
    const options = {
      yup: CustomerYupValidator,
      // add other if needed, can be defined with env variable
    };
    return new options['yup']();
  }
}
