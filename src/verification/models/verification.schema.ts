import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type VerificationDocument = Verification & Document;

@Schema({ versionKey: false, timestamps: false })
export class Verification {
  @Prop({ type: Types.ObjectId })
  user: string;

  @Prop({ required: true })
  code: string;

  @Prop()
  expirationDate: Date;

  @Prop()
  phone: string;

  @Prop()
  email: string;
}

export const VerificationSchema = SchemaFactory.createForClass(Verification);
