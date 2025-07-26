import type { Page } from '@playwright/test';
import { WebActions } from '@utils/web-utils/webActions';
import { WebAssertions } from '@utils/web-utils/webAssertions';

export class BasePage {
    protected webActions: WebActions;
    protected webAssertions: WebAssertions;
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
        this.webActions = new WebActions(page);
        this.webAssertions = new WebAssertions(page);
    }

    async launchTheApp(): Promise<void> {
        await this.webActions.goTo('/');
    }
}
