import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from '../utils/env';

@Module({
  imports: [
    MongooseModule.forRoot(
      env.RUN_INSIDE_DOCKER ? env.MONGO_DB : env.LOCAL_MONGO_DB,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
    ),
  ],
})
export class DataBaseModule {}
