import { ValidatorInterface } from '../../@shared/validator/validator.interface';
import { ProductInterface } from '../entity/product.interface';
import { ProductYupValidator } from '../validator/product.yup.validator';

export class ProductValidatorFactory {
  static create(): ValidatorInterface<ProductInterface> {
    const options = {
      yup: ProductYupValidator,
      // add other if needed, can be defined with env variable
    };
    return new options['yup']();
  }
}
