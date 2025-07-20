/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { getFormattedTimestamp } from '@utils/common/dateUtil';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function globalTeardown(): void {
    const timestamp = getFormattedTimestamp();

    const reportDir = path.join(__dirname, '../../Report');
    const outputHtmlFile = path.join(reportDir, `Report-${timestamp}.html`);
    const tempDir = path.join(__dirname, '../../.temp-allure');

    // Make sure folders exist
    if (!fs.existsSync(reportDir)) {
        fs.mkdirSync(reportDir, { recursive: true });
    }

    try {
        execSync(`allure generate allure-results --single-file --output ${tempDir}`);

        const generatedHtml = path.join(tempDir, 'index.html');

        if (fs.existsSync(generatedHtml)) {
            fs.copyFileSync(generatedHtml, outputHtmlFile);
            console.log(`Report Generated: ${outputHtmlFile}`);
        } else {
            console.error('❌ index.html not found in temp output.');
        }

        // Clean up temp folder
        fs.rmSync(tempDir, { recursive: true, force: true });
    } catch (err) {
        console.error('❌ Failed to generate Allure report', err);
    }
}
