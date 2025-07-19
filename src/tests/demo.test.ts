import { test } from '@playwright/test';
import { logStep } from '@utils/allureUtility';

test('Demo', async ({ page }) => {
    await logStep('Navigate to this url: https://openai.com', page.goto('https://openai.com'));
    await logStep('Hover on Login Button ', page.getByRole('button', { name: 'Log in' }).hover());
    await logStep('Wait for 1 sec', page.waitForTimeout(1000));
});
