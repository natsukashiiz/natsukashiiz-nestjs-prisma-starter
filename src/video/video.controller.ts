import {
  Controller,
  Get,
  Param,
  Res,
  Headers,
  HttpStatus,
  Header,
} from '@nestjs/common';
import { createReadStream, existsSync, statSync } from 'fs';
import { Response } from 'express';

@Controller('/v1/video')
export class VideoController {
  @Get('/stream/:id')
  @Header('Accept-Ranges', 'bytes')
  @Header('Content-Type', 'video/mp4')
  async getStreamVideo(
    @Param('id') id: string,
    @Headers() headers,
    @Res() res: Response,
  ) {
    const videoPath = `assets/video/${id}.mp4`;
    if (!existsSync(videoPath)) {
      return res
        .setHeader('Content-Type', 'text/html')
        .status(HttpStatus.NOT_FOUND)
        .send('Please add file to directory /assets/video');
    }

    const { size } = statSync(videoPath);
    const videoRange = headers.range;
    if (videoRange) {
      const parts = videoRange.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : size - 1;
      const chunkSize = end - start + 1;
      const readStreamfile = createReadStream(videoPath, {
        start,
        end,
        highWaterMark: 1024 * 1024 * 1,
      });
      res.writeHead(HttpStatus.PARTIAL_CONTENT, {
        'Content-Range': `bytes ${start}-${end}/${size}`,
        'Content-Length': chunkSize,
      });
      readStreamfile.pipe(res);
    } else {
      res.writeHead(HttpStatus.OK, {
        'Content-Length': size,
        'Content-Type': 'video/mp4',
      });
      createReadStream(videoPath).pipe(res);
    }
  }
}
