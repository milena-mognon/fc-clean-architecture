import Entity from '../../@shared/entity/entity.abstract';
import { ProductValidatorFactory } from '../factory/product.validator.factory';
import { ProductInterface } from './product.interface';

export class ProductB extends Entity implements ProductInterface {
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    super();
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();
  }

  validate() {
    ProductValidatorFactory.create().validate(this);
  }

  changePrice(price: number) {
    this._price = price;
  }

  changeName(name: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price * 2;
  }
}
