import { Product } from 'src/product/models/product.schema';
import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProviderAddProductInput } from './inputs/provider-add-product.input';
import { ProductService } from './product.service';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserRoleEnum } from 'src/_common/app.enum';
import { AuthGuard } from 'src/_common/guards/auth.guard';
import { HasRoles } from 'src/_common/guards/auth.metadata';
import { RoleGuard } from 'src/_common/guards/roles.guard';
import { FilesInterceptor } from '@webundsoehne/nest-fastify-file-upload';
import { FileValidationInterceptor } from 'src/_common/interceptors/file-upload.interceptor';
import { File } from 'fastify-multer/lib/interfaces';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiBearerAuth()
  @ApiTags('provider')
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, type: Product })
  @HasRoles(UserRoleEnum.PROVIDER)
  @UseGuards(AuthGuard, RoleGuard)
  @UseInterceptors(FileValidationInterceptor)
  @UseInterceptors(FilesInterceptor('imagesURLs'))
  @Post('providerAddProduct')
  async providerAddProduct(
    @Body() input: ProviderAddProductInput,
    @UploadedFiles() files?: Array<File>,
  ): Promise<Product> {
    return await this.productService.providerAddProduct(input, files);
  }
}
