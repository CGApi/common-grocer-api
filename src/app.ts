import express from 'express';
import { validateConsumer } from './middleware/validateConsumer';
import { healthRouter } from './routers/health';
import { ingredientsRouter } from './routers/ingredients';
import { environment } from './utils/environment';

export const getApp = async () => {  
  const app = express();
  environment.loadEnv();
  
  app.use('/health', healthRouter);
  app.use(validateConsumer);
  app.use('/ingredients', ingredientsRouter);

  return app;
};
