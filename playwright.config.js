const { defineConfig, devices } = require("@playwright/test");
const path = require("node:path");
const { getEnvironment } = require("./config/environments");

const { baseURL } = getEnvironment();
const isCI = Boolean(process.env.CI);

module.exports = defineConfig({
  testDir: "./tests",

  timeout: 60000,

  fullyParallel: true,

  forbidOnly: isCI,

  retries: isCI ? 2 : 1,

  workers: 1,

  expect: {
    timeout: 10000,
  },

  use: {
    baseURL,
    browserName: "chromium",
    headless: process.env.HEADLESS === "true",

    viewport: {
      width: 1536,
      height: 864,
    },

    actionTimeout: 10000,

    navigationTimeout: 30000,

    screenshot: "only-on-failure",

    video: "retain-on-failure",

    trace: "retain-on-failure",
  },

  projects: [
    // ---------------------------------------------------------
    // Authentication setup
    // ---------------------------------------------------------
    {
      name: "setup",
      testMatch: /tests[\\/]authentication[\\/]auth\.setup\.js/,
    },

    // ---------------------------------------------------------
    // Login
    // ---------------------------------------------------------
    {
      name: "login",
      testMatch: /tests[\\/]authentication[\\/]login\.spec\.js/,
      dependencies: ["setup"],
    },

    // ---------------------------------------------------------
    // Dashboard
    // ---------------------------------------------------------
    {
      name: "dashboard",
      testMatch: /tests[\\/]dashboard[\\/].*\.spec\.js/,
      use: {
        ...devices["Desktop Chrome"],
        storageState: path.resolve(__dirname, "auth/auth.json"),
      },
      dependencies: ["setup"],
    },

    // ---------------------------------------------------------
    // Profile
    // ---------------------------------------------------------
    {
      name: "profile",
      testMatch: /tests[\\/]profile[\\/].*\.spec\.js/,
      use: {
        ...devices["Desktop Chrome"],
        storageState: path.resolve(__dirname, "auth/auth.json"),
      },
      dependencies: ["setup"],
    },

    // ---------------------------------------------------------
    // Inventory
    // ---------------------------------------------------------
    {
      name: "inventory",
      testMatch: /tests[\\/]inventory[\\/].*\.spec\.js/,
      use: {
        ...devices["Desktop Chrome"],
        storageState: path.resolve(__dirname, "auth/auth.json"),
      },
      dependencies: ["setup"],
    },

    // ---------------------------------------------------------
    // User Management
    // ---------------------------------------------------------
    {
      name: "user-management",
      testMatch: /tests[\\/]user-management[\\/].*\.spec\.js/,
      use: {
        ...devices["Desktop Chrome"],
        storageState: path.resolve(__dirname, "auth/auth.json"),
      },
      dependencies: ["setup"],
    },

    // ---------------------------------------------------------
    // Asset Management
    // ---------------------------------------------------------
    {
      name: "asset-management",
      testMatch: /tests[\\/]asset-management[\\/].*\.spec\.js/,
      use: {
        ...devices["Desktop Chrome"],
        storageState: path.resolve(__dirname, "auth/auth.json"),
      },
      dependencies: ["setup"],
    },

    // ---------------------------------------------------------
    // Logout
    // ---------------------------------------------------------
    {
      name: "logout",
      testMatch: /tests[\\/]authentication[\\/]logout\.spec\.js/,
      dependencies: ["setup"],
    },
  ],

  // ---------------------------------------------------------
  // Reporters
  // ---------------------------------------------------------
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
