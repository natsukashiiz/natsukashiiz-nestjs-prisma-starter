import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerPath = process.env.SWAGGER_PATH || 'document';
  const config = new DocumentBuilder()
    .setTitle('NestJS 101 API')
    .setDescription('NestJS 101 API description')
    .setVersion('1.0')
    .addTag('NestJS 101')
    .setExternalDoc('JSON', `${swaggerPath}-json`)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swaggerPath, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
