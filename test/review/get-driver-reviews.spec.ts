import { testRequest } from 'test/request';
import { HTTP_METHODS_ENUM } from 'test/request.methods.enum';
import { GET_DRIVER_REVIEWS } from 'test/endpoints/reviews';
import { rollbackDbForReview } from './rollback-db-for-review';
import { driverFactory } from '../../src/driver/driver.factory';
import { reviewsFactory } from '../../src/review/review.factory';
describe('get driver reviews suite case', () => {
  afterEach(async () => {
    await rollbackDbForReview();
  });
  it('get driver reviews', async () => {
    const driver = await driverFactory();
    await reviewsFactory(10, { reviewed: driver._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: GET_DRIVER_REVIEWS,
      token: driver.token,
    });
    expect(res.body.data.docs.length).toBe(10);
  });

  it('get driver reviews with offset', async () => {
    const driver = await driverFactory();
    await reviewsFactory(10, { reviewed: driver._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: `${GET_DRIVER_REVIEWS}?offset=10&limit=10`,
      token: driver.token,
    });
    expect(res.body.data.offset).toBe(100);
  });
});
