import { PaymentEnum } from './../payment.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectID } from 'mongodb';
import { getValuesFromEnum } from 'src/_common/utils/column-enum';

export type PaymentDocument = Payment & Document;

@Schema({ versionKey: false })
export class Payment {
  _id?: ObjectID;

  @Prop({ required: true, trim: true })
  enName: string;

  @Prop({ required: true, trim: true })
  arName: string;

  @Prop({ required: true, default: true })
  isActive: boolean;

  @Prop({ enum: getValuesFromEnum(PaymentEnum), required: true })
  type: string;

  @Prop({ trim: true })
  imageURL?: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
