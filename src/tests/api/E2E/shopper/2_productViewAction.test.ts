import { test, expect } from '@fixtures/apiFixture';
import type { APIResponse } from '@playwright/test';

test('Shopper can view all products', async ({ apiHelper }) => {
    const response: APIResponse = await apiHelper.get('products?zoneId=ALPHA');
    expect(response.ok(), { message: 'Response should be OK' }).toBeTruthy();
    expect(response.status(), { message: 'Response status should be 200' }).toBe(200);

    const products: unknown = await response.json();
    expect(products, { message: 'Products should be defined' }).toBeDefined();
});

test('Shopper can view all default products', async ({ apiHelper }) => {
    const response: APIResponse = await apiHelper.get('products/alpha');
    expect(response.ok(), { message: 'Response should be OK' }).toBeTruthy();
    expect(response.status(), { message: 'Response status should be 200' }).toBe(200);

    const products: unknown = await response.json();
    expect(products, { message: 'Products should be defined' }).toBeDefined();
});
