import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './models/order.schema';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import mongoose from 'mongoose';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Order.name,
        useFactory: (): any => {
          const schema = OrderSchema;
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          // require('mongoose-auto-increment').initialize(mongoose.connection);
          // schema.plugin(require('mongoose-auto-increment').plugin, {
          //   model: 'Order',
          //   field: 'orderNumber',
          // });
          return schema;
        },
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderRepository, OrderService],
  exports: [OrderRepository],
})
export class OrderModule {}
