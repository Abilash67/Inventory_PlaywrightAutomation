"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require("@playwright/test"),
    expect = _require.expect;

var DashboardPage =
/*#__PURE__*/
function () {
  function DashboardPage(page) {
    _classCallCheck(this, DashboardPage);

    this.page = page; // Navigation

    this.dashboardMenu = page.getByRole("link", {
      name: "Dashboard"
    }); // Dashboard Cards

    this.assetsTitle = page.getByRole("heading", {
      name: "Your Assets"
    });
    this.requestTitle = page.getByRole("heading", {
      name: "Your Requests"
    });
    this.notificationTitle = page.getByRole("heading", {
      name: "Notifications"
    }); // Asset Count

    this.assetsCount = page.getByText("5", {
      exact: true
    }); // View Assets

    this.viewAssets = page.getByText("View your Assets", {
      exact: true
    }); // User Details

    this.userName = page.getByText("Super Admin", {
      exact: true
    });
    this.employeeId = page.getByText("EMP0001", {
      exact: true
    }); // Profile Menu

    this.profileMenu = page.getByRole("button").filter({
      has: page.locator("img[alt='profile']")
    }); // Logout

    this.logoutButton = page.getByText("Logout", {
      exact: true
    }); // Logout Confirmation

    this.logoutConfirmation = page.getByText("Are you sure you want to logout?", {
      exact: true
    });
    this.confirmLogoutButton = page.getByRole("button", {
      name: "Confirm"
    });
  }

  _createClass(DashboardPage, [{
    key: "verifyDashboardLoaded",
    value: function verifyDashboardLoaded() {
      return regeneratorRuntime.async(function verifyDashboardLoaded$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(expect(this.dashboardMenu).toBeVisible());

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "verifyUser",
    value: function verifyUser() {
      return regeneratorRuntime.async(function verifyUser$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(expect(this.userName).toBeVisible());

            case 2:
              _context2.next = 4;
              return regeneratorRuntime.awrap(expect(this.employeeId).toBeVisible());

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "verifyCards",
    value: function verifyCards() {
      return regeneratorRuntime.async(function verifyCards$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(expect(this.assetsTitle).toBeVisible());

            case 2:
              _context3.next = 4;
              return regeneratorRuntime.awrap(expect(this.requestTitle).toBeVisible());

            case 4:
              _context3.next = 6;
              return regeneratorRuntime.awrap(expect(this.notificationTitle).toBeVisible());

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "verifyAssetCount",
    value: function verifyAssetCount() {
      return regeneratorRuntime.async(function verifyAssetCount$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(expect(this.assetsCount).toBeVisible({
                timeout: 5000
              }));

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "verifyViewAssetLink",
    value: function verifyViewAssetLink() {
      return regeneratorRuntime.async(function verifyViewAssetLink$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(expect(this.viewAssets).toBeVisible({
                timeout: 5000
              }));

            case 2:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "clickViewAssets",
    value: function clickViewAssets() {
      return regeneratorRuntime.async(function clickViewAssets$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(expect(this.viewAssets).toBeVisible({
                timeout: 5000
              }));

            case 2:
              _context6.next = 4;
              return regeneratorRuntime.awrap(this.viewAssets.click());

            case 4:
              _context6.next = 6;
              return regeneratorRuntime.awrap(expect(this.page).toHaveURL(/\/profile/, {
                timeout: 10000
              }));

            case 6:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "logout",
    value: function logout() {
      return regeneratorRuntime.async(function logout$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(expect(this.profileMenu).toBeVisible({
                timeout: 10000
              }));

            case 2:
              _context7.next = 4;
              return regeneratorRuntime.awrap(this.profileMenu.click());

            case 4:
              _context7.next = 6;
              return regeneratorRuntime.awrap(expect(this.logoutButton).toBeVisible({
                timeout: 5000
              }));

            case 6:
              _context7.next = 8;
              return regeneratorRuntime.awrap(this.logoutButton.click());

            case 8:
              _context7.next = 10;
              return regeneratorRuntime.awrap(expect(this.logoutConfirmation).toBeVisible({
                timeout: 5000
              }));

            case 10:
              _context7.next = 12;
              return regeneratorRuntime.awrap(this.confirmLogoutButton.click());

            case 12:
              _context7.next = 14;
              return regeneratorRuntime.awrap(expect(this.page).toHaveURL(/\/login/, {
                timeout: 10000
              }));

            case 14:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this);
    }
  }]);

  return DashboardPage;
}();

module.exports = DashboardPage;