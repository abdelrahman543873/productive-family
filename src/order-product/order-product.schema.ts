import { Document } from 'mongoose';
import { ObjectID } from 'mongodb';
import { SchemasEnum } from '../_common/app.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Point } from 'src/_common/spatial-schemas/point.schema';
import { Order } from '../order/models/order.schema';
import { Product } from '../product/models/product.schema';

export type OrderProductDocument = OrderProduct & Document;

@Schema({ versionKey: false })
export class OrderProduct {
  @Prop({ type: ObjectID, ref: SchemasEnum.Order, required: true })
  order: ObjectID | Order;

  @Prop({ type: ObjectID, ref: SchemasEnum.Product, required: true })
  product: ObjectID | Product;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  amount: number;

  @Prop({ type: Point, index: '2dsphere' })
  providerLocation: Point;
}

export const OrderProductSchema = SchemaFactory.createForClass(OrderProduct);
