import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import jsonUtility from '@utils/common/jsonUtility';
import { logStep } from '@utils/common/stepLevelLog';
import type { APIRequestContext, APIResponse } from '@playwright/test';
import { request } from '@playwright/test';

export default class ApiHelper {
    protected page: Page;
    private apiContext!: APIRequestContext;

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
        return await logStep(`Get api call ${endpoint}`, async () => {
            return await this.apiContext.get(endpoint);
        });
    }

    /**
     * Perform a POST request
     */
    async post(endpoint: string, payload: object): Promise<APIResponse> {
        return await logStep(`Post api call ${endpoint}`, async () => {
            return await this.apiContext.post(endpoint, { data: payload });
        });
    }

    /**
     * Perform a POST request
     */
    async delete(endpoint: string): Promise<APIResponse> {
        return await logStep(`Delete api call ${endpoint}`, async () => {
            return await this.apiContext.delete(endpoint);
        });
    }

    /**
     * Clean up API context
     */
    async close(): Promise<void> {
        await logStep(`Cleanup api context`, async () => {
            if (this.apiContext) {
                await this.apiContext.dispose();
                this.apiContext = undefined as any;
            }
        });
    }

    /**
     * This function is used to get the product id by using product name
     * @returns {Array<number>} Product id
     */
    async getProductIdByName(responseBody: any, productName: string): Promise<number> {
        return await logStep(`Get product id by product name`, async () => {
            const product = responseBody.data.find((item: { productName: string }) => item.productName.toLowerCase() === productName.toLowerCase());
            return (await product) ? product.productId : null;
        });
    }

    /**
     * This function is used to get all product id
     * @returns {Array<number>} Array of product id
     */
    async getAllProductId(responseBody: any): Promise<[number]> {
        return await logStep(`Get all product id`, async () => {
            const produtList = await responseBody.data.map((item: any) => item.productId);
            return produtList;
        });
    }

    async getUserData(): Promise<any> {
        return await logStep(`Get user cookies`, async () => {
            const userData = await this.page.evaluate(() => {
                const userStr: string | null = localStorage.getItem('user');
                if (!userStr) return null;
                try {
                    const user = JSON.parse(userStr);
                    return user ?? null;
                } catch {
                    throw new Error('Not able to fetch storageState');
                }
            });
            return userData;
        });
    }

    async getBearerToken(): Promise<string> {
        return await logStep(`Get bearer token from user cokkies`, async () => {
            const userData = await this.getUserData();
            const token: string = await userData.jwtToken;
            if (!token) throw new Error('Bearer token not found in localStorage');
            return token;
        });
    }

    async getShopperId(): Promise<number> {
        return await logStep(`Get shopper id from user cookies`, async () => {
            const userData = await this.getUserData();
            return userData?.userId;
        });
    }

    async getCartList(): Promise<APIResponse> {
        return await logStep(`Get cart list`, async () => {
            await this.ensureInitialized();
            const shopperId = await this.getShopperId();
            const response = await this.apiContext.get(`shoppers/${shopperId}/carts`);
            const responseBody = await response.json();
            return responseBody;
        });
    }

    async deleteProductFromCart(productName: string): Promise<void> {
        await logStep(`Removing ${productName} product from cart`, async () => {
            await this.ensureInitialized();
            const shopperId = await this.getShopperId();
            const cartList: any = await this.getCartList();
            let cartId: number;
            if (!cartList.data.length) {
                cartId = await this.getProductIdByName(cartList, productName);
                await this.delete(`/shoppers/${shopperId}/carts/${cartId}`);
            }
        });
    }

    async deleteAllProductFromCart(): Promise<void> {
        await logStep(`Removing all products from cart`, async () => {
            await this.ensureInitialized();
            const shopperId = await this.getShopperId();
            const cartList: any = await this.getCartList();
            const cartListCount: number = cartList.data.length;
            const cartId: [number] = await this.getAllProductId(cartList);

            for (let i = 0; i < cartListCount; i++) {
                const response = await this.delete(`shoppers/${shopperId}/carts/${cartId[i]}`);
                expect(response.status(), { message: 'Validating api status code' }).toBe(200);
            }
        });
    }
}
