const { test: base, expect } = require("@playwright/test");

const LoginPage = require("../pages/authentication/LoginPage");
const DashboardPage = require("../pages/dashboard/DashboardPage");

const { InventoryPage } = require("../pages/inventory/InventoryPage");

const TechnicalAssetPage = require("../pages/inventory/TechnicalAssetPage");

const {
  SoftwareLicensePage,
} = require("../pages/inventory/SoftwareLicensePage");

const {
  InfrastructureAssetPage,
} = require("../pages/inventory/InfrastructureAssetPage");

const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  technicalAssetPage: async ({ page }, use) => {
    await use(new TechnicalAssetPage(page));
  },

  softwareLicensePage: async ({ page }, use) => {
    await use(new SoftwareLicensePage(page));
  },

  infrastructureAssetPage: async ({ page }, use) => {
    await use(new InfrastructureAssetPage(page));
  },
});

module.exports = {
  test,
  expect,
};
