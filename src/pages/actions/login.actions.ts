import type { Page } from '@playwright/test';
import { BasePage } from '@basePage/base.page';
import { logStep } from '@utils/common/allureUtility';
import { LoginSelectors } from '@selectors/login.selectors';
import { LoginRole } from 'enums/login.enum';
import type { LoginCredentials } from 'types/loginPage.types';

export class LoginActions extends BasePage {
    private loginSelector: LoginSelectors;

    constructor(protected readonly page: Page) {
        super(page);
        this.loginSelector = new LoginSelectors(page);
    }

    async loginAs(credentials: LoginCredentials): Promise<void> {
        switch (credentials.role) {
            case LoginRole.ADMIN_LOGIN:
                await this.webActions.click(
                    LoginRole.ADMIN_LOGIN,
                    this.loginSelector.accessSpecificLoginButton(LoginRole.ADMIN_LOGIN)
                );
                break;
            case LoginRole.MERCHANT_LOGIN:
                await this.webActions.click(
                    LoginRole.MERCHANT_LOGIN,
                    this.loginSelector.accessSpecificLoginButton(LoginRole.MERCHANT_LOGIN)
                );
                break;

            case LoginRole.SHOPPER_LOGIN:
                await this.webActions.click(
                    LoginRole.SHOPPER_LOGIN,
                    this.loginSelector.accessSpecificLoginButton(LoginRole.SHOPPER_LOGIN)
                );
                break;
        }
        await this.enterCredentials(credentials);
    }

    async enterCredentials(params: LoginCredentials): Promise<void> {
        await logStep(`Entered credentials for Shopper Login`, async () => {
            await this.webActions.fill(params.username, 'username', this.loginSelector.usernameInput);
            await this.webActions.fill(params.password, 'password', this.loginSelector.passwordInput);
            await this.webActions.click('login button', this.loginSelector.loginButton);
            await this.webAssertions.validatePartialText({
                elementName: 'User name',
                expectedValue: 'mugilan',
                selector: this.page.locator('//h3')
            });
        });
    }
}
