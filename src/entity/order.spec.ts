import { Order } from './Order';
import { OrderItem } from './OrderItem';

describe('Order unit test', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      let order = new Order('', '123', []);
    }).toThrowError('Id is required');
  });
  it('should throw error when customer_id is empty', () => {
    expect(() => {
      let order = new Order('123', '', []);
    }).toThrowError('Customer_id is required');
  });
  it('should throw error when items is empty', () => {
    expect(() => {
      let order = new Order('123', '123', []);
    }).toThrowError('Items are required');
  });
  it('should calculate total', () => {
    // arrange
    const item = new OrderItem('1', 'Item 1', 100);
    const item2 = new OrderItem('2', 'Item 2', 200);

    let order1 = new Order('123', '123', [item]);
    let order2 = new Order('321', '321', [item, item2]);

    // act
    const total1 = order1.total();
    const total2 = order2.total();

    // assert
    expect(total1).toBe(100);
    expect(total2).toBe(300);
  });
});
