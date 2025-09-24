import type { Page, Locator } from '@playwright/test';

export class HeaderSelector {
    constructor(private page: Page) {
        this.page = page;
    }

    shopperstackIcon: Locator = this.page.locator('[id="home"] [alt="logo"]');
    loginButton: Locator = this.page.locator('#loginBtn');
    accountSettingsIcon: Locator = this.page.locator('//a[@id="cart"]/following-sibling::div[@class]');
    searchInput: Locator = this.page.locator('[id="search"]');
    searchButton: Locator = this.page.locator('//*[@name="searchBtn"]');
    searchDropdown: Locator = this.page.locator('[id="category"]');
    cartButton: Locator = this.page.locator('//*[name()="svg" and @id="cartIcon"]');
    cartItemCount: Locator = this.page.locator('//*[name()="svg" and @id="cartIcon"]/following-sibling::span');
    usernameText: Locator = this.page.locator('h3');
}
