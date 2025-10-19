import type { Page } from '@playwright/test';
import jsonUtility from '@utils/common/jsonUtility';
import { WebActions } from '@utils/web-utils/webActions';
import { NetworkWaiter } from '@utils/web-utils/networkWaiter';
import { WebAssertions } from '@utils/web-utils/webAssertions';

export class BasePage {
    protected page: Page;
    protected webActions: WebActions;
    protected webAssertions: WebAssertions;
    protected networkWaiter: NetworkWaiter;

    constructor(page: Page) {
        this.page = page;
        this.webActions = new WebActions(page);
        this.webAssertions = new WebAssertions(page);
        this.networkWaiter = new NetworkWaiter(page);
    }

    /**
     * Utilizes the webActions.goTo method to perform the navigation.
     * @returns {Promise<void>} A promise that resolves when the navigation is complete.
     */
    async navigateToApplication(): Promise<void> {
        const url = jsonUtility.getAppUrl();
        await this.webActions.goTo(url);
    }
}
