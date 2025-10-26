import type { Locator, Page } from '@playwright/test';
import type { CardType, PaymentTypes } from 'types/payment.types';

export class PaymentSelectors {
    constructor(private page: Page) {
        this.page = page;
    }

    proceedButton: Locator = this.page.getByRole('button', { name: 'Proceed' });
    addCardButton: Locator = this.page.getByRole('button', { name: 'Add Card' });
    cardHolderNameTxtFld: Locator = this.page.locator('[id=":r4:"]');
    cardNumber: Locator = this.page.locator('[id=":r5:"]');
    pinTxtFLd: Locator = this.page.locator('[id=":r6:"]');
    expiryMonthTxtFLd: Locator = this.page.locator('[id=":r7:"]');
    cvvTxtFld: Locator = this.page.locator('[id=":r8:"]');
    addButton: Locator = this.page.locator('[id=":r9:"]');

    orderIdText: Locator = this.page.locator('//b');

    paymentRadioButton = (paymentType: PaymentTypes): Locator => this.page.locator(`input[value='${paymentType}']`);
    cardTypeRadioButton = (cardType: CardType): Locator => this.page.locator(`input[value='${cardType}']`);
}
