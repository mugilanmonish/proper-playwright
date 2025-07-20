import type { Locator } from '@playwright/test';
// import { logStep } from '@utils/common/allureUtility';

class WebActions {
    async click(elementName: string, selector: Locator): Promise<void> {
        await logStep(`Clicked on ${elementName}`, async () => {
            await selector.click();
        });
    }

    async fill(value: string, elementName: string, selector: Locator): Promise<void> {
        await logStep(`Entered ${value} in ${elementName} text field`, async () => {
            await selector.fill(value);
        });
    }

    async textContent(elementName: string, selector: Locator): Promise<string | null> {
        return await logStep(`Get text from ${elementName}`, async () => {
            const text = await selector.textContent();
            return text?.trim() ?? null;
        });
    }

    async hover(elementName: string, selector: Locator): Promise<void> {
        await logStep(`Hover on ${elementName}`, async () => {
            await selector.hover();
        });
    }

    async hoverAndClick(elementName: string, selector: Locator): Promise<void> {
        await this.hover(elementName, selector);
        await this.click(elementName, selector);
    }
}

export default WebActions;
