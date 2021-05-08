import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { HasRoles } from 'src/shared/guards/auth.metadata';
import { RoleGuard } from 'src/shared/guards/roles.guard';
import { UserRoleEnum } from 'src/shared/user.enum';
import { FaqService } from './faq.service';
import { AddFaqInput } from './inputs/faq.input';
import { Faq } from './models/faq.schema';

@Controller('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @ApiBearerAuth()
  @ApiResponse({ status: 201, type: AddFaqInput })
  @HasRoles(UserRoleEnum.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @Post('addFaq')
  async addFaq(@Body() input: AddFaqInput): Promise<Faq> {
    return await this.faqService.addFaq(input);
  }

  @Get('getFaqs')
  async getFaqs(): Promise<Faq[]> {
    return await this.faqService.getFaqs();
  }
}
