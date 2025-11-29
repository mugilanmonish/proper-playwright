import type { APIRequestContext, APIResponse } from '@playwright/test';
import { request } from '@playwright/test';
import jsonUtility from '@utils/common/jsonUtility';
import type { Shopper } from 'types/env.types';
import type { AuthData, UserData } from 'interfaces/api/response.interface';

export default class ApiHelper {
    private apiContext?: APIRequestContext;

    /**
     * Login with shopper credentials and initialize the API context with the token.
     * @param user Shopper credentials
     */
    async login(user: Shopper): Promise<void> {
        const loginContext: APIRequestContext = await request.newContext({
            baseURL: jsonUtility.getApiUrl(),
            extraHTTPHeaders: {
                Accept: 'application/json'
            }
        });

        const response: APIResponse = await loginContext.post('users/login', {
            data: {
                email: user.email,
                password: user.password,
                role: user.role
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

        this.apiContext = await request.newContext({
            baseURL: jsonUtility.getApiUrl(),
            extraHTTPHeaders: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        });
    }

    /**
     * Initialize API context with a pre-existing token.
     * @param token Bearer token
     */
    async initializeWithToken(token: string): Promise<void> {
        const apiUrl: string = jsonUtility.getApiUrl();
        this.apiContext = await request.newContext({
            baseURL: apiUrl,
            extraHTTPHeaders: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        });
        // eslint-disable-next-line no-console
        console.log('✓ API context initialized with token');
    }

    /**
     * Dispose of the API context and clean up resources.
     */
    async dispose(): Promise<void> {
        if (this.apiContext) {
            await this.apiContext.dispose();
            this.apiContext = undefined;
        }
    }

    private ensureInitialized(): void | never {
        if (!this.apiContext) {
            throw new Error('API context not initialized. Call login() first.');
        }
    }

    /**
     * Perform a GET request using the authenticated context.
     * @param endpoint API endpoint
     */
    async get(endpoint: string): Promise<APIResponse> {
        this.ensureInitialized();
        return this.apiContext!.get(endpoint);
    }

    /**
     * Perform a POST request using the authenticated context.
     * @param endpoint API endpoint
     * @param data Request body
     */
    async post(endpoint: string, data: Record<string, unknown>): Promise<APIResponse> {
        this.ensureInitialized();
        return this.apiContext!.post(endpoint, { data });
    }

    /**
     * Perform a DELETE request using the authenticated context.
     * @param endpoint API endpoint
     */
    async delete(endpoint: string): Promise<APIResponse> {
        this.ensureInitialized();
        return this.apiContext!.delete(endpoint);
    }

    /**
     * Perform a PATCH request using the authenticated context.
     * @param endpoint API endpoint
     * @param data Request body
     */
    async patch(endpoint: string, data: Record<string, unknown>): Promise<APIResponse> {
        this.ensureInitialized();
        return this.apiContext!.patch(endpoint, { data });
    }
}
