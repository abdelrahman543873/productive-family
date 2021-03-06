import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Driver, DriverSchema } from './models/driver.schema';
import { DriverRepository } from './driver.repository';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { filename } from '../_common/utils/multer-file-name';
import { fileFilter } from '../_common/utils/multer-file-filter';
import { MulterModule } from '@webundsoehne/nest-fastify-file-upload';
import { diskStorage } from 'fastify-multer/lib';
import { VerificationModule } from '../verification/verification.module';
import { Order, OrderSchema } from '../order/models/order.schema';
import {
  ProviderDriver,
  ProviderDriverSchema,
} from '../provider-driver/models/provider-driver.schema';

@Module({
  imports: [
    MulterModule.register({
      fileFilter,
      preservePath: true,
      storage: diskStorage({
        destination: './public',
        filename,
      }),
    }),
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Driver.name, schema: DriverSchema },
      { name: ProviderDriver.name, schema: ProviderDriverSchema },
    ]),
    VerificationModule,
  ],
  controllers: [DriverController],
  providers: [DriverRepository, DriverService],
})
export class DriverModule {}
