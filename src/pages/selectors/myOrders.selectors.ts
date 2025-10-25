import type { Locator, Page } from '@playwright/test';

export class MyOrdersSelectors {
    constructor(private page: Page) {
        this.page = page;
    }

    // static locator
    yesButton: Locator = this.page.getByRole('button', { name: 'Yes' }).describe('Yes button');

    // dynamic locator
    getOrderHeaderByOrderId = (orderId: string): Locator => this.page.locator(`//h3[text()='${orderId}']/ancestor::div[contains(@class,'cart_orderHeader')]`);
    cancelOrderButton = (orderId: string): Locator => this.getOrderHeaderByOrderId(orderId).locator(`//button[text()='Cancel Order']`);
}
