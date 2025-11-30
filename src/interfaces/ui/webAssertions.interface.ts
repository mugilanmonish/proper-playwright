import type { Locator } from '@playwright/test';

interface WebAssertions {
    elementName: string;
    selector: Locator;
}

export interface ValidateTextParams extends WebAssertions {
    expectedValue: string;
    normalizeCase?: boolean;
}

export interface ValidateVisibility extends WebAssertions {
    isVisible?: boolean;
}

export interface ValidateLength extends WebAssertions {
    length: Locator;
}

export interface ValidateArray extends WebAssertions {
    expectedArray: string[];
}

export interface ValidateCount extends WebAssertions {
    expectedCount: number;
}
