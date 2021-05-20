import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderProduct, OrderProductSchema } from './order-product.schema';
import { OrderProductRepository } from './order-product.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OrderProduct.name, schema: OrderProductSchema },
    ]),
  ],
  providers: [OrderProductRepository],
})
export class OrderProductModule {}
