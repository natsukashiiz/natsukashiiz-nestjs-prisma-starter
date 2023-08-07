import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class AppController {
  @Get()
  init() {
    return {
      title: 'NestJS 101',
      description: 'NestJS 101',
      version: '1.0.0',
      document: '/document',
    };
  }
}
