import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Provider, ProviderSchema } from './models/provider.schema';
import { ProviderRepository } from './provider.repository';
import { ProviderController } from './provider.controller';
import { ProviderService } from './provider.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Provider.name, schema: ProviderSchema },
    ]),
  ],
  controllers: [ProviderController],
  providers: [ProviderService, ProviderRepository],
})
export class ProviderModule {}
