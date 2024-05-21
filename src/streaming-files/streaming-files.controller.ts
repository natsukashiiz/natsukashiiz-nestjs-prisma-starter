import { Controller, Get, Header, StreamableFile } from '@nestjs/common';
import { join } from 'path';
import { createReadStream } from 'fs';

@Controller('/v1/streaming-files')
export class StreamingFilesController {
  @Get()
  @Header('Content-Type', 'application/json')
  @Header('Content-Disposition', 'attachment; filename="package.json"')
  getFile(): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'package.json'));
    return new StreamableFile(file);
  }
}
