import { test } from '@playwright/test';
import { AllureReporter } from 'allure-playwright';
import type { TestResult, TestCase } from '@playwright/test/reporter';

export async function logStep(description: string, action: Promise<unknown>): Promise<unknown> {
    return await test.step(description, async () => await action);
}

export default class CustomAllureReporter extends AllureReporter {
    constructor(options: { detail?: boolean }) {
        super(options); // Pass options like { detail: false } to AllureReporter
    }

    override async onTestEnd(test: TestCase, result: TestResult): Promise<void> {
        // Filter out error-context.md attachments
        result.attachments = result.attachments.filter(
            (attachment) => !attachment.name?.includes('error-context')
        );
        await super.onTestEnd(test, result);
    }
}
