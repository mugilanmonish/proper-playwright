import { test } from '@playwright/test';

// test('should display the correct page title', async ({ page }) => {
// 	await page.goto('https://playwright.dev/');
// 	const text = await page.locator('//h2').textContent();

test('gdgdg', async ({ page }) => {
    await page.goto('dgdg');
    page.url();
    const a = 10;
    await page.locator(a.toString()).click();

    const obj = {
        id: 123,
        password: 'mugilan@1',
        orgId: 11,
        message: 'Testing data'
    };
    validateDetails('mugi', obj);
});

function validateDetails(
    name: string,
    details?: {
        id?: number;
        password?: string;
        orgId?: number;
        message?: string;
    }
): void {
    // console.log(`${details?.id}-${details?.password}-${details?.orgId}-${details?.message}`);
    name;
    details?.id;
    details?.message;
    details?.orgId;
    details?.password;
}
