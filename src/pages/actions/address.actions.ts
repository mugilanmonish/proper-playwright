import type { Page } from '@playwright/test';
import { BasePage } from '@basePage/base.page';
import { logStep } from '@utils/common/stepLevelLog';
import { AddressSelectors } from '@selectors/address.selectors';

export class AddressActions extends BasePage {
    private selectors: AddressSelectors;

    constructor(protected readonly page: Page) {
        super(page);
        this.selectors = new AddressSelectors(page);
    }

    async clickAddress(addressId: number): Promise<void> {
        await logStep('Selecting Address', async () => {
            await this.webActions.click('address radio button', this.selectors.addressRadioButton(addressId));
            await this.clickProceed();
        });
    }

    async clickProceed(): Promise<void> {
        await this.webActions.click('proceed button', this.selectors.proceedButton);
    }
}
