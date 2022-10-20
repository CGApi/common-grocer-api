import { expect, it, describe, afterAll } from 'vitest';
import { db } from '../src/utils/db';
import { environment } from '../src/utils/environment';

describe('GET /', () => {
  const url = `http://localhost:${environment.port()}/ingredients`;
  const consumersToCleanup: string[] = [];

  afterAll(async () => {
    await db.consumer.deleteMany({ where: { key: { in: consumersToCleanup } } });
  });

  it('returns a 401 response when the x-api-key header is missing', async () => {
    const res = await fetch(url);
    const body = await res.json();
    expect(res.status).toBe(401);
    expect(body).toEqual({ msg: 'x-api-key header is required' });
  });

  it('returns a 401 when the api key is not found', async () => {
    const res = await fetch(url, { headers: { 'x-api-key': 'invalid' } });
    const body = await res.json();
    expect(res.status).toBe(401);
    expect(body).toEqual({ msg: 'Consumer not found for provided API key (invalid)' });
  });

  it('returns a 401 when the consumer is not valid', async () => {
    const key = new Date().getTime().toString();
    await db.consumer.create({ data: { name: 'api-test-consumer', key, status: 'revoked' } });
    consumersToCleanup.push(key);
    const res = await fetch(url, { headers: { 'x-api-key': key } });
    const body = await res.json();
    expect(res.status).toBe(401);
    expect(body).toEqual({ msg: 'Consumer is not in good standing. Please contact admin to understand why.', consumerStatus: 'revoked' });
  });

  it('returns a 401 when the api key is valid but the consumer is missing permissions', async () => {
    const key = new Date().getTime().toString();
    await db.consumer.create({ data: { name: 'api-test-consumer', key } });
    consumersToCleanup.push(key);
    const res = await fetch(url, { headers: { 'x-api-key': key } });
    const body = await res.json();
    expect(res.status).toBe(401);
    expect(body).toEqual({ msg: `Consumer permissions not setup for provided API key (${key})` });
  });
});
