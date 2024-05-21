import { Job } from 'bull';
import { OnGlobalQueueCompleted, Process, Processor } from '@nestjs/bull';

@Processor('audio')
export class AudioConsumer {
  @Process('audio-job')
  async handleTranscode(job: Job) {
    console.log(`[JobId:${job.id}]. Start audio compress into mp3...`);
    console.log(job.data);
    let progress = 0;
    for (let i = 0; i < 100; i++) {
      await this.doSomething('audio', job, i);
      progress += 1;
      await job.progress(progress);
    }
  }

  @OnGlobalQueueCompleted({ name: 'audio-job' })
  onGlobalCompleted(job: Job) {
    console.log(`[JobId:${job.id}]. Audio compress completed!!`);
  }

  async doSomething(jobName: string, job: Job, progress: number) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log(
          `[JobId:${job.id}]. ${jobName} is in progress: ${progress + 1}%`,
        );
        resolve();
      }, 50);
    });
  }
}

@Processor('video')
export class VideoConsumer {
  @Process('video-job')
  handleTransvideo(job: Job) {
    console.log('Start vidoe compress into mp4...');
    console.log(job.data);
    console.log('video compress completed!!');
  }
}
