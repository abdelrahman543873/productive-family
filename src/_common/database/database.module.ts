import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import dotenv from 'dotenv';
import { env } from '../utils/env';
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => {
        dotenv.config();
        return {
          uri: process.env.MONGO_DB || env.LOCAL_MONGO_DB,
          useNewUrlParser: true,
          useCreateIndex: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
        };
      },
    }),
  ],
})
export class DataBaseModule {}
