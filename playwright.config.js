const { defineConfig, devices } = require("@playwright/test");
const path = require("path");
const { getEnvironment } = require("./config/environments");

const { baseURL } = getEnvironment();
const isCI = Boolean(process.env.CI);

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 60000,
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  expect: {
    timeout: 10000,
  },
  use: {
    baseURL,
    browserName: "chromium",
    headless: process.env.HEADLESS === "true",
    viewport: { width: 1536, height: 864 },
    actionTimeout: 10000,
    navigationTimeout: 30000,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "setup",
      testMatch: /.*\.setup\.js/,
    },
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        browserName: "chromium",
        storageState: path.resolve(__dirname, "auth/auth.json"),
      },
      dependencies: ["setup"],
      testIgnore: /tests[\\/]authentication[\\/].*\.spec\.js/,
    },
    {
      name: "authentication",
      testMatch: /tests[\\/]authentication[\\/].*\.spec\.js/,
    },
  ],
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
