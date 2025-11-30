import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config({ quiet: true });
const isCI: boolean = process.env.CI === 'true';

export default defineConfig({
    testDir: 'src/tests',

    globalSetup: isCI ? 'src/global-config/global-setup.ts' : undefined,
    globalTeardown: isCI ? 'src/global-config/global-teardown.ts' : undefined,
    fullyParallel: true,
    forbidOnly: !!isCI,
    retries: isCI ? 0 : 0,
    workers: isCI ? 1 : 1,

    reporter: isCI
        ? [
              ['./src/utils/common/customAllureReporter.ts', { detail: true, outputFolder: 'allure-results' }],
              ['./src/utils/common/customListReporter.ts'],
              ['./src/utils/common/slackWebhookReporter.ts']
          ]
        : [['html', { open: 'never', outputFolder: 'html-report' }], ['./src/utils/common/customListReporter.ts']],
    timeout: 60000, // 2 min
    expect: {
        timeout: 30000
    },

    use: {
        ignoreHTTPSErrors: true,
        trace: 'retain-on-failure'
    },

    projects: [
        {
            name: 'API',
            dependencies: ['setup']
        },
        { name: 'setup', testMatch: /.*\.setup\.ts/ }
    ]
});
