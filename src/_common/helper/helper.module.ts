import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from 'src/admin/models/admin.schema';
import { HelperService } from './helper.service';
import { Driver, DriverSchema } from '../../driver/models/driver.schema';
import { Client } from 'src/client/models/client.schema';
import { ClientSchema } from '../../client/models/client.schema';
import {
  Provider,
  ProviderSchema,
} from '../../provider/models/provider.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Admin.name, schema: AdminSchema },
      { name: Driver.name, schema: DriverSchema },
      { name: Client.name, schema: ClientSchema },
      { name: Provider.name, schema: ProviderSchema },
    ]),
  ],
  providers: [HelperService],
  exports: [HelperService],
})
export class HelperModule {}
