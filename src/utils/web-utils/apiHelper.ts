import { request, expect } from '@playwright/test';
import type { Page, APIRequestContext, APIResponse } from '@playwright/test';
import jsonUtility from '@utils/common/jsonUtility';
import { logStep } from '@utils/common/stepLevelLog';
import type * as response from 'interfaces/api/response.interface';

export default class ApiHelper {
    protected page: Page;
    private apiContext?: APIRequestContext;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Automatically initialize API context when first used.
     */
    private async ensureInitialized(): Promise<void> {
        await logStep('Initiate api context', async () => {
            if (!this.apiContext) {
                const apiUrl = jsonUtility.getApiUrl();
                const token = await this.getBearerToken();

                this.apiContext = await request.newContext({
                    baseURL: apiUrl,
                    extraHTTPHeaders: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json'
                    }
                });
            }
        });
    }

    /**
     * Perform a GET request
     */
    async get(endpoint: string): Promise<APIResponse> {
        await this.ensureInitialized();
        return logStep(`GET ${endpoint}`, async () => await this.apiContext!.get(endpoint));
    }

    /**
     * Perform a POST request
     */
    async post(endpoint: string, payload: Record<string, unknown>): Promise<APIResponse> {
        await this.ensureInitialized();
        return logStep(`POST ${endpoint}`, async () => await this.apiContext!.post(endpoint, { data: payload }));
    }

    /**
     * Perform a DELETE request
     */
    async delete(endpoint: string): Promise<APIResponse> {
        await this.ensureInitialized();
        return logStep(`DELETE ${endpoint}`, async () => await this.apiContext!.delete(endpoint));
    }

    /**
     * Clean up API context
     */
    async close(): Promise<void> {
        await logStep(`Cleanup api context`, async () => {
            if (this.apiContext) {
                await this.apiContext.dispose();
                this.apiContext = undefined;
            }
        });
    }

    /**
     * Get product ID by product name
     */
    async getProductIdByName(responseBody: response.ProductResponse, productName: string): Promise<number | null> {
        return logStep(`Get product id by name: ${productName}`, () => {
            const product = responseBody.data.find((item) => item.productName.toLowerCase() === productName.toLowerCase());
            return product ? product.productId : null;
        });
    }

    /**
     * Get all product IDs
     */
    async getAllProductId(responseBody: response.ProductResponse): Promise<number[]> {
        return logStep(`Get all product ids`, () => {
            return responseBody.data.map((item) => item.productId);
        });
    }

    /**
     * Get user data from localStorage
     */
    async getUserData(): Promise<response.UserData> {
        return logStep(`Get user data from localStorage`, async () => {
            const userData = await this.page.evaluate<response.UserData | null>(() => {
                const userStr = localStorage.getItem('user');
                if (!userStr) return null;
                try {
                    return JSON.parse(userStr);
                } catch {
                    throw new Error('Invalid JSON in localStorage for key "user"');
                }
            });
            if (!userData) {
                throw new Error('User data not found in localStorage');
            }
            return userData;
        });
    }

    /**
     * Get bearer token from user data
     */
    async getBearerToken(): Promise<string> {
        return logStep(`Get bearer token`, async () => {
            const userData = await this.getUserData();
            if (!userData.jwtToken) throw new Error('Bearer token not found in user data');
            return userData.jwtToken;
        });
    }

    /**
     * Get shopper ID from user data
     */
    async getShopperId(): Promise<number> {
        return logStep(`Get shopper ID`, async () => {
            const userData = await this.getUserData();
            if (!userData.userId) throw new Error('Shopper ID not found in user data');
            return userData.userId;
        });
    }

    /**
     * Get cart list
     */
    async getCartList(): Promise<response.CartResponse> {
        return logStep(`Get cart list`, async () => {
            const shopperId = await this.getShopperId();
            const response = await this.get(`shoppers/${shopperId}/carts`);
            const responseBody = (await response.json()) as response.CartResponse;
            return responseBody;
        });
    }

    /**
     * Delete a specific product from cart
     */
    async deleteProductFromCart(productName: string): Promise<void> {
        await logStep(`Delete product ${productName} from cart`, async () => {
            const shopperId = await this.getShopperId();
            const cartList = await this.getCartList();

            if (!cartList.data.length) return;

            const cartId = await this.getProductIdByName(cartList, productName);
            if (cartId) {
                await this.delete(`/shoppers/${shopperId}/carts/${cartId}`);
            }
        });
    }

    /**
     * Delete all products from cart
     */
    async deleteAllProductFromCart(): Promise<void> {
        await logStep(`Delete all products from cart`, async () => {
            const shopperId = await this.getShopperId();
            const cartList = await this.getCartList();
            const cartIds = await this.getAllProductId(cartList);

            for (const id of cartIds) {
                const response = await this.delete(`shoppers/${shopperId}/carts/${id}`);
                expect(response.status(), { message: 'Validating delete API status' }).toBe(200);
            }
        });
    }
}
