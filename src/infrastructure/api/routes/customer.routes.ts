import { Router } from 'express';
import createCustomerController from '../controllers/customer/create.customer.controller';
import findCustomerController from '../controllers/customer/find.customer.controller';
import listCustomerController from '../controllers/customer/list.customer.controller';

export const customerRoutes = Router();

customerRoutes.post('/', createCustomerController.handle);

customerRoutes.get('/', listCustomerController.handle);

customerRoutes.get('/:id', findCustomerController.handle);
