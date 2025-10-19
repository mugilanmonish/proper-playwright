import type { Page } from '@playwright/test';
import { BasePage } from '@basePage/base.page';
import { CartSelectors } from '@selectors/cart.selectors';

export class cartActions extends BasePage {
    private selectors: CartSelectors;

    constructor(protected readonly page: Page) {
        super(page);
        this.selectors = new CartSelectors(page);
    }

    async clickBuyNow(): Promise<void> {
        await this.webActions.click('Buy Now button', this.selectors.buyNowButton);
    }
}
