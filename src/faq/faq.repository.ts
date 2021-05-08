import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Faq, FaqDocument } from './models/faq.schema';
import { BaseRepository } from '../shared/generics/repository.abstract';

@Injectable()
export class FaqRepository extends BaseRepository<Faq> {
  constructor(@InjectModel(Faq.name) private faqSchema: Model<FaqDocument>) {
    super(faqSchema);
  }

  async getFaqs(): Promise<Faq[]> {
    return await this.faqSchema.aggregate([{ $match: {} }]);
  }
}
