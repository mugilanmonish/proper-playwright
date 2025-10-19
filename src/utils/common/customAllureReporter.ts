/**
 * CustomAllureReporter extends the default AllureReporter to provide custom behavior
 * for handling test results in Playwright.
 *
 * @remarks
 * This reporter filters out attachments whose names include 'error-context' from the test results
 * before passing them to the base AllureReporter. This is useful for excluding specific
 * attachments from Allure reports.
 *
 * @param options - Reporter options, such as `{ detail: false }`.
 */
import { AllureReporter } from 'allure-playwright';
import type { TestResult, TestCase } from '@playwright/test/reporter';

export default class CustomAllureReporter extends AllureReporter {
    constructor(options: { detail?: boolean }) {
        super(options); // Pass options like { detail: false } to AllureReporter
    }

    override async onTestEnd(test: TestCase, result: TestResult): Promise<void> {
        // Filter out error-context.md attachments
        result.attachments = result.attachments.filter((attachment) => !attachment.name?.includes('error-context'));
        await super.onTestEnd(test, result);
    }
}
