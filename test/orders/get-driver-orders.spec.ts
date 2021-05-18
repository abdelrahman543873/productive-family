import { testRequest } from 'test/request';
import { HTTP_METHODS_ENUM } from 'test/request.methods.enum';
import { GET_DRIVER_REVIEWS } from 'test/endpoints/reviews';
import { driverFactory } from '../../src/driver/driver.factory';
import { reviewsFactory } from '../../src/review/review.factory';
import { rollbackDbForOrder } from './rollback-db-for-order';
describe('get driver reviews suite case', () => {
  afterEach(async () => {
    await rollbackDbForOrder();
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
});
