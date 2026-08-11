const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  // Test location
  testDir: "./tests",

  // Overall test timeout
  timeout: 60000,

  // Browser settings
  use: {
    browserName: "chromium",

    headless: false,

    viewport: {
      width: 1536,
      height: 864,
    },

    // Action timeout
    actionTimeout: 10000,

    // Navigation timeout
    navigationTimeout: 30000,

    // Assertion timeout
    expect: {
      timeout: 10000,
    },

    // Screenshot when test fails
    screenshot: "only-on-failure",

    // Record video when test fails
    video: "retain-on-failure",

    // Trace when test fails
    trace: "retain-on-failure",
  },

  // Reporters
  reporter: [
    [
      "html",
      {
        outputFolder: "playwright-report",
        open: "never",
      },
    ],

    ["list"],

    [
      "allure-playwright",
      {
        resultsDir: "allure-results",
      },
    ],
  ],
});
