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

    this.page = page;
    this.dashboardMenu = page.getByRole("link", {
      name: "Dashboard"
    });
    this.assetsTitle = page.getByRole("heading", {
      name: "Your Assets"
    });
    this.requestTitle = page.getByRole("heading", {
      name: "Your Requests"
    });
    this.notificationTitle = page.getByRole("heading", {
      name: "Notifications"
    });
    this.assetsCount = page.locator("xpath=//div[@class='assetName']");
    this.viewAssets = page.locator("xpath=//div[contains(text(),'View your Assets')]");
    this.requestsCount = page.locator("xpath=//div[@class='requestItem']");
    this.viewRequests = page.locator("xpath=//div[contains(text(),'View your Requests')]");
    this.notifications = page.locator("xpath=//div[3]//div[1]//div[2]");
    this.userName = page.getByText("Super Admin", {
      exact: true
    });
    this.employeeId = page.getByText("EMP0001", {
      exact: true
    });
    this.profileMenu = page.getByRole("button").filter({
      has: page.locator("img[alt='profile']")
    });
    this.logoutButton = page.locator("button.logoutButton.px-3.w-100.text-start");
    this.logoutConfirmationModal = page.locator("div.alertModalBody.modal-body");
    this.logoutDialog = page.getByRole("dialog");
    this.logoutConfirmation = this.logoutConfirmationModal.getByText(/are you sure you want to logout/i);
    this.confirmLogoutButton = this.logoutDialog.getByRole("button", {
      name: "Confirm"
    });
    this.cancelLogoutButton = this.logoutDialog.getByRole("button", {
      name: "Cancel"
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
              return regeneratorRuntime.awrap(expect(this.assetsTitle).toBeVisible({
                timeout: 10000
              }));

            case 2:
              _context.next = 4;
              return regeneratorRuntime.awrap(expect(this.requestTitle).toBeVisible({
                timeout: 10000
              }));

            case 4:
              _context.next = 6;
              return regeneratorRuntime.awrap(expect(this.notificationTitle).toBeVisible({
                timeout: 10000
              }));

            case 6:
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
    key: "verifyRequestCount",
    value: function verifyRequestCount() {
      return regeneratorRuntime.async(function verifyRequestCount$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(expect(this.requestsCount).toBeVisible({
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
    key: "verifyViewAssetLink",
    value: function verifyViewAssetLink() {
      return regeneratorRuntime.async(function verifyViewAssetLink$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(expect(this.viewAssets).toBeVisible({
                timeout: 5000
              }));

            case 2:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "verifyViewRequestLink",
    value: function verifyViewRequestLink() {
      return regeneratorRuntime.async(function verifyViewRequestLink$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(expect(this.viewRequests).toBeVisible({
                timeout: 5000
              }));

            case 2:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "verifyNotifications",
    value: function verifyNotifications() {
      return regeneratorRuntime.async(function verifyNotifications$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return regeneratorRuntime.awrap(expect(this.notifications).toBeVisible({
                timeout: 5000
              }));

            case 2:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "clickViewAssets",
    value: function clickViewAssets() {
      return regeneratorRuntime.async(function clickViewAssets$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return regeneratorRuntime.awrap(expect(this.viewAssets).toBeVisible({
                timeout: 5000
              }));

            case 2:
              _context9.next = 4;
              return regeneratorRuntime.awrap(this.viewAssets.click());

            case 4:
              _context9.next = 6;
              return regeneratorRuntime.awrap(expect(this.page).toHaveURL(/\/profile/, {
                timeout: 10000
              }));

            case 6:
            case "end":
              return _context9.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "openViewRequests",
    value: function openViewRequests() {
      return regeneratorRuntime.async(function openViewRequests$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return regeneratorRuntime.awrap(expect(this.viewRequests).toBeVisible({
                timeout: 5000
              }));

            case 2:
              _context10.next = 4;
              return regeneratorRuntime.awrap(this.viewRequests.click());

            case 4:
              _context10.next = 6;
              return regeneratorRuntime.awrap(expect(this.page).toHaveURL(/\/support(?:\/)?$/, {
                timeout: 10000
              }));

            case 6:
              return _context10.abrupt("return", this.page);

            case 7:
            case "end":
              return _context10.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "clickViewRequests",
    value: function clickViewRequests() {
      return regeneratorRuntime.async(function clickViewRequests$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return regeneratorRuntime.awrap(this.openViewRequests());

            case 2:
            case "end":
              return _context11.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "openLogoutConfirmation",
    value: function openLogoutConfirmation() {
      return regeneratorRuntime.async(function openLogoutConfirmation$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return regeneratorRuntime.awrap(expect(this.profileMenu).toBeVisible({
                timeout: 10000
              }));

            case 2:
              _context12.next = 4;
              return regeneratorRuntime.awrap(this.profileMenu.click());

            case 4:
              _context12.next = 6;
              return regeneratorRuntime.awrap(expect(this.logoutButton).toBeVisible({
                timeout: 5000
              }));

            case 6:
              _context12.next = 8;
              return regeneratorRuntime.awrap(this.logoutButton.click());

            case 8:
              _context12.next = 10;
              return regeneratorRuntime.awrap(expect(this.logoutConfirmationModal).toBeVisible({
                timeout: 5000
              }));

            case 10:
              _context12.next = 12;
              return regeneratorRuntime.awrap(expect(this.logoutConfirmation).toBeVisible({
                timeout: 5000
              }));

            case 12:
            case "end":
              return _context12.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "cancelLogout",
    value: function cancelLogout() {
      return regeneratorRuntime.async(function cancelLogout$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return regeneratorRuntime.awrap(this.openLogoutConfirmation());

            case 2:
              _context13.next = 4;
              return regeneratorRuntime.awrap(this.cancelLogoutButton.click());

            case 4:
              _context13.next = 6;
              return regeneratorRuntime.awrap(expect(this.logoutConfirmationModal).toBeHidden());

            case 6:
              _context13.next = 8;
              return regeneratorRuntime.awrap(this.verifyDashboardLoaded());

            case 8:
            case "end":
              return _context13.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "logout",
    value: function logout() {
      return regeneratorRuntime.async(function logout$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              _context14.next = 2;
              return regeneratorRuntime.awrap(this.openLogoutConfirmation());

            case 2:
              _context14.next = 4;
              return regeneratorRuntime.awrap(this.confirmLogoutButton.click());

            case 4:
              _context14.next = 6;
              return regeneratorRuntime.awrap(expect(this.page).toHaveURL(/\/login(?:\/)?$/, {
                timeout: 10000
              }));

            case 6:
              _context14.next = 8;
              return regeneratorRuntime.awrap(this.clearClientSession());

            case 8:
            case "end":
              return _context14.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "clearClientSession",
    value: function clearClientSession() {
      return regeneratorRuntime.async(function clearClientSession$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _context15.next = 2;
              return regeneratorRuntime.awrap(this.page.evaluate(function () {
                localStorage.clear();
                sessionStorage.clear();
              }));

            case 2:
              _context15.next = 4;
              return regeneratorRuntime.awrap(this.page.context().clearCookies());

            case 4:
            case "end":
              return _context15.stop();
          }
        }
      }, null, this);
    }
  }]);

  return DashboardPage;
}();

module.exports = DashboardPage;