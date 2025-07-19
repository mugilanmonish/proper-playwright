import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Performs global setup tasks before running tests.
 *
 * This function removes the existing 'allure-results' directory (if it exists)
 * within the current directory. This ensures that previous test results do not
 * interfere with the current test run.
 *
 * @remarks
 * This function is intended to be used as a Playwright global setup script.
 */
export default function globalSetup(): void {
    const resultsDir = path.join(__dirname, '../../allure-results');

    if (fs.existsSync(resultsDir)) {
        fs.rmSync(resultsDir, { recursive: true, force: true });
    }
}
