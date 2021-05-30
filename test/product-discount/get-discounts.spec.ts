import { testRequest } from 'test/request';
import { HTTP_METHODS_ENUM } from 'test/request.methods.enum';
import { GET_DISCOUNTS } from 'test/endpoints/product-discount';
import { clientFactory } from 'src/client/client.factory';
import { SpatialType } from 'src/_common/spatial-schemas/spatial.enum';
import { TestLocations } from 'test/test-files/test-locations.enum';
import { productFactory } from 'src/product/product.factory';
import { providerFactory } from 'src/provider/provider.factory';
import { productDiscountFactory } from '../../src/product-discount/product-discount.factory';

describe('get discounts suite case', () => {
  it('should get discounts', async () => {
    const client = await clientFactory({
      location: {
        type: SpatialType.Point,
        coordinates: TestLocations.SIDI_BISHR,
      },
    });
    const provider = await providerFactory({
      maxDistance: 10,
      location: {
        type: SpatialType.Point,
        coordinates: TestLocations.EL_RAML,
      },
    });
    const discountProduct = await productFactory({ provider: provider._id });
    await productDiscountFactory({
      product: discountProduct._id,
      providerLocation: provider.location,
    });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: `${GET_DISCOUNTS}?limit=500`,
      token: client.token,
    });
    const result = res.body.data.docs.filter(product => {
      return product._id === decodeURI(encodeURI(`${discountProduct._id}`));
    });
    expect(result.length).toBe(1);
    expect(result[0].unit._id).toBeTruthy();
    expect(result[0].provider._id).toBeTruthy();
    expect(result[0].category._id).toBeTruthy();
    expect(result[0].discount._id).toBeTruthy();
  });
});
