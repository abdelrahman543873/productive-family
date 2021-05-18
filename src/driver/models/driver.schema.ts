import { Point } from '../../_common/spatial-schemas/point.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRoleEnum } from 'src/_common/app.enum';
import { ObjectID } from 'mongodb';

export type DriverDocument = Driver & Document;

@Schema({ versionKey: false })
export class Driver {
  _id?: ObjectID;

  @Prop({ trim: true, required: true })
  name: string;

  @Prop({ required: true, unique: true })
  mobile: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  notionalId: string;

  @Prop({ required: true, default: false })
  isActive: boolean;

  @Prop({ required: true, default: false })
  isVerified: boolean;

  @Prop({ required: true, default: true })
  isAvailable: boolean;

  @Prop({ min: 0, max: 5 })
  rating?: number;

  @Prop({ type: Point, index: '2dsphere' })
  location?: Point;

  @Prop({
    required: true,
    default: UserRoleEnum.DRIVER,
  })
  role: string;

  @Prop({ trim: true, required: true })
  imageURL: string;

  @Prop({ type: String, required: true })
  nationalIDImgBack: string;

  @Prop({ type: String, required: true })
  nationalIDImgFront: string;

  @Prop()
  fcmToken?: string;

  token?: string;
}
export const DriverSchema = SchemaFactory.createForClass(Driver);
