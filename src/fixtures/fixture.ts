import { test as base } from '@playwright/test';
import { PageObjectFactory } from '../pages/PageObjectFactory';

type Fixtures = {
    factory: PageObjectFactory;
};

export const test = base.extend<Fixtures>({
    factory: async ({ page }, use) => {
        const factory = new PageObjectFactory(page);
        await use(factory);
    }
});

export { expect } from '@playwright/test';
