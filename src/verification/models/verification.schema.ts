import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectID } from 'mongodb';

export type VerificationDocument = Verification & Document;

@Schema({ versionKey: false, timestamps: false })
export class Verification {
  _id?: ObjectID;

  @Prop({ type: ObjectID })
  user: ObjectID;

  @Prop({ required: true })
  code: string;

  @Prop()
  expirationDate: Date;

  @Prop()
  mobile?: string;

  @Prop()
  email?: string;
}

export const VerificationSchema = SchemaFactory.createForClass(Verification);
