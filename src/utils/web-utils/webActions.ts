import type { Locator, Page } from '@playwright/test';
import { logStep } from '@utils/common/allureUtility';

export class WebActions {
    protected page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Navigates the current page to the specified URL.
     * @param url - The destination URL to navigate to.
     * @returns A promise that resolves when navigation is complete.
     */
    async goTo(url: string): Promise<void> {
        await logStep(`Navigate to Shopperstack ${url}`, async () => {
            await this.page.goto(url);
        });
    }

    /**
     * Clicks on the specified web element using the provided selector.
     * @param elementName - A descriptive name for the element to be clicked, used for logging purposes.
     * @param selector - The Playwright Locator representing the element to click.
     * @returns A promise that resolves when the click action is complete.
     */
    async click(elementName: string, selector: Locator, time?: number): Promise<void> {
        await logStep(`Clicked on ${elementName}`, async () => {
            await selector.click({ timeout: time });
        });
    }

    /**
     * Fills the specified text field with the provided value.
     * @param value - The string value to enter into the text field.
     * @param elementName - A descriptive name for the element, used for logging purposes.
     * @param selector - The Playwright Locator representing the text field to fill.
     * @returns A promise that resolves when the fill action is complete.
     */
    async fill(value: string, elementName: string, selector: Locator, time?: number): Promise<void> {
        await logStep(`Entered ${value} in ${elementName} text field`, async () => {
            await selector.fill(value, { timeout: time });
        });
    }

    /**
     * Retrieves and trims the text content of the specified Locator element.
     * @param selector - The Playwright Locator representing the element to extract text from.
     * @returns A promise that resolves to the trimmed text content of the element, or `null` if no text is found.
     */
    async textContent(selector: Locator, time?: number): Promise<string | null> {
        const text = await selector.textContent({ timeout: time });
        return text?.trim() ?? null;
    }

    /**
     * Retrieves the text content of all elements matching the given locator.
     * @param selector - The Playwright Locator representing the elements to extract text from.
     * @returns A promise that resolves to an array of strings containing the text content of each matched element,
     *          or `null` if no elements are found.
     */
    async allTextContents(selector: Locator): Promise<string[] | null> {
        const allText = await selector.allTextContents();
        return allText;
    }

    /**
     * Hovers the mouse pointer over the specified element.
     * @param elementName - A descriptive name for the element to be hovered, used for logging purposes.
     * @param selector - The Playwright Locator representing the element to hover over.
     * @returns A promise that resolves when the hover action is complete.
     */
    async hover(elementName: string, selector: Locator, time?: number): Promise<void> {
        await logStep(`Hover on ${elementName}`, async () => {
            await selector.hover({ timeout: time });
        });
    }

    /**
     * Hovers over the specified element and then clicks it.
     * @param elementName - A descriptive name for the element, used for logging purposes.
     * @param selector - The Playwright Locator representing the target element.
     * @returns A promise that resolves when the hover and click actions are completed.
     */
    async hoverAndClick(elementName: string, selector: Locator, time?: number): Promise<void> {
        await logStep(`Hover and Click on ${elementName}`, async () => {
            await this.hover(elementName, selector, time);
            await this.click(elementName, selector, time);
        });
    }
}

export default WebActions;
