import type { Locator, Page } from '@playwright/test';
import { logStep } from '@utils/common/allureUtility';

export class WebActions {
    protected page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    async goTo(url: string): Promise<void> {
        await logStep(`Navigate to Shopperstack`, async () => {
            await this.page.goto(url);
        });
    }

    /**
     * Clicks on the specified web element using the provided selector.
     *
     * @param elementName - A descriptive name for the element to be clicked, used for logging purposes.
     * @param selector - The Playwright Locator representing the element to click.
     * @returns A promise that resolves when the click action is complete.
     */
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

    async textContent(selector: Locator): Promise<string | null> {
        const text = await selector.textContent();
        return text?.trim() ?? null;
    }

    async allTextContents(selector: Locator): Promise<string[] | null> {
        const allText = await selector.allTextContents();
        return allText;
    }

    async hover(elementName: string, selector: Locator): Promise<void> {
        await logStep(`Hover on ${elementName}`, async () => {
            await selector.hover();
        });
    }

    async hoverAndClick(elementName: string, selector: Locator): Promise<void> {
        await logStep(`Hover and Click on ${elementName}`, async () => {
            await this.hover(elementName, selector);
            await this.click(elementName, selector);
        });
    }
}

export default WebActions;
