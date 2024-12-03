// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // Ensure this points to the correct test folder
  testMatch: '**/*.spec.ts', // Ensure this matches your test file names
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  reporter: [
    ['html', { outputFolder: 'test-results/html-report', open: 'always' }], // HTML reporter
    ['json', { outputFile: 'test-results/test-results.json' }],             // JSON reporter
    ['line'], // Default line reporter in the terminal
  ],
  use: {
    browserName: 'chromium', // or 'firefox', 'webkit'
    screenshot: 'only-on-failure',
  },
});
