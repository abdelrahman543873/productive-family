import { ObjectID } from 'mongodb';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemasEnum } from 'src/_common/app.enum';
import { Document } from 'mongoose';
import { Client } from '../../client/models/client.schema';
import { Product } from '../../product/models/product.schema';

export type CartDocument = Cart & Document;

@Schema({ versionKey: false })
export class Cart {
  @Prop({ type: ObjectID, ref: SchemasEnum.Client, required: true })
  client: ObjectID | Client;

  @Prop({ type: ObjectID, ref: SchemasEnum.Product, required: true })
  product: ObjectID | Product;

  @Prop({ required: true })
  amount: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
