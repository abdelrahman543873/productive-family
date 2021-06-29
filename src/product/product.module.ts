import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './models/product.schema';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MulterModule } from '@webundsoehne/nest-fastify-file-upload';
import { fileFilter } from '../_common/utils/multer-file-filter';
import { diskStorage } from 'fastify-multer/lib';
import { filename } from '../_common/utils/multer-file-name';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MulterModule.register({
      fileFilter,
      preservePath: true,
      storage: diskStorage({
        destination: './public',
        filename,
      }),
    }),
  ],
  controllers: [ProductController],
  providers: [ProductRepository, ProductService],
  exports: [ProductRepository],
})
export class ProductModule {}
