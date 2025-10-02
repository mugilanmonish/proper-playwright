import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: 'src/tests',

    globalSetup: 'src/global-config/global-setup.ts',
    globalTeardown: 'src/global-config/global-teardown.ts',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : 1,

    reporter: [
        ['./src/utils/common/customAllureRepoter.ts', { detail: false, outputFolder: 'allure-results' }]
        // ['html', { open: 'never', outputFolder: 'html-report' }],
        // ['list']
    ],
    timeout: 60000, // 2 min
    expect: {
        timeout: 30000
    },

    use: {
        baseURL: 'https://www.shoppersstack.com',
        ignoreHTTPSErrors: true,
        viewport: { width: 1920, height: 1080 },
        screenshot: 'only-on-failure',
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
