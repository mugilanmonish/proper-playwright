import { test } from '@playwright/test';

export async function logStep<T>(description: string, action: () => Promise<T>): Promise<T> {
    return await test.step(description, action);
}
