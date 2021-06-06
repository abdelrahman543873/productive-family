import { testRequest } from 'test/request';
import { HTTP_METHODS_ENUM } from 'test/request.methods.enum';
import { GET_LESS_THAN_PRICE } from '../endpoints/product';
import { productUnitFactory } from '../../src/product-unit/product-unit.factory';

describe('get less than price products suite case', () => {
  it('should get products with price less than 50', async () => {
    const falseProduct = await productUnitFactory({ price: 60, quantity: 0 });
    const correctProduct = await productUnitFactory({ price: 50, quantity: 1 });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: `${GET_LESS_THAN_PRICE}/50?limit=500`,
    });
    const correctResult = res.body.data.docs.filter(product => {
      return product._id === decodeURI(encodeURI(`${correctProduct.product}`));
    });
    const falseResult = res.body.data.docs.filter(product => {
      return product._id === decodeURI(encodeURI(`${falseProduct.product}`));
    });
    expect(falseResult.length).toBe(0);
    expect(correctResult.length).toBe(1);
    expect(correctResult[0].provider._id).toBeTruthy();
    expect(correctResult[0].category._id).toBeTruthy();
  });
});
