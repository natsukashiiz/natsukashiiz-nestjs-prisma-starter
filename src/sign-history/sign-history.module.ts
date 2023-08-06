import { Module } from '@nestjs/common';
import { SignHistoryService } from './sign-history.service';
import { SignHistoryController } from './sign-history.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SignHistoryController],
  providers: [SignHistoryService],
  exports: [SignHistoryService],
})
export class SignHistoryModule {}
