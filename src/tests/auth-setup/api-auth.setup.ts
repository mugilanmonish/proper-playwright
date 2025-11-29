import type { APIRequestContext, APIResponse } from '@playwright/test';
import { test as setup, request } from '@playwright/test';
import JsonUtility from '@utils/common/jsonUtility';
import type { Shopper } from 'types/env.types';
import type { AuthData, UserData } from 'interfaces/api/response.interface';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { writeFileSync, mkdirSync } from 'fs';

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = dirname(__filename);

// Path to store API token
const tokenFile: string = join(__dirname, '../../../.auth/api-token.json');

setup('API authentication', async () => {
    // Get shopper credentials
    const userData: Shopper = JsonUtility.getShopperData('mugiRock');

    // Create API context for login
    const loginContext: APIRequestContext = await request.newContext({
        baseURL: JsonUtility.getApiUrl(),
        extraHTTPHeaders: {
            'Content-Type': 'application/json'
        }
    });

    // Perform login
    const response: APIResponse = await loginContext.post('users/login', {
        data: {
            email: userData.email,
            password: userData.password,
            role: userData.role
        }
    });

    if (!response.ok()) {
        throw new Error(`Login failed with status ${response.status()}: ${await response.text()}`);
    }

    const responseJson: AuthData = await response.json();
    const responseBody: UserData = responseJson.data;
    const token: string = responseBody.jwtToken;

    if (!token) {
        throw new Error('Login successful but no token received');
    }

    // Store token and user data
    const authData: AuthData = {
        data: responseBody,
        timestamp: new Date().toISOString()
    };

    // Ensure directory exists
    mkdirSync(dirname(tokenFile), { recursive: true });

    // Write token to file
    writeFileSync(tokenFile, JSON.stringify(authData, null, 2));

    // eslint-disable-next-line no-console
    console.log('✓ API authentication successful, token stored');

    // Cleanup
    await loginContext.dispose();
});
