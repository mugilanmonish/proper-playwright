// import { test as setup } from '@playwright/test';
// import { HeaderActions } from '@actions/header/header.actions';
// import { LoginActions } from '@actions/login.actions';
// import { fileURLToPath } from 'url';
// import { dirname, join } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// // usage
// const authFile = join(__dirname, '../../../playwright/.auth/user.json');

// setup('authenticate', async ({ browser }) => {
//     const context = await browser.newContext();
//     const page = await context.newPage();
//     const headerActions = new HeaderActions(page);
//     const loginActions = new LoginActions(page);
//     await headerActions.clickLoginButton();
//     await loginActions.loginAs({ userType: 'shopper', userCredential: 'mugilanShopper' });
//     await page.context().storageState({ path: authFile });
// });
