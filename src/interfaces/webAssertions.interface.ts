import type { Locator } from '@playwright/test';

export interface ValidateTextParams {
    elementName: string;
    selector: Locator;
    expectedValue: string;
}

export interface ValidateVisibility {
    elementName: string;
    selector: Locator;
    isVisible?: boolean;
}

export interface ValidateLength {
    elementName: string;
    selector: Locator;
    length: Locator;
}

export interface ValidateArray {
    elementName: string;
    selector: Locator;
    expectedArray: string[];
}
