import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Pagination } from '../_common/utils/pagination.input';
import { Order } from './models/order.schema';
import { AggregatePaginateResult } from 'mongoose';
import { UserRoleEnum } from 'src/_common/app.enum';
import { AuthGuard } from 'src/_common/guards/auth.guard';
import { HasRoles } from 'src/_common/guards/auth.metadata';
import { RoleGuard } from 'src/_common/guards/roles.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DriverOrdersFilterInput } from './inputs/drivers-orders-filter.input';
import { GetDriverOrderInput } from './inputs/get-driver-order.input';
import { addDeliveryFeesInput } from './inputs/add-delivery-fees.input';
import { MessagesEnum } from '../_common/app.enum';
import { CancelOrderInput } from './inputs/cancel-order.input';

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
    @Query() input?: DriverOrdersFilterInput,
  ): Promise<AggregatePaginateResult<Order>> {
    return await this.orderService.getDriverOrders(input, query);
  }

  @ApiBearerAuth()
  @ApiTags('orders')
  @ApiResponse({ status: 200, type: Order })
  @HasRoles(UserRoleEnum.DRIVER)
  @UseGuards(AuthGuard, RoleGuard)
  @Get('getDriverOrder')
  async getDriverOrder(@Query() input: GetDriverOrderInput): Promise<Order> {
    return await this.orderService.getDriverOrder(input);
  }

  @ApiBearerAuth()
  @ApiTags('client')
  @ApiResponse({
    status: 200,
    type: Order,
    description: MessagesEnum.PAGINATED_RESPONSE,
  })
  @HasRoles(UserRoleEnum.CLIENT)
  @UseGuards(AuthGuard, RoleGuard)
  @Get('client')
  async getClientOrders(
    @Query() pagination: Pagination,
  ): Promise<AggregatePaginateResult<Order>> {
    return await this.orderService.getClientOrders(pagination);
  }

  @ApiBearerAuth()
  @ApiTags('client')
  @HasRoles(UserRoleEnum.CLIENT)
  @UseGuards(AuthGuard, RoleGuard)
  @Post('cancel')
  async cancelOrder(@Body() input: CancelOrderInput): Promise<Order> {
    return await this.orderService.cancelOrder(input);
  }

  @ApiBearerAuth()
  @ApiTags('orders')
  @ApiResponse({ status: 200, type: Order })
  @HasRoles(UserRoleEnum.DRIVER)
  @UseGuards(AuthGuard, RoleGuard)
  @Put('addDeliveryFees')
  async addDeliveryFees(@Body() input: addDeliveryFeesInput): Promise<Order> {
    return await this.orderService.addDeliveryFees(input);
  }
}
