import { test } from '@fixtures/allPageFixture';

test('Demo Script', async ({ pages }) => {
    await pages.headerActions.clickLoginButton();
    await pages.loginActions.loginAs({ userType: 'shopper', userCredential: 'mugilanShopper' });
    await pages.headerActions.searchForItem('us polo kids');
});
