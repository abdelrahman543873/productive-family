import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './_common/exceptions/exception.filter';
import { TransformInterceptor } from './_common/interceptors/response.interceptor';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import * as multer from 'fastify-multer';
import { MongoExceptionFilter } from './_common/exceptions/mongo-exception.filter';

async function bootstrap() {
  const fastifyAdapter = new FastifyAdapter();
  fastifyAdapter.register(multer.contentParser);

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
  );
  const options = new DocumentBuilder()
    .setTitle('🚀productive-family🚀')
    .setDescription('productive family API description')
    .setVersion('1.0')
    .addTag('faq', 'frequently asked questions for app users')
    .addTag('driver', 'driver endpoints')
    .addTag('verification', 'endpoint used to verify email, phone or a user')
    .addTag('reviews', 'reviews requests for providers or drivers')
    .addBearerAuth({
      type: 'apiKey',
      name: 'authorization',
      bearerFormat: 'Bearer token',
    })
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  app.useGlobalInterceptors(new TransformInterceptor());
  // done this way so that default values could be set in DTO
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter(), new MongoExceptionFilter());
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
