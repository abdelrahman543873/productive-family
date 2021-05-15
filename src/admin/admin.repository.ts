import { Injectable } from'@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from './models/admin.schema';
import { BaseRepository } from '../_common/generics/repository.abstract';

@Injectable()
export class AdminRepository extends BaseRepository<Admin> {
  constructor(
    @InjectModel(Admin.name) private adminSchema: Model<AdminDocument>,
  ) {
    super(adminSchema);
  }
  async getUserById(id: string): Promise<Admin> {
    return await this.adminSchema.findById(id);
  }
}
