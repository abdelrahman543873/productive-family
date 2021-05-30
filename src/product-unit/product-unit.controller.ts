import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ProductUnitService } from './product-unit.service';
import { ProductUnit } from './models/product-unit.schema';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { AggregatePaginateResult } from 'mongoose';
import { LessThanPriceInput } from 'src/product/inputs/less-than-price.input';
import { Product } from 'src/product/models/product.schema';
import { MessagesEnum } from 'src/_common/app.enum';
import { semiAuthGuard } from 'src/_common/guards/semi-auth.guard';
import { Pagination } from 'src/_common/utils/pagination.input';

@Controller('products')
export class ProductUnitController {
  constructor(private readonly productUnitService: ProductUnitService) {}

  @ApiBearerAuth()
  @ApiTags('client')
  @ApiResponse({
    status: 200,
    type: Product,
    description: MessagesEnum.PAGINATED_RESPONSE,
  })
  @UseGuards(semiAuthGuard)
  @Get('lessThanPrice/:price')
  async getLessThanPrice(
    @Param() input: LessThanPriceInput,
    @Query() query: Pagination,
  ): Promise<AggregatePaginateResult<ProductUnit>> {
    return await this.productUnitService.getLessThanPrice(input, query);
  }
}
