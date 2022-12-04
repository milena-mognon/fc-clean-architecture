import Entity from '../../@shared/entity/entity.abstract';
import { NotificationError } from '../../@shared/notification/notification.error';
import { OrderItem } from './OrderItem';

export class Order extends Entity {
  private _customer_id: string;
  private _items: OrderItem[];
  private _total: number;

  constructor(id: string, customer_id: string, items: OrderItem[]) {
    super();
    this._id = id;
    this._customer_id = customer_id;
    this._items = items;
    this._total = this.total();
    this.validate();

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  get customer_id(): string {
    return this._customer_id;
  }

  get items(): OrderItem[] {
    return this._items;
  }

  total(): number {
    return this._items.reduce((acc, item) => acc + item.subTotal(), 0);
  }

  validate(): boolean {
    if (this._id.length === 0) {
      this.notification.addError({
        message: 'Id is required',
        context: 'order',
      });
    }
    if (this._customer_id.length === 0) {
      this.notification.addError({
        message: 'Customer_id is required',
        context: 'order',
      });
    }
    if (this._items.length === 0) {
      this.notification.addError({
        message: 'Items are required',
        context: 'order',
      });
    }
    if (this._items.some(item => item.quantity <= 0)) {
      this.notification.addError({
        message: 'Item quantity must be greater than 0',
        context: 'order',
      });
    }

    return true;
  }

  addItem(item: OrderItem) {
    return this.items.push(item);
  }
}
