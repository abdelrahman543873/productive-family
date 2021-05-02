import { Body, Controller, Get, Post } from '@nestjs/common';
import { FaqService } from './faq.service';
import { AddFaqInput } from './inputs/faq.input';

@Controller('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Post()
  async addFaq(@Body() input: AddFaqInput) {
    return await this.faqService.addFaq(input);
  }

  @Get()
  async getFaqs() {
    return await this.faqService.getFaqs();
  }
}
