const { test: base, expect } = require('@playwright/test');
const LoginPage = require('../pages/authentication/LoginPage');
const DashboardPage = require('../pages/dashboard/DashboardPage');
const { InventoryPage } = require('../pages/inventory/InventoryPage');
const { TechnicalAssetPage } = require('../pages/inventory/TechnicalAssetPage');

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
});

module.exports = {
  test,
  expect,
};
