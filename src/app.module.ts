import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FaqModule } from './faq/faq.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => {
        return {
          uri:
            'mongodb://bodi:Vindiesel33$@cluster0-shard-00-00.dd7up.mongodb.net:27017,cluster0-shard-00-01.dd7up.mongodb.net:27017,cluster0-shard-00-02.dd7up.mongodb.net:27017/test?replicaSet=atlas-nls3wr-shard-0&ssl=true&authSource=admin',
          useNewUrlParser: true,
          useCreateIndex: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
        };
      },
    }),
    FaqModule,
  ],
})
export class AppModule {}
