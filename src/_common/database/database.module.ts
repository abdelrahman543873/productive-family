import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from '../utils/env';

@Module({
  imports: [
    MongooseModule.forRoot(env.MONGO_DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }),
  ],
})
export class DataBaseModule {}
