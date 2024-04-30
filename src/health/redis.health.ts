import { Injectable } from '@nestjs/common';
import {
  HealthIndicator,
  HealthIndicatorResult,
  HealthCheckError,
} from '@nestjs/terminus';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class RedisHealthIndicator extends HealthIndicator {
  constructor(private readonly redisService: RedisService) {
    super();
  }

  async isHealthy(): Promise<HealthIndicatorResult> {
    const isHealthy = await this.redisService.isConnected();
    const result = this.getStatus('redis', isHealthy);

    if (isHealthy) {
      return result;
    }

    throw new HealthCheckError('Redis failed', result);
  }
}
