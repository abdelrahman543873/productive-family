import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemasEnum } from 'src/_common/app.enum';
import { Point } from 'src/_common/spatial-schemas/point.schema';
import { ObjectID } from 'mongodb';
import { Document } from 'mongoose';
import { Product } from '../../product/models/product.schema';
import { Discount } from '../../discount/models/discount.schema';
import { Unit } from '../../unit/models/unit.schema';

export type ProductDiscountDocument = ProductDiscount & Document;
@Schema({ versionKey: false })
export class ProductDiscount {
  @Prop({ type: ObjectID, ref: SchemasEnum.Order, required: true })
  product: ObjectID | Product;

  @Prop({ type: ObjectID, ref: SchemasEnum.Discount, required: true })
  discount: ObjectID | Discount;

  @Prop({ type: ObjectID, ref: SchemasEnum.Unit })
  unit?: ObjectID | Unit;

  @Prop({ type: Point, index: '2dsphere', required: true })
  providerLocation: Point;
}

export const ProductDiscountSchema = SchemaFactory.createForClass(
  ProductDiscount,
);
