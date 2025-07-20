import { expect, test } from '@playwright/test';
import { logStep } from '@utils/common/allureUtility';
import WebActions from '@utils/web-utils/webActions';
// import { WebAssertions } from '@utils/web-utils/webAssertions';

test('Demo', async ({ page }) => {
    const webActions = new WebActions();
    // const webAssertions = new WebAssertions();
    await logStep(
        'Navigate to this url: https://www.myntra.com/',
        async () => await page.goto('https://www.myntra.com/')
    );

    // Example of using the click function
    await webActions.hover('profile link', page.locator("//span[.='Profile']"));

    await webActions.hoverAndClick('myntra insider link', page.locator("//div[text()='Myntra Insider']"));

    // await webAssertions.validateVisibility({ elementName: 'Title text', selector: page.locator('') });

    expect(page.url(), 'Validating Myntra insider url').toContain('myntrainsider');
});
