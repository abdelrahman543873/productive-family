import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { getValuesFromEnum } from '../../_common/utils/column-enum';
import { ObjectID } from 'mongodb';
import { OrderEnum } from '../order.enum';
import { SchemasEnum } from '../../_common/app.enum';
import { Client } from '../../client/models/client.schema';
import { Provider } from '../../provider/models/provider.schema';
import { Driver } from '../../driver/models/driver.schema';
import { Payment } from '../../payment/models/payment.schema';
import { Address } from '../../address/models/address.schema';
import { Discount } from '../../discount/models/discount.schema';

export type OrderDocument = Order & Document;

@Schema({ versionKey: false })
export class Order {
  _id?: ObjectID;

  @Prop({ type: ObjectID, ref: SchemasEnum.Client, required: true })
  client: ObjectID | Client;

  @Prop({ type: ObjectID, ref: SchemasEnum.Provider, required: true })
  provider: ObjectID | Provider;

  @Prop({ type: ObjectID, ref: SchemasEnum.Driver })
  driver?: ObjectID | Driver;

  @Prop({ type: ObjectID, ref: SchemasEnum.Payment, required: true })
  payment: ObjectID | Payment;

  @Prop({ type: ObjectID, ref: SchemasEnum.Address, required: true })
  address: ObjectID | Address;

  @Prop({ type: ObjectID, ref: SchemasEnum.Discount })
  discount?: ObjectID | Discount;

  @Prop({ type: Number, required: true, unique: true })
  orderNumber?: number;

  @Prop({ type: Number })
  deliveryFees?: number;

  @Prop({
    enum: getValuesFromEnum(OrderEnum),
    default: OrderEnum.RECEIVED,
    required: true,
  })
  state?: string;

  @Prop({ sparse: true })
  transactionId?: string;

  @Prop()
  note?: string;

  @Prop()
  estimatedTime?: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
