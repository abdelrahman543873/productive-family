import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectID } from 'mongodb';
import * as paginate from 'mongoose-paginate-v2';

export type ReviewDocument = Review & Document;

@Schema({ versionKey: false })
export class Review {
  @Prop({ type: ObjectID, required: true, ref: 'Client' })
  reviewer: ObjectID;

  @Prop({ type: ObjectID, required: true })
  reviewed: ObjectID;

  @Prop({ type: Number, required: true, min: 0, max: 5 })
  rating: number;

  @Prop({ type: String, trim: true })
  review: string;

  @Prop({ type: ObjectID })
  order: ObjectID;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
ReviewSchema.plugin(paginate);
