import type { Page, Locator } from '@playwright/test';

export class AddressSelectors {
    constructor(private page: Page) {
        this.page = page;
    }

    proceedButton: Locator = this.page.locator('button[class*="selectaddress_proceed"]');

    // dynamic locators
    addressRadioButton = (addressId: number): Locator => this.page.locator(`[id="${addressId}"]`);
}
