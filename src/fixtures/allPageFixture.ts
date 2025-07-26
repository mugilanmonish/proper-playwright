import { test as base } from '@playwright/test';
import { PageObjectFactory } from '../pages/PageObjectFactory';

type Fixtures = {
    pages: PageObjectFactory;
};

export const test = base.extend<Fixtures>({
    pages: async ({ page }, use) => {
        const factory = new PageObjectFactory(page);
        await use(factory);
    }
});

export { expect } from '@playwright/test';
