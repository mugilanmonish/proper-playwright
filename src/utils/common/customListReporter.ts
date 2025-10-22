/* eslint-disable */
import type { FullConfig } from '@playwright/test';
import type { Reporter, TestCase, TestResult, Suite } from '@playwright/test/reporter';

// ANSI color codes
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    cyan: '\x1b[36m',
    gray: '\x1b[90m'
};

export default class CustomListReporter implements Reporter {
    onBegin(config: FullConfig, suite: Suite): void {
        const testCount = suite.allTests().length;
        const workerCount = config.workers;
        console.log(
            `${colors.cyan}Running ${testCount} test${testCount > 1 ? 's' : ''} using ${workerCount} worker${workerCount > 1 ? 's' : ''}${colors.reset}\n`
        );
    }

    onTestBegin(test: TestCase): void {
        console.log(`${colors.gray}→ Test Started: ${test.title}${colors.reset}`);
    }

    onTestEnd(test: TestCase, result: TestResult): void {
        const title = test.titlePath().slice(1).join(' › ');
        const duration = (result.duration / 1000).toFixed(2);

        if (result.status === 'passed') {
            console.log(`${colors.green}  ✓ ${title}${colors.reset} ${colors.gray}(${duration}s)${colors.reset}`);
        } else if (result.status === 'failed') {
            console.log(`${colors.red}  ✘ ${title}${colors.reset} ${colors.gray}(${duration}s)${colors.reset}`);
            if (result.errors.length > 0) {
                const error = result.errors[0];
                const messageWithoutAttachments = error.message?.split('attachment #')[0].trim() || 'Test failed';
                console.log(`${colors.red}     ${messageWithoutAttachments}${colors.reset}\n`);
            }
        } else if (result.status === 'skipped') {
            console.log(`${colors.yellow}  ⊘ Test Skipped: ${title}${colors.reset}`);
        } else if (result.status === 'timedOut') {
            console.log(`${colors.red}  ✘ ${title}${colors.reset} ${colors.gray}(${duration}s) - Timeout${colors.reset}`);
            if (result.errors.length > 0) {
                const error = result.errors[0];
                const messageWithoutAttachments = error.message?.split('attachment #')[0].trim() || 'Test timed out';
                console.log(`${colors.red}     ${messageWithoutAttachments}${colors.reset}\n`);
            }
        }
    }

    onError(error: { message: string }): void {
        console.log(`${colors.red}Error: ${error.message}${colors.reset}`);
    }

    onStdOut(chunk: string | Buffer): void {
        try {
            const out = typeof chunk === 'string' ? chunk : chunk.toString('utf8');
            if (process.env.CI !== 'true') {
                console.log(`${colors.gray}[log] ${out}${colors.reset}`);
            }
        } catch (e) {
            console.error('onStdOut error', e);
        }
    }

    onStdErr(chunk: string | Buffer): void {
        try {
            const out = typeof chunk === 'string' ? chunk : chunk.toString('utf8');
            if (process.env.CI !== 'true') {
                console.log(`${colors.red}[err] ${out}${colors.reset}`);
            }
        } catch (e) {
            console.error('onStdErr error', e);
        }
    }
}
