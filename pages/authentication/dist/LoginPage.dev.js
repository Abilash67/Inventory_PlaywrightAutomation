"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require("@playwright/test"),
    expect = _require.expect;

var _require2 = require("../../constants/urls"),
    loginUrl = _require2.login;

var LoginPage =
/*#__PURE__*/
function () {
  function LoginPage(page) {
    _classCallCheck(this, LoginPage);

    this.page = page;
    this.email = page.getByRole("textbox").nth(0);
    this.password = page.getByRole("textbox").nth(1);
    this.passwordToggle = page.locator("button.password-toggle");
    this.loginButton = page.getByRole("button", {
      name: "Login",
      exact: true
    });
    this.rememberMe = page.getByLabel(/remember me/i);
    this.forgotPasswordLink = page.getByRole("link", {
      name: /forgot password/i
    });
    this.dashboardLink = page.getByRole("link", {
      name: /Dashboard/i
    });
    this.invalidCredentialsMessage = page.locator('div[id="1"]');
    this.notificationAlert = page.getByRole("alert");
  }

  _createClass(LoginPage, [{
    key: "openApplication",
    value: function openApplication() {
      return regeneratorRuntime.async(function openApplication$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(this.page["goto"](loginUrl, {
                waitUntil: "domcontentloaded",
                timeout: 30000
              }));

            case 2:
              _context.next = 4;
              return regeneratorRuntime.awrap(expect(this.page).toHaveURL(/\/login(?:\/)?$/, {
                timeout: 30000
              }));

            case 4:
              _context.next = 6;
              return regeneratorRuntime.awrap(expect(this.email).toBeVisible({
                timeout: 30000
              }));

            case 6:
              _context.next = 8;
              return regeneratorRuntime.awrap(expect(this.password).toBeVisible({
                timeout: 30000
              }));

            case 8:
              _context.next = 10;
              return regeneratorRuntime.awrap(expect(this.loginButton).toBeVisible({
                timeout: 30000
              }));

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "submit",
    value: function submit(username, password) {
      return regeneratorRuntime.async(function submit$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(this.email.fill(username));

            case 2:
              _context2.next = 4;
              return regeneratorRuntime.awrap(this.password.fill(password));

            case 4:
              _context2.next = 6;
              return regeneratorRuntime.awrap(this.loginButton.click());

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "submitFromField",
    value: function submitFromField(field, username, password) {
      return regeneratorRuntime.async(function submitFromField$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(this.email.fill(username));

            case 2:
              _context3.next = 4;
              return regeneratorRuntime.awrap(this.password.fill(password));

            case 4:
              _context3.next = 6;
              return regeneratorRuntime.awrap(field.press("Enter"));

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "togglePasswordVisibility",
    value: function togglePasswordVisibility() {
      return regeneratorRuntime.async(function togglePasswordVisibility$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(expect(this.passwordToggle).toBeVisible());

            case 2:
              _context4.next = 4;
              return regeneratorRuntime.awrap(this.passwordToggle.click());

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getErrorMessage",
    value: function getErrorMessage() {
      return this.invalidCredentialsMessage.or(this.notificationAlert);
    }
  }, {
    key: "clearForm",
    value: function clearForm() {
      return regeneratorRuntime.async(function clearForm$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(this.email.fill(""));

            case 2:
              _context5.next = 4;
              return regeneratorRuntime.awrap(this.password.fill(""));

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "expectLoginForm",
    value: function expectLoginForm() {
      return regeneratorRuntime.async(function expectLoginForm$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(expect(this.email).toBeVisible());

            case 2:
              _context6.next = 4;
              return regeneratorRuntime.awrap(expect(this.password).toBeVisible());

            case 4:
              _context6.next = 6;
              return regeneratorRuntime.awrap(expect(this.loginButton).toBeVisible());

            case 6:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "expectDashboard",
    value: function expectDashboard() {
      return regeneratorRuntime.async(function expectDashboard$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(expect(this.page).toHaveURL(/\/(?:dashboard)?\/?$/, {
                timeout: 30000
              }));

            case 2:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "login",
    value: function login(username, password) {
      return regeneratorRuntime.async(function login$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return regeneratorRuntime.awrap(this.submit(username, password));

            case 2:
              _context8.next = 4;
              return regeneratorRuntime.awrap(this.expectDashboard());

            case 4:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "expectInvalidCredentials",
    value: function expectInvalidCredentials() {
      var invalidMessage;
      return regeneratorRuntime.async(function expectInvalidCredentials$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              invalidMessage = this.invalidCredentialsMessage.or(this.notificationAlert);
              _context9.next = 3;
              return regeneratorRuntime.awrap(expect(invalidMessage).toBeVisible({
                timeout: 10000
              }));

            case 3:
              _context9.next = 5;
              return regeneratorRuntime.awrap(expect(invalidMessage).toContainText(/invalid email or password|incorrect email or password|request failed with status code 502/i));

            case 5:
            case "end":
              return _context9.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "expectOnLoginPage",
    value: function expectOnLoginPage() {
      return regeneratorRuntime.async(function expectOnLoginPage$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return regeneratorRuntime.awrap(expect(this.page).toHaveURL(/\/login(?:\/)?$/, {
                timeout: 30000
              }));

            case 2:
              _context10.next = 4;
              return regeneratorRuntime.awrap(expect(this.email).toBeVisible());

            case 4:
              _context10.next = 6;
              return regeneratorRuntime.awrap(expect(this.password).toBeVisible());

            case 6:
            case "end":
              return _context10.stop();
          }
        }
      }, null, this);
    }
  }]);

  return LoginPage;
}();

module.exports = LoginPage;