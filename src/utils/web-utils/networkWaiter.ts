import type { Page, Response } from '@playwright/test';
import { logStep } from '@utils/common/stepLevelLog';

export class NetworkWaiter {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Waits for a network response that matches the given criteria.
     *
     * @param urlPart  String or RegExp to match URL (e.g. '/carts' or /\/carts$/)
     * @param method   Optional HTTP method to match (GET, POST, PATCH, DELETE)
     * @param status   Optional single status or array of statuses (default: any)
     * @param timeout  Optional timeout in ms (default: 10000)
     * @returns The matching Response
     */
    async waitForResponse(options: {
        urlPart: string | RegExp;
        method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
        status?: number | number[];
        timeout?: number;
    }): Promise<Response> {
        const { urlPart, method, status, timeout = 10000 } = options;

        return await logStep(`Waiting for this "${urlPart}" api response `, async () => {
            return await this.page.waitForResponse(
                (res) => {
                    const url: string = res.url();
                    const reqMethod: string = res.request().method();

                    const urlMatches: boolean = typeof urlPart === 'string' ? url.includes(urlPart) : urlPart.test(url);
                    const methodMatches: boolean = method ? reqMethod === method : true;
                    const statusMatches: boolean = status ? (Array.isArray(status) ? status.includes(res.status()) : res.status() === status) : true;

                    return urlMatches && methodMatches && statusMatches;
                },
                { timeout }
            );
        });
    }
}
