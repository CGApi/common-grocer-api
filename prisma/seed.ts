import { db } from '../src/utils/db';

const seed = async () => {
  await db.consumer.create({
    data: {
      name: 'Local Dev Consumer',
      key: 'valid-key',
    }
  });
};

seed();
