import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { AudioController } from './audio.controller';
import { AudioConsumer, VideoConsumer } from './audio.processor';

@Module({
  imports: [
    BullModule.registerQueueAsync(
      {
        name: 'audio',
      },
      {
        name: 'video',
      },
    ),
  ],
  controllers: [AudioController],
  providers: [AudioConsumer, VideoConsumer],
})
export class AudioModule {}
