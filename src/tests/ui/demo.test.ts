import { test } from '@fixtures/allPageFixture';

test.beforeEach('Login', async ({ pages }) => {
    await pages.factory.headerActions.clickLoginButton();
    await pages.factory.loginActions.loginAs({ userType: 'shopper', userCredential: 'mugilanShopper' });
});

test('Buy a product via Add to cart', async ({ pages }) => {
    await pages.factory.headerActions.searchForItem('us polo kids');
    await pages.factory.productDescriptionActions.clickProduct('us polo kids');
    await pages.factory.productDescriptionActions.addToCart();
    await pages.factory.headerActions.clickCartIcon();
    await pages.factory.cartActions.clickBuyNow();
    await pages.factory.addressActions.clickAddress(132264);
});

test.afterEach('Cleanup Cart', async ({ pages }) => {
    await pages.apiHelper.deleteAllProductFromCart();
});
