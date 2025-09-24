import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    testDir: 'src/tests',

    globalSetup: 'src/global-config/global-setup.ts',
    globalTeardown: 'src/global-config/global-teardown.ts',

    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : 1,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [
        ['./src/utils/common/customAllureRepoter.ts', { detail: false, outputFolder: 'allure-results' }],
        ['html', { open: 'never', outputFolder: 'html-report' }],
        ['list']
    ],
    timeout: 60000,
    expect: {
        timeout: 15000
    },
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        baseURL: 'https://www.shoppersstack.com',
        ignoreHTTPSErrors: true,
        viewport: { width: 1280, height: 720 },
        screenshot: 'only-on-failure',
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'retain-on-failure',
        headless: false
    },

    projects: [
        {
            name: 'Google Chrome',
            use: { ...devices['Desktop Chrome'], channel: 'chrome' }
        }
    ]
});
