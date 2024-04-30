import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { HealthController } from './health.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RedisHealthIndicator } from './redis.health';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [TerminusModule, HttpModule, PrismaModule, RedisModule],
  controllers: [HealthController],
  providers: [RedisHealthIndicator],
})
export class HealthModule {}
