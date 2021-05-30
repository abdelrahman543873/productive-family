import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectID } from 'mongodb';
import { SchemasEnum } from '../../_common/app.enum';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

export type ProductDocument = Product & Document;

@Schema({ versionKey: false })
export class Product {
  _id?: ObjectID;

  @Prop({ required: true, ref: SchemasEnum.Provider })
  provider: ObjectID;

  @Prop({ required: true, ref: SchemasEnum.Category })
  category: ObjectID;

  @Prop({ required: true, trim: true })
  enName: string;

  @Prop({ required: true, trim: true })
  arName: string;

  @Prop({ required: true, trim: true })
  enDescription: string;

  @Prop({ required: true, trim: true })
  arDescription: string;

  @Prop({ required: true })
  preparationTime: number;

  @Prop({ min: 0, max: 5 })
  rating?: number;

  @Prop({ required: true, default: true })
  isActive: boolean;

  @Prop({ type: [String] })
  imagesURLs?: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.plugin(aggregatePaginate);
