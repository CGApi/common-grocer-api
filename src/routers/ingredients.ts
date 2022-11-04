import { Router } from 'express';

const router = Router();

router.use((req, res, next) => {
  if (!req.consumer.permissions.getIngredient) {
    return res.status(401).json({ msg: 'this API key is not setup to access this route' });
  }

  return next();
});

router.get('/', (req, res) => {
  return res.sendStatus(200);
});

export { router as ingredientsRouter };
