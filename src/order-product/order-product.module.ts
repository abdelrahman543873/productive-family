import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderProduct, OrderProductSchema } from './order-product.schema';
import { OrderProductRepository } from './order-product.repository';
import { OrderProductService } from './order-product.service';
import { OrderProductController } from './order-product.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OrderProduct.name, schema: OrderProductSchema },
    ]),
  ],
  controllers: [OrderProductController],
  providers: [OrderProductRepository, OrderProductService],
})
export class OrderProductModule {}
