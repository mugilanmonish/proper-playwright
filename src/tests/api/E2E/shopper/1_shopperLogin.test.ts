import { test, expect } from '@fixtures/apiFixture';
import type { APIResponse } from '@playwright/test';

test.skip('Shopper can make authenticated API calls', async ({ apiHelper }) => {
    const response: APIResponse = await apiHelper.get('shoppers/318687/carts');

    expect(response.status(), { message: 'Response status should be 200' }).toBe(200);
    expect(response.ok(), { message: 'Response should be OK' }).toBeTruthy();

    expect(await response.json()).toBeDefined();
});
