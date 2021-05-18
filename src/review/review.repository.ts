import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, PaginateResult } from 'mongoose';
import { BaseRepository } from 'src/_common/generics/repository.abstract';
import { Review, ReviewDocument } from './models/review.schema';
import { ObjectID } from 'mongodb';
import { Pagination } from '../_common/utils/pagination';

@Injectable()
export class ReviewRepository extends BaseRepository<Review> {
  constructor(
    @InjectModel(Review.name)
    private reviewSchema: PaginateModel<ReviewDocument>,
  ) {
    super(reviewSchema);
  }
  async getDriverReviews(
    reviewed: ObjectID,
    input: Pagination,
  ): Promise<PaginateResult<Review>> {
    return await this.reviewSchema.paginate(
      { reviewed },
      {
        offset: input.offset * input.limit,
        limit: input.limit,
      },
    );
  }
}
