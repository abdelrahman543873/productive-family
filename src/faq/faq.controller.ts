import { Body, Controller, Get, Post } from '@nestjs/common';
import { FaqService } from './faq.service';
import { AddFaqInput } from './inputs/faq.input';
import { Faq } from './models/faq.schema';

@Controller('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Post('addFaq')
  async addFaq(@Body() input: AddFaqInput): Promise<Faq> {
    return await this.faqService.addFaq(input);
  }

  @Get('getFaqs')
  async getFaqs(): Promise<Faq[]> {
    return await this.faqService.getFaqs();
  }
}
