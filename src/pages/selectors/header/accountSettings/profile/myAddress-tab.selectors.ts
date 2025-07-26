import type { Page, Locator } from '@playwright/test';

export class MyAddressTabSelectors {
    constructor(private page: Page) {
        this.page = page;
    }

    addAddressButton: Locator = this.page.locator("//button[text()='Add Address']");
}
