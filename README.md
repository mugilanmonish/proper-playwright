# proper-playwright

Playwright command with UI mode: npx playwright test src/tests/demo.test.ts --ui

Playwright command with grep mode: npx playwright test --grep "smoke|regression"

Playwright command with grep mode and UI mode: npx playwright test --grep "smoke|regression" --ui

## Api Test Command

npx playwright test --config=playwright-api.config.ts src/tests/api/e2e/shopper/2_productViewAction.test.ts
