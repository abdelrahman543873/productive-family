import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/_common/guards/auth.guard';
import { HasRoles } from 'src/_common/guards/auth.metadata';
import { RoleGuard } from 'src/_common/guards/roles.guard';
import { UserRoleEnum } from 'src/_common/user.enum';
import { FaqService } from './faq.service';
import { AddFaqInput } from './inputs/faq.input';
import { Faq } from './models/faq.schema';

@Controller('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @ApiBearerAuth()
  @ApiTags('faq')
  @ApiResponse({ status: 201, type: AddFaqInput })
  @HasRoles(UserRoleEnum.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @Post('addFaq')
  async addFaq(@Body() input: AddFaqInput): Promise<Faq> {
    return await this.faqService.addFaq(input);
  }

  @ApiTags('faq')
  @ApiResponse({ status: 200, type: [AddFaqInput] })
  @Get('getFaqs')
  async getFaqs(): Promise<Faq[]> {
    return await this.faqService.getFaqs();
  }
}
