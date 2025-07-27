import WebActions from './webActions';
import { expect } from '@playwright/test';
import { logStep } from '@utils/common/allureUtility';
import type * as WebAssertionsTypes from 'interfaces/webAssertions.interface';

export class WebAssertions extends WebActions {
    /**
     * Validates that the text content of a specified web element matches the expected value.
     *
     * @param params - An object containing the following properties:
     *   - selector: The Playwright selector for the target element.
     *   - elementName: A descriptive name for the element, used in logging and error messages.
     *   - expectedValue: The expected text value to compare against the element's actual text content.
     * @returns A promise that resolves when the validation is complete.
     * @throws If the element's text content does not match the expected value.
     */
    async validateText(params: WebAssertionsTypes.ValidateTextParams): Promise<void> {
        await logStep(`Validating ${params.elementName} text`, async () => {
            const text = await params.selector.textContent();
            expect(text?.trim(), `${params.elementName} text is not displayed`).toBe(params.expectedValue);
        });
    }

    /**
     * Validates the visibility of a given element on the page.
     *
     * @param params - An object containing the following properties:
     * @param params.selector - The selector or locator for the element to validate.
     * @param params.elementName - A human-readable name for the element, used in logging.
     * @param params.isVisible - Optional. If true (default), asserts that the element is fully in the viewport.
     *                           If false, asserts that the element is not visible.
     * @returns A promise that resolves when the visibility assertion is complete.
     */
    async validateVisibility({
        selector,
        elementName,
        isVisible = true
    }: WebAssertionsTypes.ValidateVisibility): Promise<void> {
        await logStep(`Validating ${elementName} visibility`, async () => {
            if (isVisible) await expect(selector, `${elementName} is visible`).toBeInViewport({ ratio: 1 });
            else await expect(selector, `${elementName} is not visible`).not.toBeVisible();
        });
    }

    /**
     * Validates that the text content of a specified web element contains the expected partial value.
     *
     * @param params - An object containing the following properties:
     *   - selector: The selector used to locate the web element.
     *   - expectedValue: The partial text value expected to be present in the element's text content.
     *   - elementName: A descriptive name for the element, used in logging and error messages.
     * @returns A promise that resolves when the validation is complete.
     * @throws Will throw an assertion error if the element's text does not contain the expected value.
     */
    async validatePartialText(params: WebAssertionsTypes.ValidateTextParams): Promise<void> {
        await logStep(`Validating ${params.elementName} text`, async () => {
            const text = await this.textContent(params.selector);
            expect(text?.trim(), `${params.elementName} text is not displayed`).toContain(params.expectedValue);
        });
    }

    /**
     * Validates that the array of text contents retrieved from the specified selector
     * contains all the expected values provided in the `expectedArray`.
     *
     * @param params - An object containing the following properties:
     *   - `selector`: The selector used to locate the elements whose text contents will be validated.
     *   - `elementName`: A descriptive name for the element(s), used in logging and error messages.
     *   - `expectedArray`: An array of expected string values that should be present in the text contents.
     * @returns A promise that resolves when the validation is complete.
     * @throws Will throw an assertion error if the actual text contents do not contain all expected values.
     */
    async validateArray(params: WebAssertionsTypes.ValidateArray): Promise<void> {
        await logStep(`Validating object ${params.elementName} all text`, async () => {
            const allText = await this.allTextContents(params.selector);
            expect(allText, `Validating all text of ${params.elementName} texts`).toEqual(
                expect.arrayContaining(params.expectedArray)
            );
        });
    }
}
