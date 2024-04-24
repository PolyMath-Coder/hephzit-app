import { Module } from '@nestjs/common';
import { RedisController } from './redis.controller';
import { RedisService } from './redis.service';
import { redisClientFactory } from './redis-client.factory';

@Module({
  imports: [],
  controllers: [RedisController],
  providers: [RedisService, redisClientFactory],
})
export class RedisModule {}
