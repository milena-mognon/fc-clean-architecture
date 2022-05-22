import { Address } from './entity/address';
import { Customer } from './entity/customer';
import { Order } from './entity/Order';
import { OrderItem } from './entity/OrderItem';

// Isso é um agregado (Customer e Address)
let custumer = new Customer('123', 'Milena Mognon');

const address = new Address('Rua 1', 111, '88900-020', 'Guarapuava');

custumer.address = address;

custumer.activate();
//

// Isso é um agregado (Order e OrderItems)
const item1 = new OrderItem('1', 'Produto 1', 100, 'p1', 100);
const item2 = new OrderItem('2', 'Produto 2', 200, 'p2', 200);

const order = new Order('1', '123', [item1, item2]);
//
