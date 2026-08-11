"use strict";

function captureScreenshot(page, testInfo, name) {
  var screenshotPath;
  return regeneratorRuntime.async(function captureScreenshot$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          screenshotPath = "screenshots/".concat(name, ".png");
          _context.next = 3;
          return regeneratorRuntime.awrap(page.screenshot({
            path: screenshotPath,
            fullPage: true
          }));

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(testInfo.attach("".concat(name, " Screenshot"), {
            path: screenshotPath,
            contentType: "image/png"
          }));

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}

module.exports = {
  captureScreenshot: captureScreenshot
};