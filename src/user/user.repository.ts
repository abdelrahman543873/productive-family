import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './models/user.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private userSchema: Model<UserDocument>,
  ) {}

  async getUserById(id: string): Promise<User> {
    return await this.userSchema.findById(id);
  }
}
