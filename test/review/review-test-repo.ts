import { ReviewRepository } from './../../src/review/review.repository';
import { moduleRef } from 'test/before-test-run';

export const ReviewRepo = async (): Promise<ReviewRepository> =>
  (await moduleRef()).get<ReviewRepository>(ReviewRepository);
