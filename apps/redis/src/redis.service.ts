// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class RedisService {
//   getHello(): string {
//     return 'Hello World!';
//   }
// }


import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { REDIS_CLIENT } from './redis-client.type';
import { Redis, RedisKey, RedisValue } from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  public constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {}

  ping() {
    return this.redis.ping();
  }

  async get(key: RedisKey) {
    return await this.redis.get(key);
  }

  /**
   * Set key in redis
   * @param key
   * @param value
   * @param expiry expiry in minutes, default 30 days
   * @returns
   */
  async set(key: RedisKey, value: RedisValue, expiry = 20) {
    return await this.redis.set(key, value, 'EX', expiry * 60);
  }

  async delete(key: RedisKey) {
    return await this.redis.del(key);
  }

  onModuleDestroy() {
    this.redis.quit();
  }
}
