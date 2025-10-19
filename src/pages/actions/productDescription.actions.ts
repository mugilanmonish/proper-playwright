import type { Page } from '@playwright/test';
import { BasePage } from '@basePage/base.page';
import { logStep } from '@utils/common/stepLevelLog';
import { ProductDescriptionSelectors } from '@selectors/productDescription.selectors';

export class ProductDescriptionActions extends BasePage {
    private selectors: ProductDescriptionSelectors;

    constructor(protected readonly page: Page) {
        super(page);
        this.selectors = new ProductDescriptionSelectors(page);
    }

    async clickProduct(itemName: string): Promise<void> {
        await logStep(`Click ${itemName} product tile`, async () => {
            await this.webActions.click(`${itemName} tile`, this.selectors.productName(itemName));
            await this.networkWaiter.waitForResponse({ urlPart: 'shopping/products', method: 'GET', status: 200 });
        });
    }

    async addToCart(): Promise<void> {
        await logStep(`Adding product to cart`, async () => {
            await this.webActions.click('add to cart button', this.selectors.addToCartButton);
            await this.networkWaiter.waitForResponse({ urlPart: '/carts', method: 'POST', status: 201 });
            await this.webAssertions.validateVisibility({ selector: this.selectors.addedText, elementName: 'Added text' });
        });
    }
}
