import type { Page } from '@playwright/test';
import { BasePage } from '@basePage/base.page';
import { HeaderSelector } from '@selectors/header/header.selector';

export class HeaderActions extends BasePage {
    private selectors: HeaderSelector;

    constructor(protected readonly page: Page) {
        super(page);
        this.selectors = new HeaderSelector(page);
    }

    /**
     * Launches the application and performs a hover and click action on the login button.
     *
     * @returns {Promise<void>} A promise that resolves when the login button has been clicked.
     * @throws Will throw an error if launching the app or clicking the login button fails.
     */
    async clickLoginButton(): Promise<void> {
        await this.launchTheApp();
        await this.webActions.hoverAndClick('login button', this.selectors.loginButton);
    }
}
