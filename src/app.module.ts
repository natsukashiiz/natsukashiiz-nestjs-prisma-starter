import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { SignHistoryModule } from './sign-history/sign-history.module';
import { FilesModule } from './files/files.module';
import { RedisModule } from './redis/redis.module';
import { GatewayModule } from './gateway/gateway.module';
import { AppController } from './app.controller';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    AuthModule,
    ProfileModule,
    UsersModule,
    SignHistoryModule,
    FilesModule,
    RedisModule,
    GatewayModule,
    HealthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
