import { test } from '@fixtures/allPageFixture';
import jsonUtility from '@utils/common/jsonUtility';
import type { Shopper } from 'types/env.types';

// testdata
const userData: Shopper = jsonUtility.getShopperData('mugiRock');
const addressId: number = userData.addresses['blrAddress'].addressId;
const productName: string = jsonUtility.getProductById('kids', 27);

test.beforeEach('Login to app', async ({ pages }) => {
    await pages.factory.headerActions.clickLoginButton();
    await pages.factory.loginActions.loginAs(userData);
});

test('Buy a product with cod and cancel order', { tag: ['@regression', '@cod'] }, async ({ pages }) => {
    await pages.factory.headerActions.searchForItem(productName);
    await pages.factory.productDescriptionActions.clickProduct(productName);
    await pages.factory.productDescriptionActions.addToCart();
    await pages.factory.headerActions.clickCartIcon();
    await pages.factory.cartActions.clickBuyNow();
    await pages.factory.addressActions.selectAddress(addressId);
    const orderId: string = await pages.factory.paymentActions.codPayment('COD');
    await pages.factory.headerActions.clickMenu();
    await pages.factory.accountSettingActions.selectMenu('My Orders');
    await pages.factory.myOrdersActions.cancelOrderByOrderId(orderId);
});

test.afterEach('Cleanup Cart', async ({ pages }) => {
    await pages.apiHelper.deleteAllProductFromCart();
});
