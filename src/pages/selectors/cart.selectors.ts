import type { Page, Locator } from '@playwright/test';

export class CartSelectors {
    constructor(private page: Page) {
        this.page = page;
    }

    buyNowButton: Locator = this.page.locator('#buynow_fl');
}
