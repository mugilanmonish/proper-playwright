import { test as base } from '@playwright/test';
import type { BrowserContext, Page, PlaywrightWorkerArgs, TestType } from '@playwright/test';
import { PageObjectFactory } from '../pages/PageObjectFactory';
import ApiHelper from '@utils/web-utils/apiHelper';

type Fixtures = {
    pages: {
        factory: PageObjectFactory;
        apiHelper: ApiHelper;
    };
};

export const test: TestType<Fixtures, PlaywrightWorkerArgs> = base.extend<Fixtures>({
    pages: async ({ browser }, use) => {
        const context: BrowserContext = await browser.newContext({
            viewport: { width: 1280, height: 720 }
        });
        // const context: BrowserContext = await browser.newContext();
        const page: Page = await context.newPage();

        // instantiate helpers and page object factory
        const apiHelper: ApiHelper = new ApiHelper(page);
        const factory: PageObjectFactory = new PageObjectFactory(page);

        try {
            await use({ factory, apiHelper });
        } catch (error) {
            throw new Error('Error during page fixture setup:' + error);
        } finally {
            await page.close();
        }
    }
});

export { expect } from '@playwright/test';
