import { SchemasEnum } from './../../_common/app.enum';
import { ObjectID } from 'mongodb';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UnitDocument = Unit & Document;

@Schema({ versionKey: false })
export class Unit {
  _id?: ObjectID;

  @Prop({ required: true })
  enUnit: string;

  @Prop({ required: true })
  arUnit: string;

  @Prop({ type: ObjectID, ref: SchemasEnum.Provider })
  provider?: ObjectID;
}

export const UnitSchema = SchemaFactory.createForClass(Unit);
