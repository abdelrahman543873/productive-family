import { AddressModule } from './address/address.module';
import { PaymentModule } from './payment/payment.module';
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
import { DiscountModule } from './discount/discount.module';
import { ProviderModule } from './provider/provider.module';

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
    PaymentModule,
    AddressModule,
    DiscountModule,
    ProviderModule,
  ],
})
export class AppModule {}
