import { Controller, Get, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { Pagination } from '../_common/utils/pagination';
import { Order } from './models/order.schema';
import { PaginateResult } from 'mongoose';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('driver')
  async getDriverOrders(
    @Query() query: Pagination,
  ): Promise<PaginateResult<Order>> {
    return await this.orderService.getDriverOrders(query);
  }
}
