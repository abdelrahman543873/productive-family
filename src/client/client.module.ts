import { MongooseModule } from '@nestjs/mongoose';
import { Client, ClientSchema } from './models/client.schema';
import { ClientRepository } from './client.repository';
import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { VerificationModule } from 'src/verification/verification.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
    VerificationModule,
  ],
  controllers: [ClientController],
  providers: [ClientRepository, ClientService],
})
export class ClientModule {}
