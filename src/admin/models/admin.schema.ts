import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRoleEnum } from '../../_common/app.enum';
import { ObjectID } from 'mongodb';

export type AdminDocument = Admin & Document;

@Schema({ versionKey: false })
export class Admin {
  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ unique: true, required: true })
  mobile: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    required: true,
    default: UserRoleEnum.ADMIN,
  })
  role: string;

  _id?: ObjectID;
  token?: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
