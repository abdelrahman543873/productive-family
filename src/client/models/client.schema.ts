import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { getValuesFromEnum } from '../../_common/utils/column-enum';
import { ObjectID } from 'mongodb';
import { SocialMediaType } from '../social-media.enum';
import { UserRoleEnum } from 'src/_common/app.enum';
import { SchemasEnum } from '../../_common/app.enum';
import { Point } from 'src/_common/spatial-schemas/point.schema';

export type ClientDocument = Client & Document;

@Schema({ versionKey: false })
export class Client {
  _id?: ObjectID;
  token?: string;
  @Prop({ required: true, trim: true })
  name: string;

  @Prop()
  password?: string;

  @Prop({ sparse: true })
  mobile?: string;

  @Prop({ sparse: true })
  email?: string;

  @Prop({ required: true, default: false })
  isVerified: boolean;

  @Prop({ sparse: true })
  socialMediaId?: string;

  @Prop({ enum: getValuesFromEnum(SocialMediaType) })
  socialMediaType?: string;

  @Prop({
    type: [
      {
        type: ObjectID,
        ref: SchemasEnum.Product,
      },
    ],
  })
  favProducts?: ObjectID[];

  @Prop()
  fcmToken?: string;

  @Prop()
  imageURL?: string;

  @Prop({
    required: true,
    default: UserRoleEnum.CLIENT,
  })
  role: string;

  @Prop({ type: Point, index: '2dsphere' })
  location: Point;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
