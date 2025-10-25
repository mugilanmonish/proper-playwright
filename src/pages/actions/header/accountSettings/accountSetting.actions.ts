import type { Page } from '@playwright/test';
import { BasePage } from '@basePage/base.page';
import type { AccountSettings } from 'types/homePage.types';
import { AccountSettingsSelectors } from '@selectors/header/accountSettings/accountSettings.selectors';

export class AccountSettingsActions extends BasePage {
    private selectors: AccountSettingsSelectors;

    constructor(protected readonly page: Page) {
        super(page);
        this.selectors = new AccountSettingsSelectors(page);
    }

    async selectMenu(menu: AccountSettings): Promise<void> {
        await this.webActions.click(`${menu} button`, this.selectors.menuItem(menu));
    }
}
