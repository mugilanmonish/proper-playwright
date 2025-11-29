/* eslint-disable */
import type { APIRequestContext, APIResponse } from '@playwright/test';
import { test as setup } from '@playwright/test';
import { request } from '@playwright/test';
import JsonUtility from '@utils/common/jsonUtility';
import type { Shopper } from 'types/env.types';
import type { AuthData, UserData } from 'interfaces/api/response.interface';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs';

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = dirname(__filename);

// Path to store API token
const tokenFile: string = join(__dirname, '../../../.auth/api-token.json');

// Token validity duration: 12 hours in milliseconds
const TOKEN_VALIDITY_MS: number = 12 * 60 * 60 * 1000;

/**
 * Check if token is still valid based on stored timestamp
 * @param timestamp ISO timestamp string from when token was created
 * @returns true if token is still valid (less than 12 hours old)
 */
function isTokenValid(timestamp: string): boolean {
    const tokenCreatedAt: number = new Date(timestamp).getTime();
    const now: number = Date.now();
    const age: number = now - tokenCreatedAt;

    // Add 5 minute buffer before expiry
    const bufferTime: number = 5 * 60 * 1000;

    return age < TOKEN_VALIDITY_MS - bufferTime;
}

setup('API authentication', async () => {
    // Check if token file exists and is valid
    if (existsSync(tokenFile)) {
        try {
            const authData: AuthData = JSON.parse(readFileSync(tokenFile, 'utf-8'));

            if (authData.timestamp && isTokenValid(authData.timestamp)) {
                const tokenAge: number = Date.now() - new Date(authData.timestamp).getTime();
                const hoursOld: number = Math.floor(tokenAge / (60 * 60 * 1000));
                const minutesOld: number = Math.floor((tokenAge % (60 * 60 * 1000)) / (60 * 1000));

                console.log('✓ Using existing valid token');
                console.log(`  Token age: ${hoursOld}h ${minutesOld}m (valid for 12 hours)`);
                return; // Skip login, token is still valid
            } else {
                console.log('⚠ Token expired (>12 hours old), re-authenticating...');
            }
        } catch (error) {
            console.log('⚠ Invalid token file, re-authenticating...');
        }
    } else {
        console.log('ℹ No token found, authenticating...');
    }

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
    const responseBody: UserData = responseJson.userData;
    const token: string = responseBody.jwtToken;

    if (!token) {
        throw new Error('Login successful but no token received');
    }

    // Store token and user data with current timestamp
    const authData: AuthData = {
        userData: responseBody,
        timestamp: new Date().toISOString()
    };

    // Ensure directory exists
    mkdirSync(dirname(tokenFile), { recursive: true });

    // Write token to file
    writeFileSync(tokenFile, JSON.stringify(authData, null, 2));

    console.log('✓ API authentication successful, new token stored');
    console.log(`  Token created at: ${authData.timestamp}`);

    // Cleanup
    await loginContext.dispose();
});
