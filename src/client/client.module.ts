import { MongooseModule } from '@nestjs/mongoose';
import { Client, ClientSchema } from './models/client.schema';
import { ClientRepository } from './client.repository';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
  ],
  providers: [ClientRepository],
})
export class ClientModule {}
