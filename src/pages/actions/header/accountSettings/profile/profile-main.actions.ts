import type { Page } from '@playwright/test';
import { BasePage } from '@basePage/base.page';
import { ProfileMainSelector } from '@selectors/header/accountSettings/profile/profile-main.selectors';

export class ProfileMainActions extends BasePage {
    private selectors: ProfileMainSelector;

    constructor(protected readonly page: Page) {
        super(page);
        this.selectors = new ProfileMainSelector(page);
    }
}
