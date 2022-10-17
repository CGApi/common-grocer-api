import { Router } from 'express';

const router = Router();

router.get('/', (req, res, next) => {
  return res.status(200).json({
    up: true,
    dbConnected: false,
  });
});

export { router as healthRouter };
