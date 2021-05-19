import { Body, Controller, Get, Query, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { Pagination } from '../_common/utils/pagination';
import { Order } from './models/order.schema';
import { PaginateResult } from 'mongoose';
import { UserRoleEnum } from 'src/_common/app.enum';
import { AuthGuard } from 'src/_common/guards/auth.guard';
import { HasRoles } from 'src/_common/guards/auth.metadata';
import { RoleGuard } from 'src/_common/guards/roles.guard';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DriverOrdersFilterInput } from './inputs/drivers-orders-filter.input';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiBearerAuth()
  @ApiTags('orders')
  @ApiResponse({ status: 200, type: Order })
  @HasRoles(UserRoleEnum.DRIVER)
  @UseGuards(AuthGuard, RoleGuard)
  @Get('driver')
  async getDriverOrders(
    @Query() query: Pagination,
    @Body() input?: DriverOrdersFilterInput,
  ): Promise<PaginateResult<Order>> {
    return await this.orderService.getDriverOrders(input, query);
  }
}
