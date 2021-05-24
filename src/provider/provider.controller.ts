import { Responses, UserRoleEnum } from 'src/_common/app.enum';
import { AuthGuard } from 'src/_common/guards/auth.guard';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AggregatePaginateResult } from 'mongoose';
import { RoleGuard } from 'src/_common/guards/roles.guard';
import { Pagination } from 'src/_common/utils/pagination.input';
import { Provider } from './models/provider.schema';
import { ProviderService } from './provider.service';
import { HasRoles } from 'src/_common/guards/auth.metadata';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('provider')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @ApiBearerAuth()
  @ApiTags('provider')
  @ApiResponse({
    status: 200,
    type: Provider,
    description: Responses.PAGINATED_RESPONSE,
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
