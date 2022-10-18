import { db } from '../src/utils/db';

const seed = async () => {
  const localDevData = {
    name: 'Local Dev Consumer',
    key: 'valid-key',
  };
  await db.consumer.upsert({
    where: {
      key: 'valid-key',
    },
    update: { ...localDevData, permissions: { update: { getIngredient: true } } },
    create: { ...localDevData, permissions: { create: { getIngredient: true } } },
  });
};

seed();
