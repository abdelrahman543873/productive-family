import { testRequest } from 'test/request';
import { HTTP_METHODS_ENUM } from 'test/request.methods.enum';
import { productFactory } from '../../src/product/product.factory';
import { GET_LESS_THAN_PRICE } from '../endpoints/product';

describe('get less than price products suite case', () => {
  it('should get products with price less than 50', async () => {
    const falseProduct = await productFactory({
      info: { price: 50, amount: 0 },
    });
    const correctProduct = await productFactory({
      info: { price: 50, amount: 1 },
    });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: `${GET_LESS_THAN_PRICE}?limit=500`,
    });
    const correctResult = res.body.data.docs.filter(product => {
      return product._id === decodeURI(encodeURI(`${correctProduct._id}`));
    });
    const falseResult = res.body.data.docs.filter(product => {
      return product._id === decodeURI(encodeURI(`${falseProduct._id}`));
    });
    expect(falseResult.length).toBe(0);
    expect(correctResult.length).toBe(1);
    expect(correctResult[0].provider._id).toBeTruthy();
    expect(correctResult[0].category._id).toBeTruthy();
  });
});
