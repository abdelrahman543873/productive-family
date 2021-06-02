import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectID } from 'mongodb';
import { SchemasEnum } from '../../_common/app.enum';

export type ProviderDriverDocument = ProviderDriver & Document;

@Schema({ versionKey: false })
export class ProviderDriver {
  @Prop({ type: ObjectID, ref: SchemasEnum.Provider, required: true })
  provider: ObjectID;

  @Prop({ type: ObjectID, ref: SchemasEnum.Driver, required: true })
  driver: ObjectID;

  @Prop({ required: true, default: true })
  isActive: boolean;

  @Prop({ required: true, default: false })
  isBlocked: boolean;
}

export const ProviderDriverSchema = SchemaFactory.createForClass(
  ProviderDriver,
);