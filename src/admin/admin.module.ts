import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminRepository } from './admin.repository';
import { Admin, AdminSchema } from './models/admin.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
  ],
  providers: [AdminRepository],
})
export class AdminModule {}
