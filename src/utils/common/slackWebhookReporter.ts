// reporters/slackWebhookReporter.ts
import type { FullConfig, FullResult, Reporter, TestCase, TestResult } from '@playwright/test/reporter';

const WEBHOOK: string | undefined = process.env.SLACK_WEBHOOK_URL;
const REPORT_URL: string | undefined = process.env.PLAYWRIGHT_REPORT_URL;
const CI_JOB_URL: string | undefined = process.env.CI_JOB_URL;
const GIT_BRANCH: string | undefined = process.env.GIT_BRANCH || process.env.BRANCH_NAME;
const GIT_COMMIT: string | undefined = process.env.GIT_COMMIT || process.env.COMMIT_SHA;

type Failure = { title: string; file?: string; error?: string; duration?: number };
type BLOCKS = (
    | {
          type: string;
          text: {
              type: string;
              text: string;
          };
          elements?: undefined;
      }
    | {
          type: string;
          elements: {
              type: string;
              text: string;
          }[];
          text?: undefined;
      }
)[];

export default class SlackWebhookReporter implements Reporter {
    private failures: Failure[] = [];
    private config?: FullConfig;
    private startTime: number = 0;

    // counters
    private total: number = 0;
    private passed: number = 0;
    private failed: number = 0;
    private skipped: number = 0;
    private timedOut: number = 0;

    onBegin(config: FullConfig /*, suite: Suite */): void {
        this.config = config;
        this.startTime = Date.now();
    }

    onTestEnd(_test: TestCase, result: TestResult): void {
        this.total += 1;
        if (result.status === 'passed') this.passed += 1;
        else if (result.status === 'failed') this.failed += 1;
        else if (result.status === 'skipped') this.skipped += 1;
        else if (result.status === 'timedOut') this.timedOut += 1;

        if (result.status === 'failed' || result.status === 'timedOut') {
            this.failures.push({
                title: _test.title,
                file: _test.location?.file,
                error: result.error?.message,
                duration: result.duration
            });
        }
    }

    async onEnd(result: FullResult): Promise<void> {
        if (!WEBHOOK) {
            // eslint-disable-next-line no-console
            console.warn('SLACK_WEBHOOK_URL not set — skipping Slack notification.');
            return;
        }

        const statusText: string = (result.status ?? 'finished').toUpperCase();
        const runMs: number = Date.now() - this.startTime;
        const runSec: string = (runMs / 1000).toFixed(1);

        const header: string = `*ShopperStack Web*: ${statusText}`;
        const counts: string = `Tests: ${this.total} • Passed: ${this.passed} • Failed: ${this.failed}`;
        const meta: string = [
            GIT_BRANCH ? `• Branch: \`${GIT_BRANCH}\`\n` : null,
            GIT_COMMIT ? `Commit: \`${GIT_COMMIT}\`\n` : null,
            CI_JOB_URL ? `<${CI_JOB_URL}|Jenkins build>\n` : null,
            REPORT_URL ? `<${REPORT_URL}|Allure report>\n` : null,
            `Duration: ${runSec}s`
        ]
            .filter(Boolean)
            .join(' • ');

        // const failureSection = this.failures.length
        //     ? this.failures
        //           .slice(0, 10)
        //           .map(
        //               (f, i) =>
        //                   `${i + 1}. *${f.title}*${f.file ? ` — ${f.file}` : ''}${f.duration ? ` (${(f.duration / 1000).toFixed(2)}s)` : ''}\n\`\`\`${truncate(f.error ?? 'No message', 400)}\`\`\``
        //           )
        //           .join('\n\n')
        //     : '';

        const blocks: BLOCKS = [
            { type: 'section', text: { type: 'mrkdwn', text: header } },
            { type: 'section', text: { type: 'mrkdwn', text: `*${counts}*` } },
            { type: 'context', elements: [{ type: 'mrkdwn', text: meta }] }
        ];

        // if (this.failures.length) {
        //     blocks.push({ type: 'divider' });
        //     blocks.push({ type: 'section', text: { type: 'mrkdwn', text: `*Top ${Math.min(this.failures.length, 10)} failures:*` } });
        //     // Slack has block text size limits; show details in a code block section (truncated)
        //     blocks.push({ type: 'section', text: { type: 'mrkdwn', text: failureSection } });
        //     if (REPORT_URL) {
        //         blocks.push({ type: 'actions', elements: [{ type: 'button', text: { type: 'plain_text', text: 'Open Playwright Report' }, url: REPORT_URL }] });
        //     }
        // } else {
        //     blocks.push({ type: 'section', text: { type: 'mrkdwn', text: 'All tests passed :tada:' } });
        //     if (REPORT_URL) {
        //         blocks.push({ type: 'actions', elements: [{ type: 'button', text: { type: 'plain_text', text: 'Open Playwright Report' }, url: REPORT_URL }] });
        //     }
        // }

        const body: { text: string; blocks: BLOCKS } = { text: `${header}\n${counts}\n${meta}`, blocks };

        try {
            await sendWebhook(WEBHOOK, body);
            // eslint-disable-next-line no-console
            console.log('Slack notification sent');
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error('Failed to send Slack webhook:', (err as Error).message);
        }
    }
}

// // helpers
// function truncate(s: string, n = 300) {
//     return s.length > n ? s.slice(0, n) + '... (truncated)' : s;
// }

async function sendWebhook(webhookUrl: string, payload: unknown): Promise<void> {
    if (typeof globalThis.fetch === 'function') {
        await globalThis.fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
    }
}
