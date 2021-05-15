import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from 'src/admin/models/admin.schema';
import { HelperService } from './helper.service';
import { Driver, DriverSchema } from '../../driver/models/driver.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Admin.name, schema: AdminSchema },
      { name: Driver.name, schema: DriverSchema },
    ]),
  ],
  providers: [HelperService],
  exports: [HelperService],
})
export class HelperModule {}
