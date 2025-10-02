import { expect, type Page } from '@playwright/test';
import { BasePage } from '@basePage/base.page';
import { logStep } from '@utils/common/allureUtility';
import { LoginSelectors } from '@selectors/login.selectors';
import type { LoginCredentials, UserType } from 'types/loginPage.types';
import jsonUtility from '@utils/common/jsonUtility';
import { HeaderSelector } from '@selectors/header/header.selector';

export class LoginActions extends BasePage {
    private loginSelector: LoginSelectors;
    private headerSelector: HeaderSelector;

    constructor(protected readonly page: Page) {
        super(page);
        this.loginSelector = new LoginSelectors(page);
        this.headerSelector = new HeaderSelector(page);
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
    async loginAs({ userType, userCredential }: { userType: UserType; userCredential: string }): Promise<void> {
        let user: LoginCredentials;
        switch (userType) {
            case 'shopper':
                user = jsonUtility.getShopperUser(userCredential);
                break;
            case 'admin':
                user = jsonUtility.getAdminUser(userCredential);
                break;
            case 'merchant':
                user = jsonUtility.getMerchantUser(userCredential);
                break;
            default:
                throw new Error(`Unsupported user type: ${userType}`);
        }
        const { role } = user;
        await this.webActions.click(role, this.loginSelector.userRoleLoginButton(role));
        await this.enterCredentials(user);
        await expect(this.page.locator('div[class*="featuredProducts_cardContainer"] > div')).toHaveCount(12);
    }

    /**
     * Enters the provided login credentials into the login form and submits it.
     * @param email - The email to enter.
     * @param password - The password to enter.
     * @param role - The role of the user for logging purposes.
     * @returns A promise that resolves when the credentials have been entered and the login process is complete.
     *
     * @remarks
     * This method logs the step, fills in the username and password fields, clicks the login button,
     * and validates that the expected partial text appears on the page after login.
     */
    async enterCredentials(user: LoginCredentials): Promise<void> {
        await logStep(`Entered credentials for ${user.role}`, async () => {
            await this.webActions.fill(user.email, 'username', this.loginSelector.usernameInput);
            await this.webActions.fill(user.password, 'password', this.loginSelector.passwordInput);
            await this.webActions.click('login button', this.loginSelector.loginButton);
            await this.webAssertions.validateVisibility({
                selector: this.headerSelector.usernameText,
                elementName: 'Username',
                isVisible: true
            });
        });
    }
}
