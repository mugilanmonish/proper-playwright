import type { Page, Locator } from '@playwright/test';

export class MyLikesTabSelectors {
    constructor(private page: Page) {
        this.page = page;
    }

    categoryDropdown: Locator = this.page.locator('[id="Category"]');
    multiSelectDropdown: Locator = this.page.locator('[id="Category Type"]');
    submitButton: Locator = this.page.locator('[id="Submit"]');
}
