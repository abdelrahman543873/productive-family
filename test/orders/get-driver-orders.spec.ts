import { testRequest } from 'test/request';
import { HTTP_METHODS_ENUM } from 'test/request.methods.enum';
import { driverFactory } from '../../src/driver/driver.factory';
import { rollbackDbForOrder } from './rollback-db-for-order';
import { ordersFactory, orderFactory } from '../../src/order/order.factory';
import { GET_DRIVER_ORDERS } from '../endpoints/order';
import { OrderEnum } from 'src/order/order.enum';
import { providerFactory } from '../../src/provider/provider.factory';
import { productFactory } from '../../src/product/product.factory';
import { orderProductFactory } from 'src/order-product/order-product.factory';
describe('get driver orders suite case', () => {
  afterEach(async () => {
    await rollbackDbForOrder();
  });
  it('should get all driver orders', async () => {
    const driver = await driverFactory();
    await ordersFactory(10, { driver: driver._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: GET_DRIVER_ORDERS,
      token: driver.token,
    });
    expect(res.body.data.docs.length).toBe(10);
  });

  it('should get drivers orders filtered by provider', async () => {
    const driver = await driverFactory();
    const provider = await providerFactory();
    await ordersFactory(10, { driver: driver._id, provider: provider._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: `${GET_DRIVER_ORDERS}?provider=${provider._id}`,
      token: driver.token,
    });
    expect(res.body.data.docs.length).toBe(10);
  });

  it('should get driver active orders ', async () => {
    const driver = await driverFactory();
    await ordersFactory(10, { driver: driver._id, state: OrderEnum.SHIPPING });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: `${GET_DRIVER_ORDERS}?state=${OrderEnum.SHIPPING}`,
      token: driver.token,
    });
    expect(res.body.data.docs.length).toBe(10);
  });

  it('should get orders and their total', async () => {
    const driver = await driverFactory();
    const order = await orderFactory({
      driver: driver._id,
      state: OrderEnum.SHIPPING,
    });
    const product = await productFactory();
    await orderProductFactory({
      product: product._id,
      order: order._id,
      price: 10,
    });
    await orderProductFactory({
      product: product._id,
      order: order._id,
      price: 10,
    });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: `${GET_DRIVER_ORDERS}`,
      token: driver.token,
    });
    expect(res.body.data.docs[0].total).toBe(20);
  });
});
