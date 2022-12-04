import express from 'express';
import { Sequelize } from 'sequelize-typescript';
import { CustomerModel } from '../customer/repository/sequelize/models/customer.model';
import { customerRoutes } from './routes/customer.routes';

export const app = express();

app.use(express.json());

export let sequilize: Sequelize;

async function setupDb() {
  sequilize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  });

  sequilize.addModels([CustomerModel]);

  await sequilize.sync();
}

setupDb();

app.use('/customer', customerRoutes);
