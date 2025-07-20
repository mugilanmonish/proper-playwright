import WebActions from '@utils/web-utils/webActions';
import { test, expect } from '@playwright/test';
import { logStep } from '@utils/common/allureUtility';

test('Demo', async ({ page }) => {
    const webActions = new WebActions();

    await logStep(
        'Navigate to this url: https://www.myntra.com/',
        async () => await page.goto('https://www.myntra.com/', { waitUntil: 'load' })
    );

    await webActions.hover('profile link', page.locator("//span[.='Profile']"));

    await webActions.hoverAndClick('myntra insider link', page.locator("//div[text()='Myntra Insider']"));

    await logStep('Validating myntra insider url', () => {
        expect(page.url(), 'Validating Myntra insider url').toContain('myntrainsider');
    });
});
