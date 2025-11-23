import type { Page } from '@playwright/test';
import { BasePage } from '@basePage/base.page';
import { logStep } from '@utils/common/stepLevelLog';
import type { ORDER_STATUS } from 'types/api.types';
import { MyOrdersSelectors } from '@selectors/myOrders.selectors';

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

    async validateOrderStatus(status: ORDER_STATUS, orderId: string): Promise<void> {
        await logStep('Validate Delivery Status', async () => {
            await this.webAssertions.validateText({ elementName: `${status}`, expectedValue: `${status}`, selector: this.selectors.getOrderStatus(orderId) });
        });
    }
}
