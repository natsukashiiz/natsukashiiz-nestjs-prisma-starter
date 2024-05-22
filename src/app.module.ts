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
import { VideoModule } from './video/video.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    RedisModule,
    UsersModule,
    AuthModule,
    ProfileModule,
    SignHistoryModule,
    FilesModule,
    GatewayModule,
    VideoModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
