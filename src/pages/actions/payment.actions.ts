import type { Page } from '@playwright/test';
import { BasePage } from '@basePage/base.page';
import { logStep } from '@utils/common/stepLevelLog';
import type { PaymentTypes } from 'types/payment.types';
import { PaymentSelectors } from '@selectors/payment.selectors';

export class PaymentActions extends BasePage {
    private selectors: PaymentSelectors;

    constructor(protected readonly page: Page) {
        super(page);
        this.selectors = new PaymentSelectors(page);
    }

    async codPayment(paymentMethod: PaymentTypes): Promise<string> {
        await logStep('Selecting cod payment method and click proceed button', async () => {
            await this.webActions.click(`${paymentMethod} radio button`, this.selectors.paymentRadioButton(paymentMethod));
            await this.webActions.click('proceed button', this.selectors.proceedButton);
        });
        return await this.getOrderId();
    }

    async getOrderId(): Promise<string> {
        return await logStep('Getting order id in order confirmation page', async () => {
            const orderId = await this.webActions.textContent(this.selectors.orderIdText);
            const match: string[] = orderId.split('#');
            if (match === null) throw new Error('Order id is not available');
            return match[1];
        });
    }
}
