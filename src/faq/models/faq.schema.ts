import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FaqDocument = Faq & Document;

@Schema({ versionKey: false })
export class Faq {
  @Prop()
  enQuestion: string;

  @Prop()
  arQuestion: string;

  @Prop()
  enAnswer: string;

  @Prop()
  arAnswer: string;
}

export const FaqSchema = SchemaFactory.createForClass(Faq);
