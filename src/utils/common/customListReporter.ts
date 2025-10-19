import type { FullConfig } from '@playwright/test';
import type { Reporter, TestCase, TestResult, Suite } from '@playwright/test/reporter';

export default class CustomListReporter implements Reporter {
    onTestBegin(test: TestCase): void {
        console.log(`Test Started: ${test.title}`);
    }

    onTestEnd(test: TestCase, result: TestResult): void {
        const title = test.titlePath().slice(1).join(' › ');
        const duration = (result.duration / 1000).toFixed(2);

        if (result.status === 'passed') {
            console.log(`  ✓ ${title} (${duration}s)`);
        } else if (result.status === 'failed') {
            console.log(`  ✘ ${title} (${duration}s)`);
            if (process.env.CI === 'false' && result.errors.length > 0) {
                const error = result.errors[0];
                const messageWithoutAttachments = error.message?.split('attachment #')[0].trim() || 'Test failed';
                console.log(`     ${messageWithoutAttachments}\n`);
            }
        } else if (result.status === 'skipped') {
            console.log(`  ⊘ Test Skipped: ${title}`);
        } else if (result.status === 'timedOut') {
            console.log(`  ✘ ${title} (${duration}s) - Timeout`);
            if (result.errors.length > 0) {
                const error = result.errors[0];
                const messageWithoutAttachments = error.message?.split('attachment #')[0].trim() || 'Test timed out';
                console.log(`     ${messageWithoutAttachments}\n`);
            }
        }
    }

    onBegin(config: FullConfig, suite: Suite): void {
        const testCount = suite.allTests().length;
        const workerCount = config.workers;
        console.log(`Running ${testCount} test${testCount > 1 ? 's' : ''} using ${workerCount} worker${workerCount > 1 ? 's' : ''}\n`);
    }

    // onEnd(): void {}

    onError(error: { message: any }): void {
        console.log(`Error: ${error.message}`);
    }

    onStdOut(chunk: string | Buffer): void {
        try {
            const out = typeof chunk === 'string' ? chunk : chunk.toString('utf8');
            if (process.env.CI !== 'true') {
                console.log(`[log] ${out}`);
            }
        } catch (e) {
            console.error('onStdOut error', e);
        }
    }

    onStdErr(chunk: string | Buffer): void {
        try {
            const out = typeof chunk === 'string' ? chunk : chunk.toString('utf8');
            if (process.env.CI !== 'true') {
                console.log(`[err] ${out}`);
            }
        } catch (e) {
            console.error('onStdErr error', e);
        }
    }
}
