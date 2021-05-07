import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRoleEnum } from '../../shared/user.enum';

export type UserDocument = User & Document;

@Schema({ versionKey: false })
export class User {
  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ unique: true, required: true })
  phone: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: UserRoleEnum, required: true })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
