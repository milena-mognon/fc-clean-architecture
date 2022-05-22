export class OrderItem {
  private _id: string;
  private _name: string;
  private _price: number;

  constructor(id: string, _name: string, _price: number) {
    this._id = id;
    this._name = _name;
    this._price = _price;
  }

  get price(): number {
    return this._price;
  }
}
