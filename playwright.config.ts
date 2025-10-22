import * as dotenv from 'dotenv';
import { defineConfig, devices } from '@playwright/test';

dotenv.config({ quiet: true });
const isCI = process.env.CI === 'true';

export default defineConfig({
    testDir: 'src/tests',

    globalSetup: isCI ? 'src/global-config/global-setup.ts' : undefined,
    globalTeardown: isCI ? 'src/global-config/global-teardown.ts' : undefined,
    fullyParallel: true,
    forbidOnly: !!isCI,
    retries: isCI ? 0 : 1,
    workers: isCI ? 1 : 1,

    reporter: isCI
        ? [['./src/utils/common/customAllureReporter.ts', { detail: true, outputFolder: 'allure-results' }], ['./src/utils/common/customListReporter.ts']]
        : [['html', { open: 'never', outputFolder: 'html-report' }], ['./src/utils/common/customListReporter.ts']],
    timeout: 120000, // 2 min
    expect: {
        timeout: 30000
    },

    use: {
        ignoreHTTPSErrors: true,
        viewport: { width: 1920, height: 1080 },
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
        headless: isCI ? true : false,
        actionTimeout: isCI ? 30 * 1000 : 40 * 1000
    },

    projects: [
        {
            name: 'WEB',
            use: { ...devices['Desktop Chrome'], channel: 'chrome' }
        }
    ]
});
