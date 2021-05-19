import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/_common/generics/repository.abstract';
import { Payment, PaymentDocument } from './models/payment.schema';

@Injectable()
export class PaymentRepository extends BaseRepository<Payment> {
  constructor(
    @InjectModel(Payment.name) private paymentSchema: Model<PaymentDocument>,
  ) {
    super(paymentSchema);
  }
}
