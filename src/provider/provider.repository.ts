import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  AggregatePaginateModel,
  AggregatePaginateResult,
  Model,
} from 'mongoose';
import { BaseRepository } from 'src/_common/generics/repository.abstract';
import { Provider, ProviderDocument } from './models/provider.schema';
import { SpatialType } from '../_common/spatial-schemas/spatial.enum';
import { Pagination } from 'src/_common/utils/pagination.input';
import { ProviderRegisterInput } from './inputs/provider-register.input';
import { hashPass } from 'src/_common/utils/bcryptHelper';
import { File } from 'fastify-multer/lib/interfaces';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class ProviderRepository extends BaseRepository<Provider> {
  constructor(
    private configService: ConfigService,
    @InjectModel(Provider.name)
    private providerSchema: AggregatePaginateModel<ProviderDocument>,
  ) {
    super(providerSchema);
  }

  async register(
    input: ProviderRegisterInput,
    coordinates: Array<number>,
    files?: Array<File>,
  ): Promise<Provider> {
    return (
      await this.providerSchema.create({
        ...input,
        location: { type: SpatialType.Point, coordinates },
        ...(input.password && { password: await hashPass(input.password) }),
        ...(files?.[0]?.path && {
          imagesURLs: files.map(
            file => this.configService.get<string>('IP') + file.filename,
          ),
        }),
      })
    ).toJSON();
  }

  async getNewProviders(
    coordinates: number[],
    pagination: Pagination,
  ): Promise<AggregatePaginateResult<Provider>> {
    const aggregation = this.providerSchema.aggregate([
      {
        $geoNear: {
          near: {
            type: SpatialType.Point,
            coordinates,
          },
          distanceField: 'distance',
          key: 'location',
          distanceMultiplier: 0.001,
        },
      },
      {
        $match: {
          $expr: {
            $lte: ['$distance', '$maxDistance'],
          },
        },
      },
    ]);
    return await this.providerSchema.aggregatePaginate(aggregation, {
      sort: { createdAt: 1 },
      offset: pagination.offset * pagination.limit,
      limit: pagination.limit,
    });
  }
}
