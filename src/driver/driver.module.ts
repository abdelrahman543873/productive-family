import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Driver, DriverSchema } from './models/driver.schema';
import { DriverRepository } from './driver.repository';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  imports: [
    MulterModule.register({
      preservePath: true,
      storage: diskStorage({
        destination: './public/driver',
        filename: (req, file, cb) => {
          return cb(null, `${Date.now()}${extname(file.originalname)}`);
        },
      }),
    }),
    MongooseModule.forFeature([{ name: Driver.name, schema: DriverSchema }]),
  ],
  controllers: [DriverController],
  providers: [DriverRepository, DriverService],
})
export class DriverModule {}
