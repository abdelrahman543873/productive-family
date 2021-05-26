import { Document } from 'mongoose';
import { ObjectID } from 'mongodb';
import { SchemasEnum } from '../_common/app.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';
import { Point } from 'src/_common/spatial-schemas/point.schema';
export type OrderProductDocument = OrderProduct & Document;

@Schema({ versionKey: false })
export class OrderProduct {
  @Prop({ type: ObjectID, ref: SchemasEnum.Order, required: true })
  order: ObjectID;

  @Prop({ type: ObjectID, ref: SchemasEnum.Product, required: true })
  product: ObjectID;

  @Prop({ required: true })
  price: number;

  @Prop({ type: Point, index: '2dsphere' })
  location: Point;
}

export const OrderProductSchema = SchemaFactory.createForClass(OrderProduct);
OrderProductSchema.plugin(aggregatePaginate);
