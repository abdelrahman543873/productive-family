import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemasEnum } from 'src/_common/app.enum';
import { Point } from 'src/_common/spatial-schemas/point.schema';
import { ObjectID } from 'mongodb';
import { Document } from 'mongoose';

export type ProductDiscountDocument = ProductDiscount & Document;
@Schema({ versionKey: false })
export class ProductDiscount {
  @Prop({ type: ObjectID, ref: SchemasEnum.Order, required: true })
  product: ObjectID;

  @Prop({ type: ObjectID, ref: SchemasEnum.Discount, required: true })
  discount: ObjectID;

  @Prop({ type: ObjectID, ref: SchemasEnum.Unit })
  unit?: ObjectID;

  @Prop({ type: Point, index: '2dsphere', required: true })
  providerLocation: Point;
}

export const ProductDiscountSchema = SchemaFactory.createForClass(
  ProductDiscount,
);
