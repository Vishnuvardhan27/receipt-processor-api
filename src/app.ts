import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import receiptRoutes from './routes/receipt.routes';

export function createApp(): Application {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  app.use('/receipts', receiptRoutes);

  return app;
}
