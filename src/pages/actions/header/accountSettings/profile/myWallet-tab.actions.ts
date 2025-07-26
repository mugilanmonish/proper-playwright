import type { Page } from '@playwright/test';
import { BasePage } from '@basePage/base.page';
import { MyWalletTabSelectors } from '@selectors/header/accountSettings/profile/myWallet-tab.selectors';

export class MyWalletTabActions extends BasePage {
    private selectors: MyWalletTabSelectors;

    constructor(protected readonly page: Page) {
        super(page);
        this.selectors = new MyWalletTabSelectors(page);
    }
}
