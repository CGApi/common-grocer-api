import { Router } from 'express';
import { db } from '../utils/db';

const router = Router();

router.get('/', async (req, res) => {
  return res.status(200).json({
    up: true,
    dbConnected: !!(await db.consumer.findFirst()),
  });
});

export { router as healthRouter };
