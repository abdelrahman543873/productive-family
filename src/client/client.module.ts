import { MongooseModule } from '@nestjs/mongoose';
import { Client, ClientSchema } from './models/client.schema';
import { ClientRepository } from './client.repository';
import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { VerificationModule } from 'src/verification/verification.module';
import { MulterModule } from '@webundsoehne/nest-fastify-file-upload';
import { fileFilter } from '../_common/utils/multer-file-filter';
import { diskStorage } from 'fastify-multer/lib';
import { filename } from 'src/_common/utils/multer-file-name';

@Module({
  imports: [
    MulterModule.register({
      fileFilter,
      preservePath: true,
      storage: diskStorage({
        destination: './public',
        filename,
      }),
    }),
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
    VerificationModule,
  ],
  controllers: [ClientController],
  providers: [ClientRepository, ClientService],
})
export class ClientModule {}
