import { INestApplication, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { HttpExceptionFilter } from 'src/shared/exceptions/exception.filter';
import { TransformInterceptor } from 'src/shared/interceptors/response.interceptor';
import { Test, TestingModule } from '@nestjs/testing';

//this is done this way to be able to inject repos into factories
export const moduleRef = async (): Promise<TestingModule> => {
  return await Test.createTestingModule({
    imports: [AppModule],
    providers: [
      { provide: APP_FILTER, useClass: HttpExceptionFilter },
      { provide: APP_PIPE, useClass: ValidationPipe },
      {
        provide: APP_INTERCEPTOR,
        useClass: TransformInterceptor,
      },
    ],
  }).compile();
};
// to be imported for making requests
export let app: INestApplication;

beforeAll(async () => {
  jest.setTimeout(50000);
  const module = await moduleRef();
  app = module.createNestApplication();
  await app.init();
});

afterAll(async done => {
  done();
});
