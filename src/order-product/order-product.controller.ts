import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { AggregatePaginateResult } from 'mongoose';
import { UserRoleEnum, MessagesEnum } from 'src/_common/app.enum';
import { AuthGuard } from 'src/_common/guards/auth.guard';
import { HasRoles } from 'src/_common/guards/auth.metadata';
import { RoleGuard } from 'src/_common/guards/roles.guard';
import { OrderProduct } from './order-product.schema';
import { OrderProductService } from './order-product.service';
import { Product } from '../product/models/product.schema';

@Controller('order&product')
export class OrderProductController {
  constructor(private readonly orderProductService: OrderProductService) {}

  @ApiBearerAuth()
  @ApiTags('order&product')
  @ApiResponse({
    status: 200,
    type: Product,
    description: MessagesEnum.PAGINATED_RESPONSE,
  })
  @HasRoles(UserRoleEnum.CLIENT)
  @UseGuards(AuthGuard, RoleGuard)
  @Get('popularProducts')
  async getPopularProducts(): Promise<AggregatePaginateResult<OrderProduct>> {
    return await this.orderProductService.getPopularProducts();
  }
}
