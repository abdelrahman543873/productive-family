import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AggregatePaginateResult } from 'mongoose';
import { semiAuthGuard } from 'src/_common/guards/semi-auth.guard';
import { Pagination } from 'src/_common/utils/pagination.input';
import { ProductDiscount } from './models/product-discount.schema';
import { ProductDiscountService } from './product-discount.service';

@Controller('products')
export class ProductDiscountController {
  constructor(
    private readonly productDiscountService: ProductDiscountService,
  ) {}

  @Get('discounts')
  @UseGuards(semiAuthGuard)
  async getDiscounts(
    @Query() pagination: Pagination,
  ): Promise<AggregatePaginateResult<ProductDiscount>> {
    return await this.productDiscountService.getDiscounts(pagination);
  }
}
