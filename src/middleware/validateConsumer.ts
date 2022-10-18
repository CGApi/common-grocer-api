import { NextFunction, Request, Response } from 'express';
import { db } from '../utils/db';

export const validateConsumer = async (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'];
  if (typeof apiKey !== 'string') {
    return res.status(401).json({ msg: 'x-api-key header is required' });
  }

  const consumer = await db.consumer.findFirst({ where: { key: apiKey }, include: { permissions: true } });
  if (!consumer) {
    return res.status(401).json({ msg: `Consumer not found for provided API key (${apiKey})` });
  }

  if (!consumer.permissions) {
    return res.status(401).json({ msg: `Consumer priveleges not setup for provided API key (${apiKey})` });
  }

  req.consumer = consumer as any;
  return next();
};
