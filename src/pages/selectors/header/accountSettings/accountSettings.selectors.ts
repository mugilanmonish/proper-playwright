import type { Page, Locator } from '@playwright/test';
import type { AccountSettings } from 'types/homePage.types';

export class AccountSettingsSelectors {
    constructor(private page: Page) {
        this.page = page;
    }

    menuItem = (option: AccountSettings): Locator => this.page.locator(option);
}
