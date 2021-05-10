import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Driver, DriverSchema } from './models/driver.schema';
import { DriverRepository } from './driver.repository';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { diskStorage } from 'multer';
import { filename } from '../_common/utils/multer-file-name';
import { MulterModule } from '@nestjs/platform-express';
import { fileFilter } from '../_common/utils/multer-file-filter';

@Module({
  imports: [
    MulterModule.register({
      fileFilter,
      preservePath: true,
      storage: diskStorage({
        destination: './public/driver',
        filename,
      }),
    }),
    MongooseModule.forFeature([{ name: Driver.name, schema: DriverSchema }]),
  ],
  controllers: [DriverController],
  providers: [DriverRepository, DriverService],
})
export class DriverModule {}
