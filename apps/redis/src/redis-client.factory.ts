import { FactoryProvider } from '@nestjs/common';
import { REDIS_CLIENT } from './redis-client.type';
import Redis from 'ioredis';

export const redisClientFactory: FactoryProvider<Promise<Redis>> = {
  provide: REDIS_CLIENT,
  useFactory: async () => {
    const client = new Redis({
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT),
    });
    return client;
  },
};