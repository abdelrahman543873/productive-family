import { Module } from '@nestjs/common';
import { FaqModule } from './faq/faq.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, FaqModule],
})
export class AppModule {}
