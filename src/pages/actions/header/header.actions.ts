import type { Page } from '@playwright/test';
import { BasePage } from '@basePage/base.page';
import { HeaderSelector } from '@selectors/header/header.selector';

export class HeaderActions extends BasePage {
    private selectors: HeaderSelector;

    constructor(protected readonly page: Page) {
        super(page);
        this.selectors = new HeaderSelector(page);
    }

    async clickLoginButton(): Promise<void> {
        await this.launchTheApp();
        await this.webActions.hoverAndClick('login button', this.selectors.loginButton);
    }
}
