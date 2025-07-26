import type { Page, Locator } from '@playwright/test';

export class MyWalletTabSelectors {
    constructor(private page: Page) {
        this.page = page;
    }

    walletBalance: Locator = this.page.locator('//img[@alt="wallet"]/following-sibling::h3');
}
