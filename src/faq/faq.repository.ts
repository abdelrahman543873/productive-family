import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Faq, FaqDocument } from './models/faq.schema';
import { BaseRepository } from '../_common/generics/repository.abstract';
import { AddFaqInput } from './inputs/faq.input';

@Injectable()
export class FaqRepository extends BaseRepository<Faq> {
  constructor(@InjectModel(Faq.name) private faqSchema: Model<FaqDocument>) {
    super(faqSchema);
  }

  async getFaqs(): Promise<Faq[]> {
    return await this.faqSchema.aggregate([{ $match: {} }]);
  }

  async addFaq(input: AddFaqInput): Promise<Faq> {
    return await this.faqSchema.create(input);
  }
}
