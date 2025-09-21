import { test as base } from '@playwright/test';
import { PageObjectFactory } from '../pages/PageObjectFactory';

type Fixtures = {
    pages: PageObjectFactory;
};

export const test = base.extend<Fixtures>({
    pages: async ({ browser }, use) => {
        const context = await browser.newContext({
            viewport: { width: 1280, height: 720 },
            permissions: ['clipboard-read']
            // storageState: '.storageState.json'
        });
        const page = await context.newPage();

        const factory = new PageObjectFactory(page);
        try {
            await use(factory);
        } catch (error) {
            console.error('Error during page fixture setup:', error);
        } finally {
            await page.close();
            await context.close();
        }
    }
});

export { expect } from '@playwright/test';
