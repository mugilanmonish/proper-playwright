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

    /**
     * This function is used to select address and click proceed
     * @param addressId This address id is used to select the address
     */
    async selectAddress(addressId: number): Promise<void> {
        await logStep('Selecting Address', async () => {
            await this.webActions.click('address radio button', this.selectors.addressRadioButton(addressId));
            await this.clickProceed();
        });
    }

    /**
     * This function is used to click the proceed button after selecting address
     */
    async clickProceed(): Promise<void> {
        await this.webActions.click('proceed button', this.selectors.proceedButton);
    }
}
