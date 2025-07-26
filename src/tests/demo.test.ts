import { test } from '../fixtures/fixture';

test('Demo Script', async ({ factory }) => {
    test.slow();
    await factory.headerActions.clickLoginButton();
    await factory.loginActions.loginToShopper('mugilanrboom@gmail.com', 'Mugilanr@1');
});
