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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('/v1/files')
@ApiTags('Files')
@ApiInternalServerErrorResponse({
  description: 'Internal server error.',
})
@ApiUnauthorizedResponse({
  description: 'Unauthorized',
})
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get(':fileName')
  @ApiOperation({ summary: 'Get file by name' })
  @ApiOkResponse({
    description: 'Get file successfully',
  })
  findByName(
    @Param('fileName') fileName: string,
    @Query('token') token: string,
    @Res() res: Response,
  ) {
    return this.filesService.findByName(fileName, token, res);
  }

  @Post('/upload')
  @ApiOperation({ summary: 'Upload file' })
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Upload file successfully',
  })
  @ApiBadRequestResponse({
    description: 'Invalid file type (image) or file size (max 10MB)',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
    required: true,
    description: 'file image',
  })
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
          errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        }),
      SharpPipe,
    )
    file: string,
    @Req() req: Request,
  ) {
    return this.filesService.uploadFile(file, req);
  }
}
