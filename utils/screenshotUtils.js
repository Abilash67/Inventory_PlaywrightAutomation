const fs = require("fs");
const path = require("path");

async function captureScreenshot(page, testInfo, name) {
  const screenshotDir = path.join("screenshots");

  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  const screenshotPath = path.join(screenshotDir, `${name}.png`);

  await page.screenshot({
    path: screenshotPath,
    fullPage: true,
  });

  await testInfo.attach(`${name} Screenshot`, {
    path: screenshotPath,
    contentType: "image/png",
  });
}

module.exports = {
  captureScreenshot,
};
