import { Module } from '@nestjs/common';
import { FaqModule } from './faq/faq.module';
import { DataBaseModule } from './_common/database/database.module';
import { HelperModule } from './_common/helper/helper.module';
import { ConfigModule } from '@nestjs/config';
import { DriverModule } from './driver/driver.module';
import { VerificationModule } from './verification/verification.module';
import { AdminModule } from './admin/admin.module';
import { ReviewModule } from './review/review.module';
import { ClientModule } from './client/client.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DataBaseModule,
    HelperModule,
    VerificationModule,
    ReviewModule,
    ClientModule,
    AdminModule,
    FaqModule,
    DriverModule,
    OrderModule,
  ],
})
export class AppModule {}
