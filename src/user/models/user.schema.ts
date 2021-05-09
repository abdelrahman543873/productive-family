import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRoleEnum } from '../../shared/user.enum';
import { getValuesFromEnum } from '../../shared/utils/column-enum';

export type UserDocument = User & Document;

@Schema({ versionKey: false })
export class User {
  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ unique: true, required: true })
  mobile: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    enum: getValuesFromEnum(UserRoleEnum),
    required: true,
    default: UserRoleEnum.CLIENT,
  })
  role: string;

  _id?: string;
  token?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
