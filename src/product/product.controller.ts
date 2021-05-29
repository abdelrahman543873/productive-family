import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { AggregatePaginateResult } from 'mongoose';
import { MessagesEnum } from 'src/_common/app.enum';
import { semiAuthGuard } from 'src/_common/guards/semi-auth.guard';
import { Pagination } from 'src/_common/utils/pagination.input';
import { Product } from './models/product.schema';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiBearerAuth()
  @ApiTags('client')
  @ApiResponse({
    status: 200,
    type: Product,
    description: MessagesEnum.PAGINATED_RESPONSE,
  })
  @UseGuards(semiAuthGuard)
  @Get('lessThanPrice')
  async getLessThanPrice(
    @Query() query: Pagination,
  ): Promise<AggregatePaginateResult<Product>> {
    return await this.productService.getLessThanPrice(query);
  }
}
