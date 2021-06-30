import {
  LongAndLatEnum,
  MessagesEnum,
  UserRoleEnum,
} from 'src/_common/app.enum';
import { AuthGuard } from 'src/_common/guards/auth.guard';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AggregatePaginateResult } from 'mongoose';
import { RoleGuard } from 'src/_common/guards/roles.guard';
import { Pagination } from 'src/_common/utils/pagination.input';
import { Provider } from './models/provider.schema';
import { ProviderService } from './provider.service';
import { HasRoles } from 'src/_common/guards/auth.metadata';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiHeaders,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProviderRegisterInput } from './inputs/provider-register.input';
import { FilesInterceptor } from '@webundsoehne/nest-fastify-file-upload';
import { FileValidationInterceptor } from 'src/_common/interceptors/file-upload.interceptor';
import { ProviderRegisterSwagger } from './swagger/provider-register.swagger';
import { File } from 'fastify-multer/lib/interfaces';
import { semiAuthGuard } from 'src/_common/guards/semi-auth.guard';

@Controller('provider')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @ApiTags('provider')
  @ApiBody(ProviderRegisterSwagger)
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, type: Provider })
  @ApiHeaders([
    { name: LongAndLatEnum.Long, schema: { type: 'number' } },
    { name: LongAndLatEnum.Lat, schema: { type: 'number' } },
  ])
  @UseInterceptors(FileValidationInterceptor)
  @UseInterceptors(FilesInterceptor('imagesURLs'))
  @UseGuards(semiAuthGuard)
  @Post('register')
  async register(
    @Body() input: ProviderRegisterInput,
    @UploadedFiles() files?: Array<File>,
  ): Promise<Provider> {
    return await this.providerService.register(input, files);
  }

  @ApiBearerAuth()
  @ApiTags('provider')
  @ApiResponse({
    status: 200,
    type: Provider,
    description: MessagesEnum.PAGINATED_RESPONSE,
  })
  @HasRoles(UserRoleEnum.CLIENT)
  @UseGuards(AuthGuard, RoleGuard)
  @Get('newProviders')
  async getNewProviders(
    @Query() query: Pagination,
  ): Promise<AggregatePaginateResult<Provider>> {
    return await this.providerService.getNewProviders(query);
  }
}
