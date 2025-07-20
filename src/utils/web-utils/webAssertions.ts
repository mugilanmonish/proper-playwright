import { logStep } from '@utils/common/allureUtility';
import WebActions from './webActions';
import { expect } from '@playwright/test';
import type * as WebAssertionsTypes from 'types/customTypes/webAssertions.types';

export class WebAssertions extends WebActions {
    async validateText(params: WebAssertionsTypes.ValidateTextParams): Promise<void> {
        await logStep(`Validating ${params.elementName} text`, async () => {
            const text = await this.textContent(params.elementName, params.selector);
            expect(text, `${params.elementName} text is not displayed`).toBe(params.expectedValue);
        });
    }

    async validateVisibility(params: WebAssertionsTypes.ValidateVisibility): Promise<void> {
        await logStep(`Validating ${params.elementName} visibility`, async () => {
            await expect(params.selector, `${params.elementName} is not visible`).toBeVisible();
        });
    }
}
