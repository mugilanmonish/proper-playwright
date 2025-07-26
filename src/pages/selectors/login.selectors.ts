import type { Page, Locator } from '@playwright/test';

export class LoginSelectors {
    constructor(private page: Page) {
        this.page = page;
    }

    // static locator
    usernameInput: Locator = this.page.locator('#Email');
    passwordInput: Locator = this.page.locator('#Password');
    loginButton: Locator = this.page.locator('span', { hasText: 'Login' });
}
