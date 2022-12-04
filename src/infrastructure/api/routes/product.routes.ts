import { Router } from 'express';
import { CreateProductUseCase } from '../../../usecase/product/create/create.product.usecase';
import { FindProductUseCase } from '../../../usecase/product/find/find.product.usecase';
import { ListProductUseCase } from '../../../usecase/product/list/list.product.usecase';
import { ProductRepository } from '../../product/repository/product.repository';
import createProductController from '../controllers/product/create.product.controller';
import findProductController from '../controllers/product/find.product.controller';
import listProductController from '../controllers/product/list.product.controller';

export const productRoutes = Router();

productRoutes.post('/', createProductController.handle);

productRoutes.get('/', listProductController.handle);

productRoutes.get('/:id', findProductController.handle);
