async function captureScreenshot(page, testInfo, name) {
  const screenshotPath = `screenshots/${name}.png`;

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
