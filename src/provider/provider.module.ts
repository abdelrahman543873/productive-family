import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Provider, ProviderSchema } from './models/provider.schema';
import { ProviderRepository } from './provider.repository';
import { ProviderController } from './provider.controller';
import { ProviderService } from './provider.service';
import { VerificationModule } from '../verification/verification.module';
import { filename } from '../_common/utils/multer-file-name';
import { fileFilter } from '../_common/utils/multer-file-filter';
import { MulterModule } from '@webundsoehne/nest-fastify-file-upload';
import { diskStorage } from 'fastify-multer/lib';

@Module({
  imports: [
    VerificationModule,
    MulterModule.register({
      fileFilter,
      preservePath: true,
      storage: diskStorage({
        destination: './public',
        filename,
      }),
    }),
    MongooseModule.forFeature([
      { name: Provider.name, schema: ProviderSchema },
    ]),
  ],
  controllers: [ProviderController],
  providers: [ProviderService, ProviderRepository],
})
export class ProviderModule {}
