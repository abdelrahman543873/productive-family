import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Driver, DriverSchema } from './models/driver.schema';
import { DriverRepository } from './driver.repository';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Driver.name, schema: DriverSchema }]),
  ],
  controllers: [DriverController],
  providers: [DriverRepository, DriverService],
})
export class DriverModule {}
