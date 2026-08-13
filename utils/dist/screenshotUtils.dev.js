"use strict";

var fs = require("fs");

var path = require("path");

function captureScreenshot(page, testInfo, name) {
  var screenshotDir, screenshotPath;
  return regeneratorRuntime.async(function captureScreenshot$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          screenshotDir = path.join("screenshots");

          if (!fs.existsSync(screenshotDir)) {
            fs.mkdirSync(screenshotDir, {
              recursive: true
            });
          }

          screenshotPath = path.join(screenshotDir, "".concat(name, ".png"));
          _context.next = 5;
          return regeneratorRuntime.awrap(page.screenshot({
            path: screenshotPath,
            fullPage: true
          }));

        case 5:
          _context.next = 7;
          return regeneratorRuntime.awrap(testInfo.attach("".concat(name, " Screenshot"), {
            path: screenshotPath,
            contentType: "image/png"
          }));

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
}

module.exports = {
  captureScreenshot: captureScreenshot
};