import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectID } from 'mongodb';
import * as paginate from 'mongoose-paginate-v2';

export type ProviderDriverDocument = ProviderDriver & Document;

@Schema({ versionKey: false, _id: false })
export class ProviderDriver {
  @Prop({ type: ObjectID, ref: 'Provider', required: true })
  provider: ObjectID;

  @Prop({ type: ObjectID, ref: 'Driver', required: true })
  driver: ObjectID;

  @Prop({ required: true, default: true })
  isActive: boolean;

  @Prop({ required: true, default: false })
  isBlocked: boolean;
}

export const ProviderDriverSchema = SchemaFactory.createForClass(
  ProviderDriver,
);
ProviderDriverSchema.plugin(paginate);
