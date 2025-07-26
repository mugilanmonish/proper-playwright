import type { Page } from '@playwright/test';
import { BasePage } from '@basePage/base.page';
import { logStep } from '@utils/common/allureUtility';
import { LoginSelectors } from '@selectors/login.selectors';

export class LoginActions extends BasePage {
    private loginSelector: LoginSelectors;

    constructor(protected readonly page: Page) {
        super(page);
        this.loginSelector = new LoginSelectors(page);
    }

    async loginToShopper(username: string, password: string): Promise<void> {
        await logStep(`Entered credentials for Shopper Login`, async () => {
            await this.webActions.fill(username, 'username', this.loginSelector.usernameInput);
            await this.webActions.fill(password, 'password', this.loginSelector.passwordInput);
            await this.webActions.click('login button', this.loginSelector.loginButton);
            await this.webAssertions.validatePartialText({
                elementName: 'User name',
                expectedValue: 'mugilan',
                selector: this.page.locator('//h3')
            });
        });
    }
}
