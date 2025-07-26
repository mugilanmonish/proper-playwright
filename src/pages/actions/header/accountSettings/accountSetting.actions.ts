import type { Page } from '@playwright/test';
import { BasePage } from '@basePage/base.page';
import { AccountSettingsSelectors } from '@selectors/header/accountSettings/accountSettings.selectors';

export class AccountSettingsActions extends BasePage {
    private selectors: AccountSettingsSelectors;

    constructor(protected readonly page: Page) {
        super(page);
        this.selectors = new AccountSettingsSelectors(page);
    }
}
