import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { getValuesFromEnum } from '../../_common/utils/column-enum';
import { ObjectID } from 'mongodb';
import { OrderEnum } from '../order.enum';

export type OrderDocument = Order & Document;

@Schema({ versionKey: false })
export class Order {
  _id?: ObjectID;

  @Prop({ type: ObjectID, ref: 'Client', required: true })
  client: ObjectID;

  @Prop({ type: [{ type: ObjectID, ref: 'Product' }], required: true })
  products: ObjectID;

  @Prop({ type: ObjectID, ref: 'Driver', required: true })
  driver: ObjectID;

  @Prop({ type: ObjectID, ref: 'Payment', required: true })
  payment: ObjectID;

  @Prop({ type: ObjectID, ref: 'Address', required: true })
  address: ObjectID;

  @Prop({ type: ObjectID, ref: 'Discount' })
  discount?: ObjectID;

  @Prop({ type: Number, required: true, unique: true })
  orderNumber: number;

  @Prop({ type: Number, required: true })
  deliveryFees: number;

  @Prop({
    enum: getValuesFromEnum(OrderEnum),
    default: OrderEnum.PREPARING,
    required: true,
  })
  state: string;

  @Prop({ sparse: true })
  transactionId?: string;

  @Prop()
  note?: string;

  @Prop({ required: true })
  estimatedTime: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
