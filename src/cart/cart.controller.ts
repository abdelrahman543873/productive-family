import { Cart } from './models/cart.schema';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartInput } from './inputs/add-to-cart.input';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { UserRoleEnum } from 'src/_common/app.enum';
import { AuthGuard } from 'src/_common/guards/auth.guard';
import { HasRoles } from 'src/_common/guards/auth.metadata';
import { RoleGuard } from 'src/_common/guards/roles.guard';

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
}
