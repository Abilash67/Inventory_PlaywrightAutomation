const { test: setup } = require("@playwright/test");
const path = require("path");

const LoginPage = require("../../pages/authentication/LoginPage");
const credentials = require("../../config/credentials");

const authFile = path.resolve(__dirname, "../../auth/auth.json");

setup("Authenticate user", async ({ page }) => {
 const login = new LoginPage(page);

 await login.openApplication();
 await login.login(credentials.email, credentials.password);

 await page.context().storageState({
   path: authFile,
 });
});