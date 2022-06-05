import { Order } from '../../../../domain/entity/Order';
import { OrderItemModel } from '../model/order-item.model';
import { OrderModel } from '../model/order.model';

/**
 * O maior cuidado que deve ser tomado no repositorio
 * é a forma como o objeto vai ser montado novamente.
 */
export class OrderRepository {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customer_id,
        total: entity.total(),
        items: entity.items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          product_id: item.product_id,
        })),
      },
      { include: [{ model: OrderItemModel }] },
    );
  }

  // async update(entity: Customer): Promise<void> {

  // }

  // async find(id: string): Promise<Customer> {

  // }

  // async findAll(): Promise<Customer[]> {

  // }
}
