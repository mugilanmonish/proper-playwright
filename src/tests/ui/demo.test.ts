import { test } from '@fixtures/allPageFixture';
import jsonUtility from 'utils/common/jsonUtility';

// testdata
const userData = jsonUtility.getShopperData('mugilanShopper');
const addressId: number = userData.addresses['blrAddress'].addressId;
const productName: string = jsonUtility.getProductById('kids', 27);

test.beforeEach('Login', async ({ pages }) => {
    await pages.factory.headerActions.clickLoginButton();
    await pages.factory.loginActions.loginAs(userData);
});

test('Buy a product via Add to cart', async ({ pages }) => {
    await pages.factory.headerActions.searchForItem(productName);
    await pages.factory.productDescriptionActions.clickProduct(productName);
    await pages.factory.productDescriptionActions.addToCart();
    await pages.factory.headerActions.clickCartIcon();
    await pages.factory.cartActions.clickBuyNow();
    await pages.factory.addressActions.clickAddress(addressId);
});

test.afterEach('Cleanup Cart', async ({ pages }) => {
    await pages.apiHelper.deleteAllProductFromCart();
});
