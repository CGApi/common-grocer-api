import express from 'express';
import { healthRouter } from './routers/health';
import { environment } from './utils/environment';

export const getApp = async () => {  
  const app = express();
  environment.loadEnv();
  
  app.use('/health', healthRouter);

  return app;
};
