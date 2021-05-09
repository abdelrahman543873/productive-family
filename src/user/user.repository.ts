import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './models/user.schema';
import { BaseRepository } from '../_common/generics/repository.abstract';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(@InjectModel(User.name) private userSchema: Model<UserDocument>) {
    super(userSchema);
  }
  async getUserById(id: string): Promise<User> {
    return await this.userSchema.findById(id);
  }
}
