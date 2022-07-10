import { Sequelize } from 'sequelize-typescript';
import { Address } from '../../../../domain/entity/address';
import { Customer } from '../../../../domain/entity/customer';
import { Order } from '../../../../domain/checkout/entity/Order';
import { OrderItem } from '../../../../domain/entity/OrderItem';
import { Product } from '../../../../domain/product/entity/Product';
import { CustomerModel } from '../model/customer.model';
import { OrderItemModel } from '../model/order-item.model';
import { OrderModel } from '../model/order.model';
import { ProductModel } from '../model/product.model';
import { CustomerRepository } from './customer.repository';
import { OrderRepository } from './order.repository';
import { ProductRepository } from './product.repository';
describe('Order Repository test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a new Order', async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer('c1', 'Customer 1');
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1');
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const productRepository = new ProductRepository();

    const product = new Product('p1', 'Product 1', 10);

    await productRepository.create(product);

    const orderItem = new OrderItem(
      'oi1',
      product.name,
      product.price,
      product.id,
      2,
    );

    const order = new Order('o1', 'c1', [orderItem]);
    const orderRepository = new OrderRepository();

    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: 'o1',
      customer_id: 'c1',
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: 'o1',
          product_id: orderItem.product_id,
        },
      ],
    });
  });

  it('should find an Order', async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer('c1', 'Customer 1');
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1');
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const productRepository = new ProductRepository();

    const product = new Product('p1', 'Product 1', 10);

    await productRepository.create(product);

    const orderItem = new OrderItem(
      'oi1',
      product.name,
      product.price,
      product.id,
      2,
    );

    const order = new Order('o1', 'c1', [orderItem]);
    const orderRepository = new OrderRepository();

    await orderRepository.create(order);

    const foundOrder = await orderRepository.find('o1');

    expect(order).toStrictEqual(foundOrder);
  });

  it('should throw an error when order is not found', () => {
    const orderRepository = new OrderRepository();

    expect(async () => {
      await orderRepository.find('43562');
    }).rejects.toThrow('Order not found');
  });
});
