import { Module } from '@nestjs/common';
import { FaqModule } from './faq/faq.module';
import { DataBaseModule } from './shared/database/database.module';

@Module({
  imports: [DataBaseModule, FaqModule],
})
export class AppModule {}
