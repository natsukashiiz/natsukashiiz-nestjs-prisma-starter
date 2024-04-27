import { Injectable, HttpStatus } from '@nestjs/common';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Response, Request } from 'express';

@Injectable()
export class FilesService {
  constructor(private jwt: JwtStrategy) {}

  async findByName(name: string, token: string, res: Response) {
    if (!(await this.jwt.verify(token))) {
      res.status(HttpStatus.UNAUTHORIZED).end();
      return;
    }

    createReadStream(join(process.env.UPLOAD_DIR, name))
      .on('error', function () {
        res.status(HttpStatus.NOT_FOUND).end();
      })
      .once('data', function () {
        res.set('Content-Type', 'image/jpeg');
      })
      .on('data', function (chunk) {
        res.write(chunk);
      })
      .on('end', res.end.bind(res));
  }

  async uploadFile(file: string, req: Request) {
    return {
      link: `${req.protocol}://${req.get('Host')}/v1/files/${file}`,
      name: file,
    };
  }
}
