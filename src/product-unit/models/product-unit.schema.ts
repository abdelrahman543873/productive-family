import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemasEnum } from 'src/_common/app.enum';
import { ObjectID } from 'mongodb';
import { Document } from 'mongoose';

export type ProductUnitDocument = ProductUnit & Document;

@Schema({ versionKey: false })
export class ProductUnit {
  @Prop({ type: ObjectID, ref: SchemasEnum.Product, required: true })
  product: ObjectID;

  @Prop({ type: ObjectID, ref: SchemasEnum.Unit, required: true })
  unit: ObjectID;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  amount: number;
}

export const ProductUnitSchemaSchema = SchemaFactory.createForClass(
  ProductUnit,
);
