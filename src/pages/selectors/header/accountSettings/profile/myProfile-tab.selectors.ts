import type { Page, Locator } from '@playwright/test';

export class MyProfileTabSelectors {
    constructor(private page: Page) {
        this.page = page;
    }

    editProfile: Locator = this.page.locator('//button[contains(text(),"Edit Profile")]');
}
