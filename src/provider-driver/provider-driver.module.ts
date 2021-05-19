import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProviderDriverRepository } from './provider-driver.repository';
import { ProviderDriverService } from './provider-driver.service';
import { ProviderDriverController } from './provider-driver.controller';
import {
  ProviderDriver,
  ProviderDriverSchema,
} from './models/provider-driver.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProviderDriver.name, schema: ProviderDriverSchema },
    ]),
  ],
  controllers: [ProviderDriverController],
  providers: [ProviderDriverRepository, ProviderDriverService],
})
export class ProviderDriverModule {}
