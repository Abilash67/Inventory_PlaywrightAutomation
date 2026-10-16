const { defineConfig, devices } = require("@playwright/test");
const path = require("node:path");
const { getEnvironment } = require("./config/environments");

const { baseURL } = getEnvironment();
const isCI = Boolean(process.env.CI);

const authState = path.resolve(__dirname, "auth/auth.json");

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

    headless: process.env.HEADLESS === "true",

    viewport: {
      width: 1536,
      height: 864,
    },

    actionTimeout: 30000,

    navigationTimeout: 30000,

    screenshot: "only-on-failure",

    video: "retain-on-failure",

    trace: "retain-on-failure",
  },

  projects: [
    // ============================================================
    // AUTHENTICATION SETUP
    // ============================================================

    {
      name: "setup",
      testMatch: "authentication/auth.setup.js",
    },

    // ============================================================
    // LOGIN - CHROMIUM
    // ============================================================

    {
      name: "login",
      testMatch: "authentication/login.spec.js",
      use: {
        ...devices["Desktop Chrome"],
        browserName: "chromium",
      },
      dependencies: ["setup"],
    },

    // ============================================================
    // LOGIN - FIREFOX
    // ============================================================

    {
      name: "login-firefox",
      testMatch: "authentication/login.spec.js",
      use: {
        ...devices["Desktop Firefox"],
        browserName: "firefox",
      },
      dependencies: ["setup"],
    },

    // ============================================================
    // LOGIN - WEBKIT
    // ============================================================

    {
      name: "login-webkit",
      testMatch: "authentication/login.spec.js",
      use: {
        ...devices["Desktop Safari"],
        browserName: "webkit",
      },
      dependencies: ["setup"],
    },

    // ============================================================
    // DASHBOARD - CHROMIUM
    // ============================================================

    {
      name: "dashboard",
      testMatch: "dashboard/*.spec.js",
      use: {
        ...devices["Desktop Chrome"],
        browserName: "chromium",
        storageState: authState,
      },
      dependencies: ["setup"],
    },

    // ============================================================
    // DASHBOARD - FIREFOX
    // ============================================================

    {
      name: "dashboard-firefox",
      testMatch: "dashboard/*.spec.js",
      use: {
        ...devices["Desktop Firefox"],
        browserName: "firefox",
        storageState: authState,
      },
      dependencies: ["setup"],
    },

    // ============================================================
    // DASHBOARD - WEBKIT
    // ============================================================

    {
      name: "dashboard-webkit",
      testMatch: "dashboard/*.spec.js",
      use: {
        ...devices["Desktop Safari"],
        browserName: "webkit",
        storageState: authState,
      },
      dependencies: ["setup"],
    },

    // ============================================================
    // PROFILE - CHROMIUM
    // ============================================================

    {
      name: "profile",
      testMatch: "profile/*.spec.js",
      use: {
        ...devices["Desktop Chrome"],
        browserName: "chromium",
        storageState: authState,
      },
      dependencies: ["setup"],
    },

    // ============================================================
    // PROFILE - FIREFOX
    // ============================================================

    {
      name: "profile-firefox",
      testMatch: "profile/*.spec.js",
      use: {
        ...devices["Desktop Firefox"],
        browserName: "firefox",
        storageState: authState,
      },
      dependencies: ["setup"],
    },

    // ============================================================
    // PROFILE - WEBKIT
    // ============================================================

    {
      name: "profile-webkit",
      testMatch: "profile/*.spec.js",
      use: {
        ...devices["Desktop Safari"],
        browserName: "webkit",
        storageState: authState,
      },
      dependencies: ["setup"],
    },

    // ============================================================
    // INVENTORY - CHROMIUM
    // ============================================================

    {
      name: "inventory",
      testMatch: "inventory/*.spec.js",
      use: {
        ...devices["Desktop Chrome"],
        browserName: "chromium",
        storageState: authState,
      },
      dependencies: ["setup"],
    },

    // ============================================================
    // INVENTORY - FIREFOX
    // ============================================================

    {
      name: "inventory-firefox",
      testMatch: "inventory/*.spec.js",
      use: {
        ...devices["Desktop Firefox"],
        browserName: "firefox",
        storageState: authState,
      },
      dependencies: ["setup"],
    },

    // ============================================================
    // INVENTORY - WEBKIT
    // ============================================================

    {
      name: "inventory-webkit",
      testMatch: "inventory/*.spec.js",
      use: {
        ...devices["Desktop Safari"],
        browserName: "webkit",
        storageState: authState,
      },
      dependencies: ["setup"],
    },

    // ============================================================
    // USER MANAGEMENT - CHROMIUM
    // ============================================================

    {
      name: "user-management",
      testMatch: "user-management/*.spec.js",
      use: {
        ...devices["Desktop Chrome"],
        browserName: "chromium",
        storageState: authState,
      },
      dependencies: ["setup"],
    },

    // ============================================================
    // USER MANAGEMENT - FIREFOX
    // ============================================================

    {
      name: "user-management-firefox",
      testMatch: "user-management/*.spec.js",
      use: {
        ...devices["Desktop Firefox"],
        browserName: "firefox",
        storageState: authState,
      },
      dependencies: ["setup"],
    },

    // ============================================================
    // USER MANAGEMENT - WEBKIT
    // ============================================================

    {
      name: "user-management-webkit",
      testMatch: "user-management/*.spec.js",
      use: {
        ...devices["Desktop Safari"],
        browserName: "webkit",
        storageState: authState,
      },
      dependencies: ["setup"],
    },

    // ============================================================
    // ASSET MANAGEMENT - CHROMIUM
    // ============================================================

    {
      name: "asset-management",
      testMatch: "asset-management/*.spec.js",
      use: {
        ...devices["Desktop Chrome"],
        browserName: "chromium",
        storageState: authState,
      },
      dependencies: ["setup"],
    },

    // ============================================================
    // ASSET MANAGEMENT - FIREFOX
    // ============================================================

    {
      name: "asset-management-firefox",
      testMatch: "asset-management/*.spec.js",
      use: {
        ...devices["Desktop Firefox"],
        browserName: "firefox",
        storageState: authState,
      },
      dependencies: ["setup"],
    },

    // ============================================================
    // ASSET MANAGEMENT - WEBKIT
    // ============================================================

    {
      name: "asset-management-webkit",
      testMatch: "asset-management/*.spec.js",
      use: {
        ...devices["Desktop Safari"],
        browserName: "webkit",
        storageState: authState,
      },
      dependencies: ["setup"],
    },

    // ============================================================
    // LOGOUT - CHROMIUM
    // ============================================================

    {
      name: "logout",
      testMatch: "authentication/logout.spec.js",
      use: {
        ...devices["Desktop Chrome"],
        browserName: "chromium",
      },
      dependencies: ["setup"],
    },

    // ============================================================
    // LOGOUT - FIREFOX
    // ============================================================

    {
      name: "logout-firefox",
      testMatch: "authentication/logout.spec.js",
      use: {
        ...devices["Desktop Firefox"],
        browserName: "firefox",
      },
      dependencies: ["setup"],
    },

    // ============================================================
    // LOGOUT - WEBKIT
    // ============================================================

    {
      name: "logout-webkit",
      testMatch: "authentication/logout.spec.js",
      use: {
        ...devices["Desktop Safari"],
        browserName: "webkit",
      },
      dependencies: ["setup"],
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
