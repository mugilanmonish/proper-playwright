/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { getFormattedTimestamp } from '@utils/common/dateUtil';

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);

export default function globalTeardown(): void {
    const timestamp: string = getFormattedTimestamp();

    const reportDir: string = path.join(__dirname, '../../report');
    const outputHtmlFile: string = path.join(reportDir, `report-${timestamp}.html`);
    const tempDir: string = path.join(__dirname, '../../.temp-allure');

    // Make sure folders exist
    if (!fs.existsSync(reportDir)) {
        fs.mkdirSync(reportDir, { recursive: true });
    }

    try {
        execSync(`allure generate allure-results --single-file --output ${tempDir}`);

        const generatedHtml: string = path.join(tempDir, 'index.html');

        if (fs.existsSync(generatedHtml)) {
            fs.copyFileSync(generatedHtml, outputHtmlFile);
            process.env.CI ? '' : console.log(`report Generated: ${outputHtmlFile}`);
        } else {
            console.error('❌ index.html not found in temp output.');
        }

        // Clean up temp folder
        fs.rmSync(tempDir, { recursive: true, force: true });
    } catch (err) {
        console.error('❌ Failed to generate Allure Report', err);
    }
}
