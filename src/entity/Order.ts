import { OrderItem } from './OrderItem';

export class Order {
  _id: string;
  _customer_id: string;
  _items: OrderItem[];

  constructor(id: string, customer_id: string, items: OrderItem[]) {
    this._id = id;
    this._customer_id = customer_id;
    this._items = items;
  }
}
