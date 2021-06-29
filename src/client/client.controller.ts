import { HasRoles } from './../_common/guards/auth.metadata';
import {
  Body,
  Controller,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@webundsoehne/nest-fastify-file-upload';
import { FileValidationInterceptor } from 'src/_common/interceptors/file-upload.interceptor';
import { ClientService } from './client.service';
import { ClientRegisterInput } from './inputs/client-register.input';
import { SocialLoginInput } from './inputs/social-login.input';
import { Client } from './models/client.schema';
import { ClientUpdateProfileInput } from './inputs/client-update-profile';
import { UserRoleEnum } from 'src/_common/app.enum';
import { AuthGuard } from 'src/_common/guards/auth.guard';
import { RoleGuard } from 'src/_common/guards/roles.guard';
import { clientUpdateProfileSchema } from './swagger/client-update-profile.schema';
import { JoiValidationPipe } from 'src/_common/pipes/joi.pipe';
import { ClientUpdateProfileJoi } from './joi/client-update-profile.joi';
import { File } from 'fastify-multer/lib/interfaces';
import { ToggleFavProductInput } from './inputs/toggle-fav-product.input';
import { CheckoutInput } from './inputs/checkout.input';
import { Order } from '../order/models/order.schema';
import { ClientRegisterJoi } from './joi/client-register.joi';
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @ApiTags('client')
  @UsePipes(new JoiValidationPipe(ClientRegisterJoi))
  @Post('register')
  async register(@Body() input: ClientRegisterInput): Promise<Client> {
    return await this.clientService.register(input);
  }

  @ApiBearerAuth()
  @ApiTags('client')
  @ApiResponse({ status: 201, type: Client })
  @ApiConsumes('multipart/form-data')
  @ApiBody(clientUpdateProfileSchema)
  @HasRoles(UserRoleEnum.CLIENT)
  @UseGuards(AuthGuard, RoleGuard)
  @UseInterceptors(FileValidationInterceptor)
  @UseInterceptors(FileInterceptor('imageURL'))
  @UsePipes(new JoiValidationPipe(ClientUpdateProfileJoi, true))
  @Put('updateProfile')
  async updateProfile(
    @Body() input: ClientUpdateProfileInput,
    @UploadedFile() file?: File,
  ): Promise<Client> {
    return await this.clientService.updateProfile(input, file);
  }

  @ApiTags('client')
  @Post('socialLogin')
  async socialSocialLogin(@Body() input: SocialLoginInput): Promise<Client> {
    return await this.clientService.socialLogin(input);
  }

  @ApiBearerAuth()
  @ApiTags('client')
  @ApiResponse({ status: 201, type: Client })
  @HasRoles(UserRoleEnum.CLIENT)
  @UseGuards(AuthGuard, RoleGuard)
  @Post('toggleFavProduct')
  async toggleFavoriteProduct(
    @Body() input: ToggleFavProductInput,
  ): Promise<Client> {
    return await this.clientService.toggleFavoriteProduct(input);
  }

  @ApiBearerAuth()
  @ApiTags('client')
  @ApiResponse({ status: 201, type: Order })
  @HasRoles(UserRoleEnum.CLIENT)
  @UseGuards(AuthGuard, RoleGuard)
  @Post('checkout')
  async checkout(@Body() input: CheckoutInput): Promise<Order> {
    return await this.clientService.checkout(input);
  }
}
