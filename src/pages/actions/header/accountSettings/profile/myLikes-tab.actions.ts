import type { Page } from '@playwright/test';
import { BasePage } from '@basePage/base.page';
import { MyLikesTabSelectors } from '@selectors/header/accountSettings/profile/myLikes-tab.selectors';

export class MyLikesTabActions extends BasePage {
    private selectors: MyLikesTabSelectors;

    constructor(protected readonly page: Page) {
        super(page);
        this.selectors = new MyLikesTabSelectors(page);
    }
}
