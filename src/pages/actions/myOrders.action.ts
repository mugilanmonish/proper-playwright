import type { Page } from '@playwright/test';
import { BasePage } from '@basePage/base.page';
import { MyOrdersSelectors } from '@selectors/myOrders.selectors';
import { logStep } from '@utils/common/stepLevelLog';

export class MyOrdersActions extends BasePage {
    private selectors: MyOrdersSelectors;

    constructor(protected readonly page: Page) {
        super(page);
        this.selectors = new MyOrdersSelectors(page);
    }

    /**
     * Click buy now button in cart page.
     */
    async cancelOrderByOrderId(orderId: string): Promise<void> {
        await logStep('Cancel order', async () => {
            await this.webActions.click(`${orderId} cancel order`, this.selectors.cancelOrderButton(orderId));
            await this.webActions.click('yes button', this.selectors.yesButton);
        });
    }
}
