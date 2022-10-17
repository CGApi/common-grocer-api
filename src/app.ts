import express from 'express';
import { healthRouter } from './routers/health';

const app = express();

app.use('/health', healthRouter);

export { app };
