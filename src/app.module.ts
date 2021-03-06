import { ProductModule } from './product/product.module';
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
import { ProviderDriverModule } from './provider-driver/provider-driver.module';
import { OrderProductModule } from './order-product/order-product.module';
import { AuthModule } from './_common/auth/auth.module';
import { CategoryModule } from './category/category.module';
import { UnitModule } from './unit/unit.module';
import { ProductUnitModule } from './product-unit/product-unit.module';
import { ProductDiscountModule } from './product-discount/product-discount.module';
import { CartModule } from './cart/cart.module';
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
    AuthModule,
    DriverModule,
    OrderModule,
    PaymentModule,
    AddressModule,
    DiscountModule,
    ProviderModule,
    ProviderDriverModule,
    ProductModule,
    OrderProductModule,
    CategoryModule,
    UnitModule,
    ProductUnitModule,
    ProductDiscountModule,
    CartModule
  ],
})
export class AppModule {}
