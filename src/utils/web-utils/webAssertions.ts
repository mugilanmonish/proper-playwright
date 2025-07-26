import WebActions from './webActions';
import { expect } from '@playwright/test';
import { logStep } from '@utils/common/allureUtility';
import type * as WebAssertionsTypes from 'interfaces/webAssertions.interface';

export class WebAssertions extends WebActions {
    async validateText(params: WebAssertionsTypes.ValidateTextParams): Promise<void> {
        await logStep(`Validating ${params.elementName} text`, async () => {
            const text = await params.selector.textContent();
            expect(text?.trim(), `${params.elementName} text is not displayed`).toBe(params.expectedValue);
        });
    }

    async validateVisibility({
        selector,
        elementName,
        isVisible = true
    }: WebAssertionsTypes.ValidateVisibility): Promise<void> {
        await logStep(`Validating ${elementName} visibility`, async () => {
            if (isVisible) await expect(selector, `${elementName} is visible`).toBeVisible();
            else await expect(selector, `${elementName} is not visible`).not.toBeVisible();
        });
    }

    async validatePartialText(params: WebAssertionsTypes.ValidateTextParams): Promise<void> {
        await logStep(`Validating ${params.elementName} text`, async () => {
            const text = await this.textContent(params.selector);
            expect(text?.trim(), `${params.elementName} text is not displayed`).toContain(params.expectedValue);
        });
    }

    async validateArray(params: WebAssertionsTypes.ValidateArray): Promise<void> {
        await logStep(`Validating object ${params.elementName} all text`, async () => {
            const allText = await this.allTextContents(params.selector);
            expect(allText, `Validating all text of ${params.elementName} texts`).toEqual(
                expect.arrayContaining(params.expectedArray)
            );
        });
    }
}
