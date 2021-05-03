import { Module } from '@nestjs/common';
import { FaqController } from './faq.controller';
import { FaqService } from './faq.service';
import { FaqRepository } from './faq.repository';
import { DataBaseModule } from '../shared/database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Faq, FaqSchema } from './models/faq.schema';

@Module({
  imports: [
    DataBaseModule,
    MongooseModule.forFeature([{ name: Faq.name, schema: FaqSchema }]),
  ],
  controllers: [FaqController],
  providers: [FaqService, FaqRepository],
})
export class FaqModule {}
