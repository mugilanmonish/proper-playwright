/* eslint-disable */
import type { PlaywrightWorkerArgs, TestType } from '@playwright/test';
import { test as base } from '@playwright/test';
import ApiHelper from '@utils/api-utils/api-helper';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import type { AuthData } from 'interfaces/api/response.interface';

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = dirname(__filename);

type ApiFixtures = {
    apiHelper: ApiHelper;
};

export const test: TestType<ApiFixtures, PlaywrightWorkerArgs> = base.extend<ApiFixtures, PlaywrightWorkerArgs>({
    apiHelper: async ({}, use) => {
        const apiHelper = new ApiHelper();

        // Only auto-load token if the token file exists
        const tokenFile: string = join(__dirname, '../../.auth/api-token.json');
        if (existsSync(tokenFile)) {
            const authData: AuthData = JSON.parse(readFileSync(tokenFile, 'utf-8') as string);
            await apiHelper.initializeWithToken(authData.data.jwtToken);
        } else {
            console.log('⚠ No stored token found, use apiHelper.login() manually');
        }

        await use(apiHelper);

        // Cleanup
        await apiHelper.dispose();
    }
});

export { expect } from '@playwright/test';
