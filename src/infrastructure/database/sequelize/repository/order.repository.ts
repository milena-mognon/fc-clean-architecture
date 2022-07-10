import { Order } from '../../../../domain/checkout/entity/Order';
import { OrderItem } from '../../../../domain/entity/OrderItem';
import { OrderRepositoryInterface } from '../../../../domain/checkout/repository/order.repository.interface';
import { OrderItemModel } from '../model/order-item.model';
import { OrderModel } from '../model/order.model';

/**
 * O maior cuidado que deve ser tomado no repositorio
 * é a forma como o objeto vai ser montado novamente.
 */
export class OrderRepository implements OrderRepositoryInterface {
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

  update(entity: Order): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async find(id: string): Promise<Order> {
    let orderModel;
    try {
      orderModel = await OrderModel.findOne({
        where: { id },
        rejectOnEmpty: true,
        include: ['items'],
      });
    } catch (error) {
      throw new Error('Order not found');
    }

    const items = orderModel.items.map(item => {
      return new OrderItem(
        item.id,
        item.name,
        item.price,
        item.product_id,
        item.quantity,
      );
    });

    const order = new Order(id, orderModel.customer_id, items);

    return order;
  }

  findAll(): Promise<Order[]> {
    throw new Error('Method not implemented.');
  }
}
