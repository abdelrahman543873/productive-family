import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectID } from 'mongodb';
import { SchemasEnum } from '../../_common/app.enum';

export type DiscountDocument = Discount & Document;

@Schema({ versionKey: false })
export class Discount {
  _id?: ObjectID;

  @Prop({ type: ObjectID, ref: SchemasEnum.Provider, required: true })
  provider: ObjectID;

  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  expiryDate: Date;

  @Prop({ required: true, default: true })
  isActive: boolean;
}

export const DiscountSchema = SchemaFactory.createForClass(Discount);
