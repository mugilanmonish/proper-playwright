import type { Page, Locator } from '@playwright/test';
import type { AccountSetting } from 'types/customTypes/headerType';

export class AccountSettingsSelectors {
    constructor(private page: Page) {
        this.page = page;
    }

    menuItem = (option: AccountSetting): Locator => this.page.locator(option);
}
