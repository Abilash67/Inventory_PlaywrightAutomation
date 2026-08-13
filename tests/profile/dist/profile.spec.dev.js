"use strict";

var _require = require("@playwright/test"),
    test = _require.test;

var LoginPage = require("../../pages/authentication/LoginPage");

var DashboardPage = require("../../pages/dashboard/DashboardPage");

var ProfilePage = require("../../pages/profile/ProfilePage");

var loginData = require("../../test-data/loginData.json");

var _require2 = require("../../utils/screenshotUtils"),
    captureScreenshot = _require2.captureScreenshot;

test("Profile Verification", function _callee(_ref) {
  var page, login, dashboard, profile;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          page = _ref.page;
          login = new LoginPage(page);
          dashboard = new DashboardPage(page);
          profile = new ProfilePage(page); // 1. Open Application

          _context.next = 6;
          return regeneratorRuntime.awrap(login.openApplication());

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(login.login(loginData.email, loginData.password));

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(dashboard.verifyDashboardLoaded());

        case 10:
          _context.next = 12;
          return regeneratorRuntime.awrap(dashboard.clickViewAssets());

        case 12:
          _context.next = 14;
          return regeneratorRuntime.awrap(profile.verifyProfileLoaded());

        case 14:
          _context.next = 16;
          return regeneratorRuntime.awrap(profile.verifyProfileDetails());

        case 16:
          _context.next = 18;
          return regeneratorRuntime.awrap(profile.verifyAssetsSection());

        case 18:
          _context.next = 20;
          return regeneratorRuntime.awrap(captureScreenshot(page, test.info(), "profile"));

        case 20:
        case "end":
          return _context.stop();
      }
    }
  });
});