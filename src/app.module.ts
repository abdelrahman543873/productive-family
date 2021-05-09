import { Module } from '@nestjs/common';
import { FaqModule } from './faq/faq.module';
import { DataBaseModule } from './shared/database/database.module';
import { UserModule } from './user/user.module';
import { HelperModule } from './shared/helper/helper.module';
import { ConfigModule } from '@nestjs/config';
import { DriverModule } from './driver/driver.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DataBaseModule,
    HelperModule,
    UserModule,
    FaqModule,
    DriverModule,
  ],
})
export class AppModule {}
