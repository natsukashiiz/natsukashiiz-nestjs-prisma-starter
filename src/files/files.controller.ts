import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FilesService } from './files.service';
import { Request, Response } from 'express';
import { SharpPipe } from './sharp.pipe';

@Controller('/v1/files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get(':name')
  findByName(
    @Param('name') name: string,
    @Query('token') token: string,
    @Res() res: Response,
  ) {
    return this.filesService.findByName(name, token, res);
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtAuthGuard)
  uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'image',
        })
        .addMaxSizeValidator({
          maxSize: 1024 * 1024 * 10,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
      SharpPipe,
    )
    file: string,
    @Req() req: Request,
  ) {
    return this.filesService.uploadFile(file, req);
  }
}
