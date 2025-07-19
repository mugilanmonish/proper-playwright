import { test } from '@playwright/test';

test('Demo', async ({ page }) => {
    await page.goto('https://openai.com');
    await page.getByRole('button', { name: 'Log in' }).hover();
    await page.waitForTimeout(5000);
});
