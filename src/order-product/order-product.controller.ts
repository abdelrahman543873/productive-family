import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { AggregatePaginateResult } from 'mongoose';
import { MessagesEnum } from 'src/_common/app.enum';
import { OrderProduct } from './order-product.schema';
import { OrderProductService } from './order-product.service';
import { Product } from '../product/models/product.schema';
import { semiAuthGuard } from '../_common/guards/semi-auth.guard';

@Controller('trends')
export class OrderProductController {
  constructor(private readonly orderProductService: OrderProductService) {}

  @ApiBearerAuth()
  @ApiTags('client')
  @ApiResponse({
    status: 200,
    type: Product,
    description: MessagesEnum.PAGINATED_RESPONSE,
  })
  @UseGuards(semiAuthGuard)
  @Get('popularProducts')
  async getPopularProducts(): Promise<AggregatePaginateResult<OrderProduct>> {
    return await this.orderProductService.getPopularProducts();
  }
}
