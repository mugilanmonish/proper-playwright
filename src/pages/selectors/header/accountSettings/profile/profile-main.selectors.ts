import type { Page, Locator } from '@playwright/test';
import type { AllProfiles } from 'types/customTypes/accountSettingTypes';

export class ProfileMainSelector {
    constructor(private page: Page) {
        this.page = page;
    }

    tabSwitcher = (tab: AllProfiles): Locator => this.page.locator(`//div[text()='${tab}']`);
}
