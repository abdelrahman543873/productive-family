import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectID } from 'mongodb';
import paginate from 'mongoose-paginate-v2';
import { SchemasEnum } from '../../_common/app.enum';
import { Client } from '../../client/models/client.schema';
import { Order } from '../../order/models/order.schema';

export type ReviewDocument = Review & Document;

@Schema({ versionKey: false })
export class Review {
  @Prop({ type: ObjectID, required: true, ref: SchemasEnum.Client })
  reviewer: ObjectID | Client;

  @Prop({ type: ObjectID, required: true })
  reviewed: ObjectID;

  @Prop({ type: Number, required: true, min: 0, max: 5 })
  rating: number;

  @Prop({ type: String, trim: true })
  review: string;

  @Prop({ type: ObjectID })
  order: ObjectID | Order;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
ReviewSchema.plugin(paginate);
