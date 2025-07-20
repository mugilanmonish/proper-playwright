import type { Locator } from '@playwright/test';

export interface ValidateTextParams {
    elementName: string;
    selector: Locator;
    expectedValue: string;
}

export interface ValidateVisibility {
    elementName: string;
    selector: Locator;
}

export interface ValidateLength {
    elementName: string;
    selector: Locator;
    length: Locator;
}

export interface ValidateObject {
    elementName: string;
    selector: Locator;
    expectedObj: object;
}
