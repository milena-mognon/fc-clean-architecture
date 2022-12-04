import express from 'express';
import { Sequelize } from 'sequelize-typescript';
import { CustomerModel } from '../customer/repository/sequelize/models/customer.model';
import { ProductModel } from '../product/repository/models/product.model';
import { customerRoutes } from './routes/customer.routes';
import { productRoutes } from './routes/product.routes';

export const app = express();

app.use(express.json());

export let sequilize: Sequelize;

async function setupDb() {
  sequilize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  });

  sequilize.addModels([CustomerModel, ProductModel]);

  await sequilize.sync();
}

setupDb();

app.use('/customer', customerRoutes);
app.use('/product', productRoutes);
