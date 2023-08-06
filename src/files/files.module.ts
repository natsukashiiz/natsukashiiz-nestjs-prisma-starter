import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Module({
  imports: [
    AuthModule,
    MulterModule.register({
      storage: memoryStorage(),
    }),
  ],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
