import { ObjectID } from 'mongodb';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemasEnum } from 'src/_common/app.enum';
import { Document } from 'mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

export type CartDocument = Cart & Document;

@Schema({ versionKey: false })
export class Cart {
  @Prop({ type: ObjectID, ref: SchemasEnum.Client, required: true })
  client: ObjectID;

  @Prop({ type: ObjectID, ref: SchemasEnum.Product, required: true })
  product: ObjectID;

  @Prop({ required: true })
  amount: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
CartSchema.plugin(aggregatePaginate);