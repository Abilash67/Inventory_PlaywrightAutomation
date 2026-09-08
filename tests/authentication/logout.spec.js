const { test, expect } = require("@playwright/test");

const LoginPage = require("../../pages/authentication/LoginPage");
const DashboardPage = require("../../pages/dashboard/DashboardPage");
const credentials = require("../../config/credentials");

async function loginToDashboard(page) {
  const login = new LoginPage(page);
  await login.openApplication();
  await login.login(credentials.email, credentials.password);
  return new DashboardPage(page);
}

test.describe("Logout", () => {
  test("allows a user to cancel logout", async ({ page }) => {
    const dashboard = await loginToDashboard(page);

    await dashboard.cancelLogout();
  });

  test("confirms logout and returns to the login page", async ({ page }) => {
    const dashboard = await loginToDashboard(page);
    const login = new LoginPage(page);

    await dashboard.logout();
    await login.expectOnLoginPage();
  });

  test("does not restore an authenticated session after logout", async ({
    page,
  }) => {
    const dashboard = await loginToDashboard(page);
    const login = new LoginPage(page);

    await dashboard.logout();
    await page.goto("/");
    await login.expectOnLoginPage();
  });

  test("clears client session data after logout", async ({ page }) => {
    const dashboard = await loginToDashboard(page);

    await dashboard.logout();
    const clientState = await page.evaluate(() => ({
      localStorage: localStorage.length,
      sessionStorage: sessionStorage.length,
    }));
    expect(clientState).toEqual({ localStorage: 0, sessionStorage: 0 });
    const authenticationCookies = (await page.context().cookies()).filter(
      ({ name }) => /auth|token|session|jwt/i.test(name),
    );
    expect(authenticationCookies).toEqual([]);
  });

  test("logs out successfully from the Inventory page", async ({ page }) => {
    const dashboard = await loginToDashboard(page);

    await page.goto("/inventory");
    await dashboard.logout();
    await expect(page).toHaveURL(/\/login/);
  });

  test("invalidates another tab after logout", async ({ context }) => {
    const firstTab = await context.newPage();
    const secondTab = await context.newPage();
    const firstLogin = new LoginPage(firstTab);
    const secondLogin = new LoginPage(secondTab);
    const firstDashboard = new DashboardPage(firstTab);

    try {
      await firstLogin.openApplication();
      await firstLogin.login(credentials.email, credentials.password);
      await secondTab.goto("/");
      await secondLogin.expectDashboard();
      await firstDashboard.logout();
      await secondTab.reload({ waitUntil: "domcontentloaded" });
      await secondLogin.expectOnLoginPage();
    } finally {
      await Promise.all([firstTab.close(), secondTab.close()]);
    }
  });

  test("redirects a bookmarked dashboard URL to login after logout", async ({
    page,
  }) => {
    const dashboard = await loginToDashboard(page);

    await dashboard.logout();
    await page.goto("/");
    await expect(page).toHaveURL(/\/login/);
  });
});
