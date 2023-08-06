import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { UsersModule } from 'src/users/users.module';
import { GatewayModule } from 'src/gateway/gateway.module';

@Module({
  imports: [UsersModule, GatewayModule],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
