import type { Locator, Page } from '@playwright/test';
import type { CardType, PaymentTypes } from 'types/payment.types';

export class PaymentSelectors {
    constructor(private page: Page) {
        this.page = page;
    }

    proceedButton = this.page.getByRole('button', { name: 'Proceed' });
    addCardButton = this.page.getByRole('button', { name: 'Add Card' });
    cardHolderNameTxtFld = this.page;
    cardNumberTxtFld = this.page;
    pinTxtFLd = this.page;
    expiryMonthTxtFLd = this.page;
    cvvTxtFld = this.page;
    addButton = this.page;

    orderIdText: Locator = this.page.locator('//b');

    paymentRadioButton = (paymentType: PaymentTypes): Locator => this.page.locator(`input[value='${paymentType}']`);
    cardTypeRadioButton = (cardType: CardType): Locator => this.page.locator(`input[value='${cardType}']`);
}
