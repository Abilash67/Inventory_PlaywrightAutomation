"use strict";

var _require = require("@playwright/test"),
    setup = _require.test;

var LoginPage = require("../../pages/authentication/LoginPage");

var loginData = require("../../test-data/loginData.json");

var authFile = "./auth/auth.json";
setup("Authenticate user", function _callee(_ref) {
  var page, login;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          page = _ref.page;
          login = new LoginPage(page); // Open Login Page

          _context.next = 4;
          return regeneratorRuntime.awrap(login.openApplication());

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(login.login(loginData.email, loginData.password));

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(page.context().storageState({
            path: authFile
          }));

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
});