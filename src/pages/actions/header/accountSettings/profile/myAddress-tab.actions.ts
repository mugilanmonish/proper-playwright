import type { Page } from '@playwright/test';
import { BasePage } from '@basePage/base.page';
import { MyAddressTabSelectors } from '@selectors/header/accountSettings/profile/myAddress-tab.selectors';

export class MyAddressTabActions extends BasePage {
    private selectors: MyAddressTabSelectors;

    constructor(protected readonly page: Page) {
        super(page);
        this.selectors = new MyAddressTabSelectors(page);
    }
}
