import { Injectable, PipeTransform } from '@nestjs/common';
import * as path from 'path';
import * as sharp from 'sharp';

@Injectable()
export class SharpPipe
  implements PipeTransform<Express.Multer.File, Promise<string>>
{
  async transform(image: Express.Multer.File): Promise<string> {
    const randomName = Math.random().toString(36).substring(2, 15);
    const filename = Date.now() + '_' + randomName;

    await sharp(image.buffer)
      .resize(800)
      .webp({ effort: 3 })
      .toFile(path.join(process.env.UPLOAD_DIR, filename));

    return filename;
  }
}
