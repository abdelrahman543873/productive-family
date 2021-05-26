import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DriverRegisterInput } from './inputs/driver-register.input';
import { Driver, DriverDocument } from './models/driver.schema';
import { BaseRepository } from '../_common/generics/repository.abstract';
import { hashPass } from 'src/_common/utils/bcryptHelper';
import { File } from 'fastify-multer/lib/interfaces';
import { ConfigService } from '@nestjs/config';
import { SpatialType } from 'src/_common/spatial-schemas/spatial.enum';
import { DriverUpdateProfileInput } from './inputs/driver-update-profile.input';
import { ObjectID } from 'mongodb';
import { Order, OrderDocument } from '../order/models/order.schema';
import { OrderEnum } from '../order/order.enum';
import {
  ProviderDriver,
  ProviderDriverDocument,
} from '../provider-driver/models/provider-driver.schema';
import { LookupSchemasEnum } from 'src/_common/app.enum';

@Injectable()
export class DriverRepository extends BaseRepository<Driver> {
  constructor(
    @InjectModel(Driver.name) private driverSchema: Model<DriverDocument>,
    @InjectModel(Order.name) private orderSchema: Model<OrderDocument>,
    @InjectModel(ProviderDriver.name)
    private providerDriverSchema: Model<ProviderDriverDocument>,
    private configService: ConfigService,
  ) {
    super(driverSchema);
  }

  async register(
    input: DriverRegisterInput,
    files: Array<File>,
  ): Promise<Driver> {
    return (
      await this.driverSchema.create({
        ...input,
        location: {
          coordinates: [input.longitude, input.latitude],
        },
        ...(input.password && { password: await hashPass(input.password) }),
        ...(files?.['imageURL']?.[0].path && {
          imageURL:
            this.configService.get<string>('IP') + files['imageURL'][0].path,
        }),
        ...(files?.['nationalIDImgBack']?.[0].path && {
          nationalIDImgBack:
            this.configService.get<string>('IP') +
            files['nationalIDImgBack'][0].path,
        }),
        ...(files?.['nationalIDImgFront']?.[0].path && {
          nationalIDImgFront:
            this.configService.get<string>('IP') +
            files['nationalIDImgFront'][0].path,
        }),
      })
    ).toJSON();
  }

  async updateProfile(
    _id: string,
    input: DriverUpdateProfileInput,
    files: Array<File>,
  ): Promise<Driver> {
    return await this.driverSchema.findOneAndUpdate(
      { _id },
      {
        ...input,
        ...(input.latitude && {
          location: {
            type: SpatialType.Point,
            coordinates: [
              parseFloat(input.longitude),
              parseFloat(input.latitude),
            ],
          },
        }),
        ...(input.password && { password: await hashPass(input.newPassword) }),
        ...(files?.['imageURL']?.[0].path && {
          imageURL:
            this.configService.get<string>('IP') + files['imageURL'][0].path,
        }),
        ...(files?.['nationalIDImgBack']?.[0].path && {
          nationalIDImgBack:
            this.configService.get<string>('IP') +
            files['nationalIDImgBack'][0].path,
        }),
        ...(files?.['nationalIDImgFront']?.[0].path && {
          nationalIDImgFront:
            this.configService.get<string>('IP') +
            files['nationalIDImgFront'][0].path,
        }),
      },
      { new: true, lean: true, projection: { password: 0 } },
    );
  }

  async toggleActivity(_id: ObjectID, isActive: boolean): Promise<Driver> {
    return await this.driverSchema.findOneAndUpdate(
      { _id },
      { isActive },
      { new: true, lean: true },
    );
  }

  async home(driver: ObjectID): Promise<Record<any, any>> {
    const locations = await this.providerDriverSchema.aggregate([
      {
        $match: {
          driver,
          isBlocked: false,
        },
      },
      {
        $lookup: {
          from: LookupSchemasEnum.Driver,
          localField: 'driver',
          foreignField: '_id',
          as: 'driver',
        },
      },
      {
        $unwind: '$driver',
      },
      { $replaceRoot: { newRoot: '$driver' } },
      {
        $project: {
          location: '$location.coordinates',
          _id: 0,
        },
      },
    ]);
    const currentOrders = await this.orderSchema.aggregate([
      {
        $match: {
          driver,
          state: OrderEnum.SHIPPING,
        },
      },
      {
        $lookup: {
          from: LookupSchemasEnum.OrderProduct,
          localField: '_id',
          foreignField: 'order',
          as: 'products',
        },
      },
      {
        $addFields: {
          total: { $sum: '$products.price' },
        },
      },
      {
        $lookup: {
          from: LookupSchemasEnum.Provider,
          localField: 'provider',
          foreignField: '_id',
          as: 'provider',
        },
      },
      {
        $unwind: '$provider',
      },
      {
        $lookup: {
          from: LookupSchemasEnum.Client,
          localField: 'client',
          foreignField: '_id',
          as: 'client',
        },
      },
      {
        $unwind: '$client',
      },
      {
        $project: {
          products: 0,
        },
      },
    ]);
    return {
      providers: locations.length,
      orders: currentOrders.length,
      locations,
      currentOrders,
    };
  }
}
