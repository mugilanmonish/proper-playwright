import { test } from '@playwright/test';

/**
 * Logs a test step with the given description and executes the provided action within that step.
 *
 * @template T The return type of the action.
 * @param description - A string describing the step to be logged.
 * @param action - A function representing the action to be executed within the step. Can be synchronous or asynchronous.
 * @returns A promise that resolves to the result of the action.
 */
export async function logStep<T>(description: string, action: () => Promise<T> | T): Promise<T> {
    return await test.step(description, async () => {
        return await action();
    });
}
