import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { getValuesFromEnum } from '../../_common/utils/column-enum';
import { ObjectID } from 'mongodb';
import { OrderEnum } from '../order.enum';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';
import { SchemasEnum } from '../../_common/app.enum';

export type OrderDocument = Order & Document;

@Schema({ versionKey: false })
export class Order {
  _id?: ObjectID;

  @Prop({ type: ObjectID, ref: SchemasEnum.Client, required: true })
  client: ObjectID;

  @Prop({ type: ObjectID, ref: SchemasEnum.Provider, required: true })
  provider: ObjectID;

  @Prop({ type: ObjectID, ref: SchemasEnum.Driver, required: true })
  driver: ObjectID;

  @Prop({ type: ObjectID, ref: SchemasEnum.Payment, required: true })
  payment: ObjectID;

  @Prop({ type: ObjectID, ref: SchemasEnum.Address, required: true })
  address: ObjectID;

  @Prop({ type: ObjectID, ref: SchemasEnum.Discount })
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
  estimatedTime: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
OrderSchema.plugin(aggregatePaginate);
