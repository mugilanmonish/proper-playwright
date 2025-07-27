import { test } from '@fixtures/allPageFixture';
import { LoginRole } from 'enums/login.enum';

test('Demo Script', async ({ pages }) => {
    test.slow();
    await pages.headerActions.clickLoginButton();
    await pages.loginActions.loginAs({
        username: 'mugilanrboom@gmail.com',
        password: 'Mugilanr@1',
        role: LoginRole.SHOPPER_LOGIN
    });
});
