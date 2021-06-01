import { Cart } from './models/cart.schema';
import { Body, Controller, Get, Post, UseGuards, Query } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartInput } from './inputs/add-to-cart.input';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { UserRoleEnum, MessagesEnum } from 'src/_common/app.enum';
import { AuthGuard } from 'src/_common/guards/auth.guard';
import { HasRoles } from 'src/_common/guards/auth.metadata';
import { RoleGuard } from 'src/_common/guards/roles.guard';
import { Product } from 'src/product/models/product.schema';
import { Pagination } from 'src/_common/utils/pagination.input';
import { AggregatePaginateResult } from 'mongoose';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiBearerAuth()
  @ApiTags('client')
  @ApiResponse({ status: 201, type: Cart })
  @HasRoles(UserRoleEnum.CLIENT)
  @UseGuards(AuthGuard, RoleGuard)
  @Post('addToCart')
  async addToCart(@Body() input: AddToCartInput): Promise<Cart> {
    return await this.cartService.addToCart(input);
  }

  @ApiBearerAuth()
  @ApiTags('client')
  @ApiResponse({
    status: 201,
    type: Product,
    description: MessagesEnum.PAGINATED_RESPONSE,
  })
  @HasRoles(UserRoleEnum.CLIENT)
  @UseGuards(AuthGuard, RoleGuard)
  @Get()
  async getCart(
    @Query() pagination: Pagination,
  ): Promise<AggregatePaginateResult<Cart>> {
    return await this.cartService.getCart(pagination);
  }
}
