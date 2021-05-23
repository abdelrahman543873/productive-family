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
import { SocialRegisterInput } from './inputs/social-register.input';
import { Client } from './models/client.schema';
import { ClientUpdateProfileInput } from './inputs/client-update-profile';
import { UserRoleEnum } from 'src/_common/app.enum';
import { AuthGuard } from 'src/_common/guards/auth.guard';
import { RoleGuard } from 'src/_common/guards/roles.guard';
import { clientUpdateProfileSchema } from './swagger/client-update-profile.schema';
import { JoiValidationPipe } from 'src/_common/pipes/joi.pipe';
import { ClientUpdateProfileJoi } from './joi/client-update-profile.joi';
import { File } from 'fastify-multer/lib/interfaces';
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @ApiTags('client')
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
  @UsePipes(new JoiValidationPipe(ClientUpdateProfileJoi))
  @Put('updateProfile')
  async updateProfile(
    @Body() input: ClientUpdateProfileInput,
    @UploadedFile() file?: File,
  ): Promise<Client> {
    return await this.clientService.updateProfile(input, file);
  }

  @ApiTags('client')
  @Post('socialRegister')
  async socialRegister(@Body() input: SocialRegisterInput): Promise<Client> {
    return await this.clientService.socialRegister(input);
  }

  @ApiTags('client')
  @Post('socialLogin')
  async socialSocialLogin(@Body() input: SocialLoginInput): Promise<Client> {
    return await this.clientService.socialLogin(input);
  }
}
