import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddFaqInput } from './inputs/faq.input';
import { Faq, FaqDocument } from './models/faq.schema';

@Injectable()
export class FaqRepository {
  constructor(@InjectModel(Faq.name) private faqSchema: Model<FaqDocument>) {}

  async addFaq(input: AddFaqInput): Promise<Faq> {
    return await this.faqSchema.create(input);
  }

  async getFaqs(): Promise<Faq[]> {
    return await this.faqSchema.aggregate([{ $match: {} }]);
  }
}
