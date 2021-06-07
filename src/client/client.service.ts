import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { VerificationRepository } from 'src/verification/verification.repository';
import { BaseHttpException } from 'src/_common/exceptions/base-http-exception';
import { HelperService } from 'src/_common/helper/helper.service';
import { RequestContext } from 'src/_common/request.interface';
import { createVerificationCode } from 'src/_common/utils/sms-token';
import { generateAuthToken } from 'src/_common/utils/token-utils';
import { sendMessage } from 'src/_common/utils/twilio';
import { ClientRepository } from './client.repository';
import { ClientRegisterInput } from './inputs/client-register.input';
import { Client } from './models/client.schema';
import { SocialRegisterInput } from './inputs/social-register.input';
import { SocialLoginInput } from './inputs/social-login.input';
import { ClientUpdateProfileInput } from './inputs/client-update-profile';
import { bcryptCheckPass } from 'src/_common/utils/bcryptHelper';
import { File } from 'fastify-multer/lib/interfaces';
import { ToggleFavProductInput } from './inputs/toggle-fav-product.input';
import { CheckoutInput } from './inputs/checkout.input';
import { AddressRepository } from '../address/address.repository';
import { ObjectID } from 'mongodb';
import { PaymentRepository } from '../payment/payment.repository';
import { OrderRepository } from '../order/order.repository';
import { CartRepository } from '../cart/cart.repository';
import { Product } from '../product/models/product.schema';
import { DiscountRepository } from '../discount/driver.repository';
import { Order } from '../order/models/order.schema';
import { ProductUnitRepository } from '../product-unit/product-unit.repository';
import { Provider } from '../provider/models/provider.schema';
import { OrderProductRepository } from '../order-product/order-product.repository';
@Injectable()
export class ClientService {
  constructor(
    private readonly cartRepo: CartRepository,
    private readonly orderRepo: OrderRepository,
    private readonly helperService: HelperService,
    private readonly clientRepo: ClientRepository,
    private readonly paymentRepo: PaymentRepository,
    private readonly addressRepo: AddressRepository,
    private readonly discountRepo: DiscountRepository,
    private readonly orderProductRepo: OrderProductRepository,
    private readonly verificationRepo: VerificationRepository,
    private readonly productUnitRepo: ProductUnitRepository,
    @Inject(REQUEST) private readonly request: RequestContext,
  ) {}

  async register(input: ClientRegisterInput): Promise<Client> {
    const alreadyRegisteredMobile = await this.helperService.getExistingUser({
      mobile: input.mobile,
    });
    if (alreadyRegisteredMobile)
      throw new BaseHttpException(this.request.lang, 602);
    const client = await this.clientRepo.register(input);
    client.token = generateAuthToken(client._id);
    const verificationCode = await this.verificationRepo.addVerificationCode({
      user: client._id,
      mobile: client.mobile,
      ...createVerificationCode(),
    });
    await sendMessage({
      to: client.mobile,
      body: verificationCode.code,
    });
    return client;
  }

  async socialRegister(input: SocialRegisterInput): Promise<Client> {
    return await this.clientRepo.socialRegister(input);
  }

  async socialLogin(input: SocialLoginInput): Promise<Client> {
    const client = await this.clientRepo.socialLogin(input);
    client.token = generateAuthToken(client._id);
    return client;
  }

  async updateProfile(
    input: ClientUpdateProfileInput,
    file?: File,
  ): Promise<Client> {
    const passwordValidation = input.password
      ? await bcryptCheckPass(input.password, this.request.currentUser.password)
      : true;
    if (!passwordValidation)
      throw new BaseHttpException(this.request.lang, 607);
    return await this.clientRepo.updateProfile(
      this.request.currentUser._id,
      input,
      file,
    );
  }

  async toggleFavoriteProduct(input: ToggleFavProductInput): Promise<Client> {
    if (this.request.currentUser.favProducts.includes(input.product))
      return await this.clientRepo.removeFavoriteProduct(
        this.request.currentUser._id,
        input.product,
      );
    return await this.clientRepo.addFavoriteProduct(
      this.request.currentUser._id,
      input.product,
    );
  }

  async checkout(input: CheckoutInput): Promise<Order> {
    const address = await this.addressRepo.findOne({
      _id: new ObjectID(input.address),
    });
    if (!address) throw new BaseHttpException(this.request.lang, 618);
    const payment = await this.paymentRepo.findOne({
      _id: new ObjectID(input.payment),
    });
    if (!payment) throw new BaseHttpException(this.request.lang, 619);
    const cartProducts = await this.cartRepo.getClientCartProductsForCheckout(
      this.request.currentUser._id,
    );
    // if cart is empty through an error
    if (!cartProducts.length)
      throw new BaseHttpException(this.request.lang, 620);
    const product = cartProducts[0]?.product as Product;
    const order = await this.orderRepo.add({
      address: address._id,
      payment: payment._id,
      provider: product.provider,
      client: this.request.currentUser._id,
      orderNumber: await this.orderRepo.getOrdersNumber(),
      ...(input.code && {
        discount: (await this.discountRepo.getActiveDiscountByCode(input.code))
          ._id,
      }),
    });
    const orderProducts = await Promise.all(
      cartProducts.map(async cartProduct => {
        const product = cartProduct.product as Product;
        const provider = product.provider as Provider;
        const productUnit = await this.productUnitRepo.getProductByUnit(
          product._id,
          cartProduct.unit as ObjectID,
        );
        return {
          order: order._id,
          product: product._id,
          amount: cartProduct.amount,
          providerLocation: provider.location,
          price: productUnit.price,
        };
      }),
    );
    await this.orderProductRepo.addMany(orderProducts);
    await this.cartRepo.clearClientCart(this.request.currentUser._id);
    return order;
  }
}
