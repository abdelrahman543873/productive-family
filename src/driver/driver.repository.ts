import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DriverRegisterInput } from './inputs/driver-register.input';
import { Driver, DriverDocument } from './models/driver.schema';
import { BaseRepository } from '../shared/generics/repository.abstract';

@Injectable()
export class DriverRepository extends BaseRepository<Driver> {
  constructor(
    @InjectModel(Driver.name) private driverSchema: Model<DriverDocument>,
  ) {
    super(driverSchema);
  }
  async register(
    input: DriverRegisterInput,
    files: Array<Express.Multer.File>,
  ): Promise<Driver> {
    return (
      await this.driverSchema.create({
        ...input,
        location: {
          coordinates: [input.longitude, input.latitude],
        },
        ...(files?.['imageURL']?.[0].path && {
          imageURL: files['imageURL'][0].path,
        }),
        ...(files?.['nationalIDImgBack']?.[0].path && {
          nationalIDImgBack: files['nationalIDImgBack'][0].path,
        }),
        ...(files?.['nationalIDImgFront']?.[0].path && {
          nationalIDImgFront: files['nationalIDImgFront'][0].path,
        }),
      })
    ).toJSON();
  }
}
