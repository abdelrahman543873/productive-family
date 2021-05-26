import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectID } from 'mongodb';

export type CategoryDocument = Category & Document;

@Schema({ versionKey: false })
export class Category {
  _id?: ObjectID;

  @Prop({ required: true, trim: true })
  enName: string;

  @Prop({ required: true, trim: true })
  arName: string;

  @Prop({ required: true, trim: true })
  isActive: boolean;

  @Prop({ required: true, trim: true })
  imageURL: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
