import type { Page, Locator } from '@playwright/test';

export class HomeSelectors {
    constructor(private page: Page) {
        this.page = page;
    }

    featuredProductCount: Locator = this.page.locator('div[class*="featuredProducts_cardContainer"] > div');
}
