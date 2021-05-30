import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeaders,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AggregatePaginateResult } from 'mongoose';
import { Product } from 'src/product/models/product.schema';
import { MessagesEnum } from 'src/_common/app.enum';
import { semiAuthGuard } from 'src/_common/guards/semi-auth.guard';
import { Pagination } from 'src/_common/utils/pagination.input';
import { ProductDiscount } from './models/product-discount.schema';
import { ProductDiscountService } from './product-discount.service';
import { LongAndLatEnum } from '../_common/app.enum';

@Controller('products')
export class ProductDiscountController {
  constructor(
    private readonly productDiscountService: ProductDiscountService,
  ) {}

  @ApiBearerAuth()
  @ApiTags('client')
  @ApiResponse({
    status: 200,
    type: Product,
    description: MessagesEnum.PAGINATED_RESPONSE,
  })
  @ApiHeaders([
    { name: LongAndLatEnum.Long, schema: { type: 'number' } },
    { name: LongAndLatEnum.Lat, schema: { type: 'number' } },
  ])
  @UseGuards(semiAuthGuard)
  @Get('discounts')
  async getDiscounts(
    @Query() pagination: Pagination,
  ): Promise<AggregatePaginateResult<ProductDiscount>> {
    return await this.productDiscountService.getDiscounts(pagination);
  }
}
