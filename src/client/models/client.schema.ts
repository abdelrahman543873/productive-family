import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { getValuesFromEnum } from '../../_common/utils/column-enum';
import { ObjectID } from 'mongodb';
import { SocialMediaType } from '../social-media.enum';
import { UserRoleEnum } from 'src/_common/app.enum';

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
        ref: 'Product',
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
}

export const ClientSchema = SchemaFactory.createForClass(Client);
