import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRoleEnum, SchemasEnum } from '../../_common/app.enum';
import { ObjectID } from 'mongodb';
import { Point } from 'src/_common/spatial-schemas/point.schema';

export type ProviderDocument = Provider & Document;

@Schema({ versionKey: false })
export class Provider {
  _id?: ObjectID;

  @Prop({ required: true })
  name: string;

  @Prop()
  email?: string;

  @Prop({ required: true, unique: true })
  mobile: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  slogan?: string;

  @Prop({ required: true, default: UserRoleEnum.PROVIDER })
  role: string;

  @Prop({ type: Point, index: '2dsphere' })
  location: Point;

  @Prop({ min: 0, max: 5 })
  rating: number;

  @Prop({
    type: [
      {
        type: ObjectID,
        ref: SchemasEnum.Payment,
      },
    ],
  })
  acceptedPaymentMethods: ObjectID[];

  @Prop({ required: true, default: false })
  isActive: boolean;

  @Prop({ required: true, default: false })
  isVerified: boolean;

  @Prop({ type: [{ type: String }] })
  imagesURL?: string[];

  @Prop()
  fcmToken?: string;
}

export const ProviderSchema = SchemaFactory.createForClass(Provider);
