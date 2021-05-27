import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import dotenv from 'dotenv';
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => {
        dotenv.config();
        return {
          uri: process.env.MONGO_DB || global['__MONGO_URI__'] || process.env.LOCAL_MONGO_DB,
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
