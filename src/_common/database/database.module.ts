import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import dotenv from 'dotenv';
import { MongoMemoryServer } from 'mongodb-memory-server';
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => {
        dotenv.config();
        if (process.env.MONGO_DB)
          return {
            uri: process.env.MONGO_DB,
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
          };
        const mongod = new MongoMemoryServer({
          autoStart: true,
        });
        const mongoUri = await mongod.getUri();
        return {
          uri: mongoUri,
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
