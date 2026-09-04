const { test: setup } = require('@playwright/test');
const LoginPage = require('../pages/authentication/LoginPage');
const loginData = require('../test-data/loginData.json');

const authFile = 'auth/auth.json';

setup('authenticate once', async ({ page }) => {
    const login = new LoginPage(page);

    await login.openApplication();
    await login.login(loginData.email, loginData.password);
    await page.context().storageState({ path: authFile });
});
