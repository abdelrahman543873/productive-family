import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import { HttpExceptionFilter } from 'src/_common/exceptions/exception.filter';
import { TransformInterceptor } from 'src/_common/interceptors/response.interceptor';
import { Test, TestingModule } from '@nestjs/testing';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import * as multer from 'fastify-multer';
import { MongoExceptionFilter } from 'src/_common/exceptions/mongo-exception.filter';
import { ValidationMongooseError } from 'src/_common/exceptions/validation-excpetion-filter';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import dotenv from 'dotenv';

export let app: INestApplication;
// this is done this way to be able to inject repositories into factories
export const moduleRef = async (): Promise<TestingModule> => {
  return await Test.createTestingModule({
    imports: [AppModule],
    providers: [
      {
        provide: APP_INTERCEPTOR,
        useClass: TransformInterceptor,
      },
      {
        provide: APP_FILTER,
        useClass: HttpExceptionFilter,
      },
      {
        provide: APP_FILTER,
        useClass: MongoExceptionFilter,
      },
      {
        provide: APP_FILTER,
        useClass: ValidationMongooseError,
      },
    ],
  }).compile();
};
// to be imported for making requests

beforeAll(async () => {
  jest.setTimeout(1000000);
  const module = await moduleRef();
  const fastifyAdapter = new FastifyAdapter();
  fastifyAdapter.register(multer.contentParser);
  dotenv.config();
  app = module.createNestApplication<NestFastifyApplication>(fastifyAdapter);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.init();
  await app
    .getHttpAdapter()
    .getInstance()
    .ready();
});

afterAll(async () => {
  await app.close();
});
