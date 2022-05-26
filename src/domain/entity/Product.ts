export class Product {
  private _id: string;
  private _name: string;
  private _price: number;

  constructor(id: string, _name: string, _price: number) {
    this._id = id;
    this._name = _name;
    this._price = _price;
    this.validate();
  }

  validate(): boolean {
    if (this._id.length === 0) {
      throw new Error('Id is required');
    }
    if (this._name.length === 0) {
      throw new Error('Name is required');
    }
    if (this._price < 0) {
      throw new Error('Price must be greater than 0');
    }
    return true;
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
    return this._price;
  }
}
