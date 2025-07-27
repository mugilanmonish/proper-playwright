import type { Page } from '@playwright/test';
import { BasePage } from '@basePage/base.page';
import { logStep } from '@utils/common/allureUtility';
import { LoginSelectors } from '@selectors/login.selectors';
import type { LoginCredentials } from 'types/loginPage.types';

export class LoginActions extends BasePage {
    private loginSelector: LoginSelectors;

    constructor(protected readonly page: Page) {
        super(page);
        this.loginSelector = new LoginSelectors(page);
    }

    /**
     * Logs in using the provided credentials for a specific user role.
     *
     * This method clicks the login button corresponding to the user's role
     * and enters the provided credentials to complete the login process.
     *
     * @param credentials - An object containing the login credentials and user role.
     * @returns A promise that resolves when the login process is complete.
     */
    async loginAs(credentials: LoginCredentials): Promise<void> {
        const { role } = credentials;
        await this.webActions.click(role, this.loginSelector.userRoleLoginButton(role));
        await this.enterCredentials(credentials);
    }

    /**
     * Enters the provided login credentials into the login form and submits it.
     *
     * @param params - An object containing the login credentials and user role.
     * @param params.username - The username to enter.
     * @param params.password - The password to enter.
     * @param params.role - The role of the user for logging purposes.
     * @returns A promise that resolves when the credentials have been entered and the login process is complete.
     *
     * @remarks
     * This method logs the step, fills in the username and password fields, clicks the login button,
     * and validates that the expected partial text appears on the page after login.
     */
    async enterCredentials(params: LoginCredentials): Promise<void> {
        await logStep(`Entered credentials for ${params.role}`, async () => {
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
