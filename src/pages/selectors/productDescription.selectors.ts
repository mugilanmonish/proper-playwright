import type { Page, Locator } from '@playwright/test';

export class ProductDescriptionSelectors {
    constructor(private page: Page) {
        this.page = page;
    }

    productTitle: Locator = this.page.locator('div[class*="ProductDisplay_productBrand"]>h2');
    productCategory: Locator = this.page.locator('a.category-link');
    productDescription: Locator = this.page.locator('div.product-description');
    productPrice: Locator = this.page.locator('p[class*="CalculateOffer_wrapper"]>span').nth(0);
    originalPrice: Locator = this.page.locator('p[class*="CalculateOffer_wrapper"]>span').nth(1);
    discountPercentage: Locator = this.page.locator('p[class*="CalculateOffer_wrapper"]>span').nth(2);
    addedText: Locator = this.page.locator('button', { hasText: 'Added' });
    addToCartButton: Locator = this.page.locator('button', { hasText: 'Add to cart' });
    buyNowButton: Locator = this.page.locator('button', { hasText: 'Buy Now' });
    checkDeliveryInput: Locator = this.page.locator('#Check Delivery');
    checkButton: Locator = this.page.locator('button', { hasText: 'Check' });

    productName = (itemName: string): Locator => this.page.locator(`//span[contains(text(),'${itemName}')]`);
}
