import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ProductDiscount,
  ProductDiscountSchema,
} from './models/product-discount.schema';
import { ProductDiscountRepository } from './product-discount.repository';
import { ProductDiscountService } from './product-discount.service';
import { ProductDiscountController } from './product-discount.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductDiscount.name, schema: ProductDiscountSchema },
    ]),
  ],
  controllers: [ProductDiscountController],
  providers: [ProductDiscountRepository, ProductDiscountService],
})
export class ProductDiscountModule {}
