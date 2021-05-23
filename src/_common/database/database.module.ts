import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }),
  ],
})
export class DataBaseModule {}
