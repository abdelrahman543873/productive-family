import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Verification, VerificationSchema } from './models/verification.schema';
import { VerificationRepository } from './verification.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Verification.name, schema: VerificationSchema },
    ]),
  ],
  providers: [VerificationRepository],
  exports: [VerificationRepository],
})
export class VerificationModule {}
