import type { Page } from '@playwright/test';
import { BasePage } from '@basePage/base.page';
import { MyProfileTabSelectors } from '@selectors/header/accountSettings/profile/myProfile-tab.selectors';

export class MyProfileTabActions extends BasePage {
    private selectors: MyProfileTabSelectors;

    constructor(protected readonly page: Page) {
        super(page);
        this.selectors = new MyProfileTabSelectors(page);
    }
}
