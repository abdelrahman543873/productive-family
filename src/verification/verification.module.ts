import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Verification, VerificationSchema } from './models/verification.schema';
import { VerificationController } from './verification.controller';
import { VerificationRepository } from './verification.repository';
import { VerificationService } from './verification.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Verification.name, schema: VerificationSchema },
    ]),
  ],
  controllers: [VerificationController],
  providers: [VerificationRepository, VerificationService],
  exports: [VerificationRepository],
})
export class VerificationModule {}
