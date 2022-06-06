export class OrderItem {
  private _id: string;
  private _product_id: string;
  private _name: string;
  private _price: number;
  private _quantity: number;

  constructor(
    id: string,
    name: string,
    price: number,
    product_id: string,
    quantity: number,
  ) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._product_id = product_id;
    this._quantity = quantity;
    this.validate();
  }
  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get product_id(): string {
    return this._product_id;
  }

  validate() {
    if (this._quantity <= 0) {
      throw new Error('Item quantity must be greater than 0');
    }
    return true;
  }

  get quantity(): number {
    return this._quantity;
  }

  get price(): number {
    return this._price;
  }

  subTotal(): number {
    return this._price * this._quantity;
  }
}
