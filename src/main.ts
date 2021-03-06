import { join } from 'path';
import { ValidationMongooseError } from './_common/exceptions/validation-excpetion-filter';
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
import fastifyHelmet from 'fastify-helmet';
import dotenv from 'dotenv';
import { env } from './_common/utils/env';
declare const module: any;
async function bootstrap() {
  const fastifyAdapter = new FastifyAdapter({ logger: true });
  fastifyAdapter.register(multer.contentParser);
  dotenv.config();
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
  );
  const options = new DocumentBuilder()
    .setTitle('🚀productive-family🚀')
    .setDescription('productive family API description')
    .setVersion('1.0')
    .addTag('client', 'client routes')
    .addTag('driver', 'driver endpoints')
    .addTag('provider', 'providers routes')
    .addTag('auth', 'routes related to authentication')
    .addTag('orders', 'all requests related to orders')
    .addTag('faq', 'frequently asked questions for app users')
    .addTag('reviews', 'reviews requests for providers or drivers')
    .addTag('providersAndDrivers', 'queries related to drivers providers')
    .addTag('verification', 'endpoint used to verify email, phone or a user')
    .addBearerAuth({
      type: 'apiKey',
      name: 'authorization',
      bearerFormat: 'Bearer token',
    })
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  // files must be served this way and not using server static module check comments
  app.useStaticAssets({ root: join(process.cwd(), 'public') });
  app.useGlobalInterceptors(new TransformInterceptor());
  // done this way so that default values could be set in DTO
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new MongoExceptionFilter(),
    new ValidationMongooseError(),
  );
  // used for securing the nestjs application
  env.NODE_ENV === 'production' && (await app.register(fastifyHelmet));
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
