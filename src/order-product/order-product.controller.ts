import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiResponse,
  ApiHeaders,
} from '@nestjs/swagger';
import { AggregatePaginateResult } from 'mongoose';
import { MessagesEnum } from 'src/_common/app.enum';
import { OrderProduct } from './order-product.schema';
import { OrderProductService } from './order-product.service';
import { Product } from '../product/models/product.schema';
import { semiAuthGuard } from '../_common/guards/semi-auth.guard';
import { Pagination } from 'src/_common/utils/pagination.input';

@Controller('products')
export class OrderProductController {
  constructor(private readonly orderProductService: OrderProductService) {}

  @ApiBearerAuth()
  @ApiTags('client')
  @ApiResponse({
    status: 200,
    type: Product,
    description: MessagesEnum.PAGINATED_RESPONSE,
  })
  @ApiHeaders([{ name: 'long' }, { name: 'lat' }])
  @UseGuards(semiAuthGuard)
  @Get('popularProducts')
  async getPopularProducts(
    @Query() pagination: Pagination,
  ): Promise<AggregatePaginateResult<OrderProduct>> {
    return await this.orderProductService.getPopularProducts(pagination);
  }
}
