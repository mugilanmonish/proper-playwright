import { test } from '@playwright/test';

// test('should display the correct page title', async ({ page }) => {
// 	await page.goto('https://playwright.dev/');
// 	const text = await page.locator('//h2').textContent();
// 	expect(text).toBe('Value');
// 	await expect(page).toHaveTitle(/Playwright/);

// 	const a = {
// 		person: { name: 'mugi', phone: 7708084971 },
// 		company: { cName: 'Jil', cPhone: 98765, cAddress: 'Abc street' }
// 	};
// 	const b = 10;
// 	console.log(b);
// 	console.log(a);
// });

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
        id: number;
        password: string;
        orgId: number;
        message: string;
    }
): void {
    // console.log(`${details?.id}-${details?.password}-${details?.orgId}-${details?.message}`);
    details?.id;
    details?.message;
    details?.orgId;
    details?.password;
}
