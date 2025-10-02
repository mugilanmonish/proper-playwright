import { test } from '@fixtures/allPageFixture';

test('Demo Script', async ({ pages }) => {
    await pages.headerActions.clickLoginButton();
    await pages.loginActions.loginAs('mugilanShopper');
});
