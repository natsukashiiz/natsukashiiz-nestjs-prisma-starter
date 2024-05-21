import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { Controller, Post } from '@nestjs/common';

@Controller('/v1/media')
export class AudioController {
  constructor(
    @InjectQueue('audio') private readonly audioQueue: Queue,
    @InjectQueue('video') private readonly videoQueue: Queue,
  ) {}

  @Post('/transcode/audio')
  transcodeAudio() {
    return this.audioQueue.add('audio-job', {
      file: 'audio.mp3',
    });
  }

  @Post('/transcode/audio/repeat')
  transcodeAudioRepeat() {
    return this.audioQueue.add(
      'audio-job',
      {
        file: 'audio.mp3',
      },
      // Repeat job every 10 seconds for 5 times
      { repeat: { every: 2000, limit: 2 } },
    );
  }

  @Post('/transcode/video')
  transcodeVideo() {
    return this.videoQueue.add('video-job', {
      file: 'video.mp4',
    });
  }
}
