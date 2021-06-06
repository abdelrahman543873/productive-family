import { Discount, DiscountSchema } from './models/discount.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DiscountRepository } from './driver.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Discount.name, schema: DiscountSchema },
    ]),
  ],
  providers: [DiscountRepository],
  exports: [DiscountRepository],
})
export class DiscountModule {}
