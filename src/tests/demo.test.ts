import { test } from '@fixtures/allPageFixture';

test('Demo Script', async ({ pages }) => {
    test.slow();
    await pages.headerActions.clickLoginButton();
    await pages.loginActions.loginToShopper('mugilanrboom@gmail.com', 'Mugilanr@1');
});
