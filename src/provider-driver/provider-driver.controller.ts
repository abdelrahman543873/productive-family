import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ProviderDriverService } from './provider-driver.service';
import { Pagination } from '../_common/utils/pagination.input';
import { ProviderDriver } from './models/provider-driver.schema';
import { AggregatePaginateResult } from 'mongoose';
import { UserRoleEnum } from 'src/_common/app.enum';
import { AuthGuard } from 'src/_common/guards/auth.guard';
import { HasRoles } from 'src/_common/guards/auth.metadata';
import { RoleGuard } from 'src/_common/guards/roles.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('providersAndDrivers')
export class ProviderDriverController {
  constructor(private readonly providerDriverService: ProviderDriverService) {}

  @ApiBearerAuth()
  @ApiTags('providersAndDrivers')
  @ApiResponse({ status: 200, type: ProviderDriver })
  @HasRoles(UserRoleEnum.DRIVER)
  @UseGuards(AuthGuard, RoleGuard)
  @Get('driverProviders')
  async getDriversProviders(
    @Query() pagination: Pagination,
  ): Promise<AggregatePaginateResult<ProviderDriver>> {
    return await this.providerDriverService.getDriversProviders(pagination);
  }
}
