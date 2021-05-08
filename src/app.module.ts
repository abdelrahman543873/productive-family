import { Module } from '@nestjs/common';
import { FaqModule } from './faq/faq.module';
import { DataBaseModule } from './shared/database/database.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [DataBaseModule, UserModule, FaqModule],
})
export class AppModule {}
