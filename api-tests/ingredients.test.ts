import { expect, it, describe, afterAll } from 'vitest';
import { db } from '../src/utils/db';
import { environment } from '../src/utils/environment';

describe('GET /', () => {
  const url = `http://localhost:${environment.port()}/ingredients`;
  const consumersToCleanup: string[] = [];

  afterAll(async () => {
    await db.consumer.deleteMany({ where: { key: { in: consumersToCleanup } } });
  });

  it('returns a 401 response when the consumer is missing the getIngredients permission', async () => {
    const key = new Date().getTime().toString();
    await db.consumer.create({
      data: {
        name: 'test-no-ingredient-priv',
        key,
        permissions: {
          create: {
            getIngredient: false
          }
        }
      }
    });
    consumersToCleanup.push(key);
    const res = await fetch(url, { headers: { 'x-api-key': key } });
    const body = await res.json();
    expect(res.status).toBe(401);
    expect(body).toEqual({ msg: 'this API key is not setup to access this route' });
  });

  it('returns a 200 when consumer is allowed access', async () => {
    const res = await fetch(url, { headers: { 'x-api-key': 'valid-key' } });
    expect(res.status).toBe(200);
  });

});
