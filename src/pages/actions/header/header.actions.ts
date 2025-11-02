import type { Page } from '@playwright/test';
import { BasePage } from '@basePage/base.page';
import { HeaderSelector } from '@selectors/header/header.selectors';
import { logStep } from '@utils/common/stepLevelLog';

export class HeaderActions extends BasePage {
    private selectors: HeaderSelector;

    constructor(protected readonly page: Page) {
        super(page);
        this.selectors = new HeaderSelector(page);
    }

    /**
     * Launches the application and performs a hover and click action on the login button.
     * @returns {Promise<void>} A promise that resolves when the login button has been clicked.
     */
    async clickLoginButton(): Promise<void> {
        await this.navigateToApplication();
        await this.webActions.hoverAndClick('login button', this.selectors.loginButton, 60000);
    }

    /**
     * This function is used to search product in search bar
     * @param productName Product name which used to buy
     */
    async searchForItem(productName: string): Promise<void> {
        await logStep(`Searching for item: ${productName} and validating the search results`, async () => {
            await this.webActions.fill(productName, 'search', this.selectors.searchInput);
            await this.webActions.click('search button', this.selectors.searchButton);
            await this.webAssertions.validateVisibility({
                selector: this.page.locator('span', { hasText: productName }),
                elementName: productName
            });
        });
    }

    /**
     * This function is used to click shopperstack icon.
     */
    async clickShoppersStackIcon(): Promise<void> {
        await this.webActions.click('shopperstack icon', this.selectors.shopperstackIcon);
    }

    /**
     * Click cart icon
     */
    async clickCartIcon(): Promise<void> {
        await this.webActions.click('cart icon', this.selectors.cartButton);
    }

    /**
     * Click Account setting icon
     */
    async clickMenu(): Promise<void> {
        await this.webActions.click('menu icon', this.selectors.accountSettingsIcon);
    }
}
