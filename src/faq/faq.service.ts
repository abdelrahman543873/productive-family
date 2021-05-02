import { Injectable } from '@nestjs/common';
import { AddFaqInput } from './inputs/faq.input';
import { FaqRepository } from './faq.repository';
import { Faq } from './models/faq.schema';

@Injectable()
export class FaqService {
  constructor(private readonly faqRepo: FaqRepository) {}

  async addFaq(input: AddFaqInput): Promise<Faq> {
    return await this.faqRepo.addFaq(input);
  }

  async getFaqs(): Promise<Faq[]> {
    return await this.faqRepo.getFaqs();
  }
}
