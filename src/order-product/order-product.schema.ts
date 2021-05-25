
import { Document } from 'mongoose';
import { ObjectID } from 'mongodb';
import { SchemasEnum } from '../_common/app.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';
export type OrderProductDocument = OrderProduct & Document;

@Schema({ versionKey: false })
export class OrderProduct {
  @Prop({ type: ObjectID, ref: SchemasEnum.Order, required: true })
  order: ObjectID;

  @Prop({ type: ObjectID, ref: SchemasEnum.Product, required: true })
  product: ObjectID;

  @Prop({ required: true })
  price: number;
}

export const OrderProductSchema = SchemaFactory.createForClass(OrderProduct);
OrderProductSchema.plugin(aggregatePaginate);
