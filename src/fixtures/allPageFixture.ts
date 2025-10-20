import { test as base } from '@playwright/test';
import { PageObjectFactory } from '../pages/PageObjectFactory';
import ApiHelper from '@utils/web-utils/apiHelper';

type Fixtures = {
    pages: {
        factory: PageObjectFactory;
        apiHelper: ApiHelper;
    };
};

export const test = base.extend<Fixtures>({
    pages: async ({ browser }, use) => {
        const context = await browser.newContext({
            viewport: { width: 1280, height: 720 },
            permissions: ['clipboard-read']
        });
        const page = await context.newPage();

        // instantiate helpers and page object factory
        const apiHelper = new ApiHelper(page);
        const factory = new PageObjectFactory(page);

        try {
            await use({ factory, apiHelper });
        } catch (error) {
            throw new Error('Error during page fixture setup:' + error);
        } finally {
            await page.close();
            await context.close();
        }
    }
});

export { expect } from '@playwright/test';
