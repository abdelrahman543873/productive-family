import { Injectable } from '@nestjs/common';
import { AddFaqInput } from './inputs/faq.input';
import { FaqRepository } from './faq.repository';

@Injectable()
export class FaqService {
  constructor(private readonly faqRepo: FaqRepository) {}

  async addFaq(input: AddFaqInput) {
    return await this.faqRepo.addFaq(input);
  }

  async getFaqs() {
    return await this.faqRepo.getFaqs();
  }
}
