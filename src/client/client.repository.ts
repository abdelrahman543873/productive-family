import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/_common/generics/repository.abstract';
import { hashPass } from 'src/_common/utils/bcryptHelper';
import { ClientRegisterInput } from './inputs/client-register.input';
import { SocialRegisterInput } from './inputs/social-register.input';
import { Client, ClientDocument } from './models/client.schema';
import { SocialLoginInput } from './inputs/social-login.input';
import { ObjectID } from 'mongodb';
import { ClientUpdateProfileInput } from './inputs/client-update-profile';
import { ConfigService } from '@nestjs/config';
import { File } from 'fastify-multer/lib/interfaces';
@Injectable()
export class ClientRepository extends BaseRepository<Client> {
  constructor(
    @InjectModel(Client.name) private clientSchema: Model<ClientDocument>,
    private configService: ConfigService,
  ) {
    super(clientSchema);
  }

  async register(input: ClientRegisterInput): Promise<Client> {
    return (
      await this.clientSchema.create({
        ...input,
        ...(input.password && { password: await hashPass(input.password) }),
      })
    ).toJSON();
  }

  async socialRegister(input: SocialRegisterInput): Promise<Client> {
    return (
      await this.clientSchema.create({ ...input, isVerified: true })
    ).toJSON();
  }

  async socialLogin(input: SocialLoginInput): Promise<Client> {
    return await this.clientSchema.findOne({ ...input }, {}, { lean: true });
  }

  async updateProfile(
    _id: ObjectID,
    input: ClientUpdateProfileInput,
    file?: File,
  ): Promise<Client> {
    return await this.clientSchema.findOneAndUpdate(
      { _id },
      {
        ...input,
        ...(input.password && { password: await hashPass(input.newPassword) }),
        ...(file?.path && {
          imageURL: this.configService.get<string>('IP') + file.filename,
        }),
      },
      { lean: true, new: true, projection: { password: 0 } },
    );
  }

  async removeFavoriteProduct(
    _id: ObjectID,
    favProduct: ObjectID,
  ): Promise<Client> {
    return await this.clientSchema.findOneAndUpdate(
      { _id },
      {
        $pull: {
          favProducts: favProduct,
        },
      },
      {
        new: true,
        lean: true,
      },
    );
  }

  async addFavoriteProduct(
    _id: ObjectID,
    favProduct: ObjectID,
  ): Promise<Client> {
    return await this.clientSchema.findOneAndUpdate(
      { _id },
      {
        $addToSet: {
          favProducts: favProduct,
        },
      },
      {
        new: true,
        lean: true,
      },
    );
  }
}
