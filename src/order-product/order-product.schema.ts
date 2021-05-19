import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectID } from 'mongodb';

export type OrderProductDocument = OrderProduct & Document;

@Schema({ versionKey: false, _id: false })
export class OrderProduct {
  @Prop({ type: ObjectID, ref: 'Order', required: true })
  order: ObjectID;

  @Prop({ type: ObjectID, ref: 'Product', required: true })
  product: ObjectID;
}

export const OrderProductSchema = SchemaFactory.createForClass(OrderProduct);
