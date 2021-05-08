import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { getValuesFromEnum } from '../../shared/utils/column-enum';
import { UserRoleEnum } from '../../shared/user.enum';

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

  @Prop({ enum: getValuesFromEnum(UserRoleEnum) })
  type: string;
}

export const FaqSchema = SchemaFactory.createForClass(Faq);
