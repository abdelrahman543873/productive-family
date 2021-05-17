import { Review } from './models/review.schema';
import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
import { UserRoleEnum } from 'src/_common/app.enum';
import { AuthGuard } from 'src/_common/guards/auth.guard';
import { HasRoles } from 'src/_common/guards/auth.metadata';
import { RoleGuard } from 'src/_common/guards/roles.guard';
import { ReviewService } from './review.service';
import { REQUEST } from '@nestjs/core';
import { RequestContext } from 'src/_common/request.interface';
import { PaginateResult } from 'mongoose';
import { ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { MessagesEnum } from '../_common/app.enum';
import { PaginationInterface } from 'src/_common/interfaces/pagination.interface';

@Controller('reviews')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    @Inject(REQUEST) private readonly request: RequestContext,
  ) {}

  @ApiBearerAuth()
  @ApiTags('reviews')
  @ApiResponse({
    status: 200,
    type: Review,
    description: MessagesEnum.PAGINATED_RESPONSE,
  })
  @HasRoles(UserRoleEnum.DRIVER)
  @UseGuards(AuthGuard, RoleGuard)
  @Get('driver')
  async getDriverReviews(
    @Query() query: PaginationInterface,
  ): Promise<PaginateResult<Review>> {
    return await this.reviewService.getDriverReviews(
      this.request.currentUser._id,
      query,
    );
  }
}
