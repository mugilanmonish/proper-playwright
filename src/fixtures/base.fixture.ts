// fixtures/base.fixture.ts
import { test as baseTest } from '@playwright/test';
import { logStep } from '@utils/common/allureUtility';

declare global {
    // @ts-ignore
    var logStep: typeof logStep;
}

const test = baseTest.extend({});

test.beforeAll(() => {
    globalThis.logStep = logStep;
});

export { test };
