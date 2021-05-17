import * as faker from 'faker';
import { Review } from './models/review.schema';
import { clientFactory } from '../client/client.factory';
import { driverFactory } from '../driver/driver.factory';
import { ObjectID } from 'mongodb';
import { ReviewRepo } from 'test/review/review-test-repo';
interface reviewType {
  reviewer?: ObjectID;
  reviewed?: ObjectID;
  rating?: number;
  review?: string;
  order?: ObjectID;
}
export const buildReviewParams = async (
  obj: reviewType = <any>{},
): Promise<Review> => {
  return {
    reviewer: obj.reviewer || (await clientFactory())._id,
    reviewed: obj.reviewed || (await driverFactory())._id,
    rating: obj.rating || faker.datatype.number(5),
    review: obj.review || faker.commerce.productDescription(),
    order: obj.order,
  };
};

export const reviewsFactory = async (
  count = 10,
  obj: reviewType = {},
): Promise<Review[]> => {
  const reviews: Review[] = [];
  for (let i = 0; i < count; i++) {
    reviews.push(await buildReviewParams(obj));
  }
  return (await ReviewRepo()).addMany(reviews);
};

export const reviewFactory = async (obj: reviewType = {}): Promise<Review> => {
  const params: Review = await buildReviewParams(obj);
  return (await ReviewRepo()).add(params);
};
