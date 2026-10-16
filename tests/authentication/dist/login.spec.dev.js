"use strict";

var _require = require("@playwright/test"),
    test = _require.test,
    expect = _require.expect;

var LoginPage = require("../../pages/authentication/LoginPage");

var DashboardPage = require("../../pages/dashboard/DashboardPage");

var credentials = require("../../config/credentials");

test.describe("Login", function () {
  test("renders the login form with required controls", function _callee(_ref) {
    var page, login;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            page = _ref.page;
            login = new LoginPage(page);
            _context.next = 4;
            return regeneratorRuntime.awrap(login.openApplication());

          case 4:
            _context.next = 6;
            return regeneratorRuntime.awrap(expect(login.email).toHaveAttribute("type", "email"));

          case 6:
            _context.next = 8;
            return regeneratorRuntime.awrap(expect(login.password).toHaveAttribute("type", "password"));

          case 8:
            _context.next = 10;
            return regeneratorRuntime.awrap(expect(login.loginButton).toHaveAttribute("type", "submit"));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    });
  });
  test("validates the password field type", function _callee2(_ref2) {
    var page, login;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            page = _ref2.page;
            login = new LoginPage(page);
            _context2.next = 4;
            return regeneratorRuntime.awrap(login.openApplication());

          case 4:
            _context2.next = 6;
            return regeneratorRuntime.awrap(expect(login.password).toHaveAttribute("type", "password"));

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
  test("redirects direct dashboard access to the login page", function _callee3(_ref3) {
    var page, login;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            page = _ref3.page;
            login = new LoginPage(page);
            _context3.next = 4;
            return regeneratorRuntime.awrap(page["goto"]("/"));

          case 4:
            _context3.next = 6;
            return regeneratorRuntime.awrap(login.expectOnLoginPage());

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    });
  });
  test("redirects protected URLs to login when unauthenticated", function _callee4(_ref4) {
    var page, login;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            page = _ref4.page;
            login = new LoginPage(page);
            _context4.next = 4;
            return regeneratorRuntime.awrap(page["goto"]("/inventory", {
              waitUntil: "commit",
              timeout: 30000
            }));

          case 4:
            _context4.next = 6;
            return regeneratorRuntime.awrap(login.expectOnLoginPage());

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    });
  });
  test("supports mobile login layout", function _callee5(_ref5) {
    var page, login;
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            page = _ref5.page;
            _context5.next = 3;
            return regeneratorRuntime.awrap(page.setViewportSize({
              width: 390,
              height: 844
            }));

          case 3:
            login = new LoginPage(page);
            _context5.next = 6;
            return regeneratorRuntime.awrap(login.openApplication());

          case 6:
            _context5.next = 8;
            return regeneratorRuntime.awrap(login.expectLoginForm());

          case 8:
            _context5.next = 10;
            return regeneratorRuntime.awrap(expect(login.loginButton).toBeInViewport());

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    });
  });
  test("keeps the user on the login page when fields are empty", function _callee6(_ref6) {
    var page, login;
    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            page = _ref6.page;
            login = new LoginPage(page);
            _context6.next = 4;
            return regeneratorRuntime.awrap(login.openApplication());

          case 4:
            _context6.next = 6;
            return regeneratorRuntime.awrap(login.loginButton.click());

          case 6:
            _context6.next = 8;
            return regeneratorRuntime.awrap(expect(login.email).toHaveValue(""));

          case 8:
            _context6.next = 10;
            return regeneratorRuntime.awrap(expect(login.password).toHaveValue(""));

          case 10:
            _context6.next = 12;
            return regeneratorRuntime.awrap(login.expectOnLoginPage());

          case 12:
          case "end":
            return _context6.stop();
        }
      }
    });
  });
  test("toggles password visibility without changing the password value", function _callee7(_ref7) {
    var page, login;
    return regeneratorRuntime.async(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            page = _ref7.page;
            login = new LoginPage(page);
            _context7.next = 4;
            return regeneratorRuntime.awrap(login.openApplication());

          case 4:
            _context7.next = 6;
            return regeneratorRuntime.awrap(login.password.fill(credentials.password));

          case 6:
            _context7.next = 8;
            return regeneratorRuntime.awrap(expect(login.password).toHaveAttribute("type", "password"));

          case 8:
            _context7.next = 10;
            return regeneratorRuntime.awrap(expect(login.password).toHaveValue(credentials.password));

          case 10:
            _context7.next = 12;
            return regeneratorRuntime.awrap(login.togglePasswordVisibility());

          case 12:
            _context7.next = 14;
            return regeneratorRuntime.awrap(expect(login.password).toHaveAttribute("type", "text"));

          case 14:
            _context7.next = 16;
            return regeneratorRuntime.awrap(expect(login.password).toHaveValue(credentials.password));

          case 16:
            _context7.next = 18;
            return regeneratorRuntime.awrap(login.togglePasswordVisibility());

          case 18:
            _context7.next = 20;
            return regeneratorRuntime.awrap(expect(login.password).toHaveAttribute("type", "password"));

          case 20:
            _context7.next = 22;
            return regeneratorRuntime.awrap(expect(login.password).toHaveValue(credentials.password));

          case 22:
          case "end":
            return _context7.stop();
        }
      }
    });
  });
  test("autofocuses email and moves focus to password with Tab", function _callee8(_ref8) {
    var page, login;
    return regeneratorRuntime.async(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            page = _ref8.page;
            test.fail(true, "QA currently does not autofocus the email field on the login page");
            login = new LoginPage(page);
            _context8.next = 5;
            return regeneratorRuntime.awrap(login.openApplication());

          case 5:
            _context8.next = 7;
            return regeneratorRuntime.awrap(expect(login.email).toBeFocused());

          case 7:
            _context8.next = 9;
            return regeneratorRuntime.awrap(login.email.press("Tab"));

          case 9:
            _context8.next = 11;
            return regeneratorRuntime.awrap(expect(login.password).toBeFocused());

          case 11:
          case "end":
            return _context8.stop();
        }
      }
    });
  }); // ==========================================
  // Tests below require a valid login. They are
  // grouped together and kept away from the
  // invalid-credential tests at the end of this
  // file: submitting several wrong-credential
  // attempts in quick succession can trip the
  // app's login throttling, which then rejects
  // the next valid login for a short window.
  // ==========================================

  test("returns to the dashboard after navigating to login and dashboard", function _callee9(_ref9) {
    var page, login, dashboard;
    return regeneratorRuntime.async(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            page = _ref9.page;
            login = new LoginPage(page);
            dashboard = new DashboardPage(page);
            _context9.next = 5;
            return regeneratorRuntime.awrap(login.openApplication());

          case 5:
            _context9.next = 7;
            return regeneratorRuntime.awrap(login.login(credentials.email, credentials.password));

          case 7:
            _context9.next = 9;
            return regeneratorRuntime.awrap(page["goto"]("/login", {
              waitUntil: "domcontentloaded",
              timeout: 30000
            }));

          case 9:
            _context9.next = 11;
            return regeneratorRuntime.awrap(login.expectOnLoginPage());

          case 11:
            _context9.next = 13;
            return regeneratorRuntime.awrap(page["goto"]("/", {
              waitUntil: "domcontentloaded",
              timeout: 30000
            }));

          case 13:
            _context9.next = 15;
            return regeneratorRuntime.awrap(login.expectDashboard());

          case 15:
            _context9.next = 17;
            return regeneratorRuntime.awrap(dashboard.verifyDashboardLoaded());

          case 17:
          case "end":
            return _context9.stop();
        }
      }
    });
  });
  test("logs in with valid credentials and opens the dashboard @smoke", function _callee10(_ref10) {
    var page, login, dashboard;
    return regeneratorRuntime.async(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            page = _ref10.page;
            login = new LoginPage(page);
            dashboard = new DashboardPage(page);
            _context10.next = 5;
            return regeneratorRuntime.awrap(login.openApplication());

          case 5:
            _context10.next = 7;
            return regeneratorRuntime.awrap(login.login(credentials.email, credentials.password));

          case 7:
            _context10.next = 9;
            return regeneratorRuntime.awrap(dashboard.verifyDashboardLoaded());

          case 9:
            _context10.next = 11;
            return regeneratorRuntime.awrap(expect(page).not.toHaveURL(/\/login(?:\/)?$/));

          case 11:
          case "end":
            return _context10.stop();
        }
      }
    });
  });
  test("submits from the email and password fields with Enter", function _callee11(_ref11) {
    var page, login, dashboard;
    return regeneratorRuntime.async(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            page = _ref11.page;
            login = new LoginPage(page);
            dashboard = new DashboardPage(page);
            _context11.next = 5;
            return regeneratorRuntime.awrap(login.openApplication());

          case 5:
            _context11.next = 7;
            return regeneratorRuntime.awrap(login.submitFromField(login.email, credentials.email, credentials.password));

          case 7:
            _context11.next = 9;
            return regeneratorRuntime.awrap(login.expectDashboard());

          case 9:
            _context11.next = 11;
            return regeneratorRuntime.awrap(dashboard.verifyDashboardLoaded());

          case 11:
            _context11.next = 13;
            return regeneratorRuntime.awrap(dashboard.logout());

          case 13:
            _context11.next = 15;
            return regeneratorRuntime.awrap(login.openApplication());

          case 15:
            _context11.next = 17;
            return regeneratorRuntime.awrap(login.submitFromField(login.password, credentials.email, credentials.password));

          case 17:
            _context11.next = 19;
            return regeneratorRuntime.awrap(login.expectDashboard());

          case 19:
            _context11.next = 21;
            return regeneratorRuntime.awrap(dashboard.verifyDashboardLoaded());

          case 21:
          case "end":
            return _context11.stop();
        }
      }
    });
  });
  test("redirects to the dashboard and displays dashboard elements", function _callee12(_ref12) {
    var page, login, dashboard;
    return regeneratorRuntime.async(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            page = _ref12.page;
            login = new LoginPage(page);
            dashboard = new DashboardPage(page);
            _context12.next = 5;
            return regeneratorRuntime.awrap(login.openApplication());

          case 5:
            _context12.next = 7;
            return regeneratorRuntime.awrap(login.login(credentials.email, credentials.password));

          case 7:
            _context12.next = 9;
            return regeneratorRuntime.awrap(expect(page).toHaveURL(/\/(?:dashboard)?\/?$/));

          case 9:
            _context12.next = 11;
            return regeneratorRuntime.awrap(dashboard.verifyDashboardLoaded());

          case 11:
            _context12.next = 13;
            return regeneratorRuntime.awrap(dashboard.verifyCards());

          case 13:
            _context12.next = 15;
            return regeneratorRuntime.awrap(dashboard.verifyUser());

          case 15:
          case "end":
            return _context12.stop();
        }
      }
    });
  });
  test("keeps the authenticated user on the dashboard after refresh", function _callee13(_ref13) {
    var page, login, dashboard;
    return regeneratorRuntime.async(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            page = _ref13.page;
            login = new LoginPage(page);
            dashboard = new DashboardPage(page);
            _context13.next = 5;
            return regeneratorRuntime.awrap(login.openApplication());

          case 5:
            _context13.next = 7;
            return regeneratorRuntime.awrap(login.login(credentials.email, credentials.password));

          case 7:
            _context13.next = 9;
            return regeneratorRuntime.awrap(page.reload({
              waitUntil: "domcontentloaded"
            }));

          case 9:
            _context13.next = 11;
            return regeneratorRuntime.awrap(expect(page).not.toHaveURL(/\/login(?:\/)?$/, {
              timeout: 30000
            }));

          case 11:
            _context13.next = 13;
            return regeneratorRuntime.awrap(dashboard.verifyDashboardLoaded());

          case 13:
            _context13.next = 15;
            return regeneratorRuntime.awrap(dashboard.verifyCards());

          case 15:
          case "end":
            return _context13.stop();
        }
      }
    });
  });
  test("trims leading and trailing email whitespace but rejects internal whitespace", function _callee14(_ref14) {
    var page, login, dashboard, whitespaceVariants, _i, _whitespaceVariants, email;

    return regeneratorRuntime.async(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            page = _ref14.page;
            login = new LoginPage(page);
            dashboard = new DashboardPage(page);
            whitespaceVariants = ["  ".concat(credentials.email), "".concat(credentials.email, "  ")];
            _i = 0, _whitespaceVariants = whitespaceVariants;

          case 5:
            if (!(_i < _whitespaceVariants.length)) {
              _context14.next = 18;
              break;
            }

            email = _whitespaceVariants[_i];
            _context14.next = 9;
            return regeneratorRuntime.awrap(login.openApplication());

          case 9:
            _context14.next = 11;
            return regeneratorRuntime.awrap(login.login(email, credentials.password));

          case 11:
            _context14.next = 13;
            return regeneratorRuntime.awrap(dashboard.verifyDashboardLoaded());

          case 13:
            _context14.next = 15;
            return regeneratorRuntime.awrap(dashboard.logout());

          case 15:
            _i++;
            _context14.next = 5;
            break;

          case 18:
            _context14.next = 20;
            return regeneratorRuntime.awrap(login.openApplication());

          case 20:
            _context14.next = 22;
            return regeneratorRuntime.awrap(login.submit(credentials.email.replace("@", " @"), credentials.password));

          case 22:
            _context14.next = 24;
            return regeneratorRuntime.awrap(login.expectOnLoginPage());

          case 24:
          case "end":
            return _context14.stop();
        }
      }
    });
  }); // ==========================================
  // Invalid-credential tests. Kept together at
  // the end of the file, after the tests above
  // that require a real login, so a burst of
  // deliberately wrong login attempts here does
  // not trip the app's login throttling ahead of
  // a valid-credential test.
  // ==========================================

  test("validates invalid-credential error message content", function _callee15(_ref15) {
    var page, login;
    return regeneratorRuntime.async(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            page = _ref15.page;
            login = new LoginPage(page);
            _context15.next = 4;
            return regeneratorRuntime.awrap(login.openApplication());

          case 4:
            _context15.next = 6;
            return regeneratorRuntime.awrap(login.submit("invalid-user@example.com", "DefinitelyWrongPassword!"));

          case 6:
            _context15.next = 8;
            return regeneratorRuntime.awrap(login.expectInvalidCredentials());

          case 8:
          case "end":
            return _context15.stop();
        }
      }
    });
  });
  test("clears the invalid-credential error after a new form interaction", function _callee16(_ref16) {
    var page, login;
    return regeneratorRuntime.async(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            page = _ref16.page;
            login = new LoginPage(page);
            _context16.next = 4;
            return regeneratorRuntime.awrap(login.openApplication());

          case 4:
            _context16.next = 6;
            return regeneratorRuntime.awrap(login.submit("invalid-user@example.com", "DefinitelyWrongPassword!"));

          case 6:
            _context16.next = 8;
            return regeneratorRuntime.awrap(login.expectInvalidCredentials());

          case 8:
            _context16.next = 10;
            return regeneratorRuntime.awrap(login.email.fill(credentials.email));

          case 10:
            _context16.next = 12;
            return regeneratorRuntime.awrap(expect(login.getErrorMessage()).toBeHidden());

          case 12:
          case "end":
            return _context16.stop();
        }
      }
    });
  });
  test("rejects an invalid email and password", function _callee17(_ref17) {
    var page, login;
    return regeneratorRuntime.async(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            page = _ref17.page;
            login = new LoginPage(page);
            _context17.next = 4;
            return regeneratorRuntime.awrap(login.openApplication());

          case 4:
            _context17.next = 6;
            return regeneratorRuntime.awrap(login.submit("invalid-user@example.com", "DefinitelyWrongPassword!"));

          case 6:
            _context17.next = 8;
            return regeneratorRuntime.awrap(login.expectInvalidCredentials());

          case 8:
            _context17.next = 10;
            return regeneratorRuntime.awrap(login.expectOnLoginPage());

          case 10:
          case "end":
            return _context17.stop();
        }
      }
    });
  });
  test("rejects an incorrectly formatted email before authentication", function _callee18(_ref18) {
    var page, login;
    return regeneratorRuntime.async(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            page = _ref18.page;
            login = new LoginPage(page);
            _context18.next = 4;
            return regeneratorRuntime.awrap(login.openApplication());

          case 4:
            _context18.next = 6;
            return regeneratorRuntime.awrap(login.submit("not-an-email", "AnyPassword123!"));

          case 6:
            _context18.next = 8;
            return regeneratorRuntime.awrap(login.expectOnLoginPage());

          case 8:
          case "end":
            return _context18.stop();
        }
      }
    });
  });
  test("accepts uppercase, mixed-case, and lowercase email addresses", function _callee19(_ref19) {
    var page, login, dashboard, emailVariants, _i2, _emailVariants, email;

    return regeneratorRuntime.async(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            page = _ref19.page;
            test.fail(true, "QA currently rejects uppercase and mixed-case variants of a valid email");
            login = new LoginPage(page);
            dashboard = new DashboardPage(page);
            emailVariants = [credentials.email.toUpperCase(), credentials.email.split("@").map(function (part) {
              return part.charAt(0).toUpperCase() + part.slice(1);
            }).join("@"), credentials.email.toLowerCase()];
            _i2 = 0, _emailVariants = emailVariants;

          case 6:
            if (!(_i2 < _emailVariants.length)) {
              _context19.next = 19;
              break;
            }

            email = _emailVariants[_i2];
            _context19.next = 10;
            return regeneratorRuntime.awrap(login.openApplication());

          case 10:
            _context19.next = 12;
            return regeneratorRuntime.awrap(login.login(email, credentials.password));

          case 12:
            _context19.next = 14;
            return regeneratorRuntime.awrap(dashboard.verifyDashboardLoaded());

          case 14:
            _context19.next = 16;
            return regeneratorRuntime.awrap(dashboard.logout());

          case 16:
            _i2++;
            _context19.next = 6;
            break;

          case 19:
          case "end":
            return _context19.stop();
        }
      }
    });
  });
});