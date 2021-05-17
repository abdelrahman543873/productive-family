import { Review } from './models/review.schema';
import { ReviewRepository } from './review.repository';
import { Injectable } from '@nestjs/common';
import { ObjectID } from 'mongodb';
import { PaginateResult } from 'mongoose';
import { PaginationInterface } from '../_common/interfaces/pagination.interface';

@Injectable()
export class ReviewService {
  constructor(private readonly reviewRepo: ReviewRepository) {}
  async getDriverReviews(
    id: ObjectID,
    input: PaginationInterface,
  ): Promise<PaginateResult<Review>> {
    return await this.reviewRepo.getDriverReviews(id, input);
  }
}
