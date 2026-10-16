"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require("@playwright/test"),
    expect = _require.expect;

var urls = require("../../constants/urls");

var UserManagementPage =
/*#__PURE__*/
function () {
  function UserManagementPage(page) {
    _classCallCheck(this, UserManagementPage);

    this.page = page;
    this.urls = urls; // ==========================================
    // Page elements
    // ==========================================

    this.pageTitle = page.getByText("User Management", {
      exact: true
    }).first();
    this.searchInput = page.getByPlaceholder("Search Users..."); // Department filter

    this.departmentDropdown = page.locator(".multiSelectToggle.form-select").filter({
      hasText: "Select Department"
    }).first(); // Location filter

    this.locationDropdown = page.locator(".multiSelectToggle.form-select").filter({
      hasText: "Select Location"
    }).first(); // User cards

    this.userCards = page.locator(".userCard:visible"); // Card action buttons

    this.viewButtons = page.getByRole("button", {
      name: /View/i
    });
    this.editButtons = page.getByRole("button", {
      name: /Edit/i
    });
    this.assetsButtons = page.getByRole("button", {
      name: /Assets/i
    });
    this.deleteButtons = page.getByRole("button", {
      name: /Delete/i
    });
  } // ==========================================
  // Open User Management
  // ==========================================


  _createClass(UserManagementPage, [{
    key: "goto",
    value: function goto() {
      return regeneratorRuntime.async(function goto$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(this.navigateWithRetry(this.urls.userManagement));

            case 2:
              _context.next = 4;
              return regeneratorRuntime.awrap(expect(this.page).toHaveURL(/\/users(?:\/)?$/, {
                timeout: 30000
              }));

            case 4:
              _context.next = 6;
              return regeneratorRuntime.awrap(expect(this.searchInput).toBeVisible({
                timeout: 30000
              }));

            case 6:
              _context.next = 8;
              return regeneratorRuntime.awrap(this.waitForUserList());

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    } // ==========================================
    // Navigate with one controlled retry
    // ==========================================

  }, {
    key: "navigateWithRetry",
    value: function navigateWithRetry(url) {
      return regeneratorRuntime.async(function navigateWithRetry$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return regeneratorRuntime.awrap(this.page["goto"](url, {
                waitUntil: "domcontentloaded",
                timeout: 30000
              }));

            case 3:
              _context2.next = 11;
              break;

            case 5:
              _context2.prev = 5;
              _context2.t0 = _context2["catch"](0);
              _context2.next = 9;
              return regeneratorRuntime.awrap(this.page.waitForTimeout(1000));

            case 9:
              _context2.next = 11;
              return regeneratorRuntime.awrap(this.page["goto"](url, {
                waitUntil: "domcontentloaded",
                timeout: 30000
              }));

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this, [[0, 5]]);
    } // ==========================================
    // Wait for user list
    // ==========================================

  }, {
    key: "waitForUserList",
    value: function waitForUserList() {
      var _this = this;

      var noResults, previousCount;
      return regeneratorRuntime.async(function waitForUserList$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              noResults = this.page.getByText(/No users found based on request|No records found\./i);
              previousCount = null;
              _context4.next = 4;
              return regeneratorRuntime.awrap(expect.poll(function _callee() {
                var emptyState, userCount, stable;
                return regeneratorRuntime.async(function _callee$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return regeneratorRuntime.awrap(noResults.isVisible()["catch"](function () {
                          return false;
                        }));

                      case 2:
                        emptyState = _context3.sent;

                        if (!emptyState) {
                          _context3.next = 5;
                          break;
                        }

                        return _context3.abrupt("return", "empty");

                      case 5:
                        _context3.next = 7;
                        return regeneratorRuntime.awrap(_this.userCards.count());

                      case 7:
                        userCount = _context3.sent;
                        stable = userCount === previousCount;
                        previousCount = userCount;
                        return _context3.abrupt("return", stable ? "stable:".concat(userCount) : "changing:".concat(userCount));

                      case 11:
                      case "end":
                        return _context3.stop();
                    }
                  }
                });
              }, {
                timeout: 10000,
                intervals: [300, 500, 500, 1000]
              }).toMatch(/^(empty|stable:\d+)$/));

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    } // ==========================================
    // Search user
    // ==========================================

  }, {
    key: "searchUser",
    value: function searchUser(value) {
      return regeneratorRuntime.async(function searchUser$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(this.searchInput.waitFor({
                state: "visible",
                timeout: 10000
              }));

            case 2:
              _context5.next = 4;
              return regeneratorRuntime.awrap(this.searchInput.fill(value));

            case 4:
              _context5.next = 6;
              return regeneratorRuntime.awrap(this.waitForUserList());

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    } // ==========================================
    // Clear search
    // ==========================================

  }, {
    key: "clearSearch",
    value: function clearSearch() {
      return regeneratorRuntime.async(function clearSearch$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(this.searchInput.fill(""));

            case 2:
              _context6.next = 4;
              return regeneratorRuntime.awrap(this.waitForUserList());

            case 4:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    } // ==========================================
    // Get user count
    // ==========================================

  }, {
    key: "getUserCount",
    value: function getUserCount() {
      return regeneratorRuntime.async(function getUserCount$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(this.userCards.count());

            case 2:
              return _context7.abrupt("return", _context7.sent);

            case 3:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this);
    } // ==========================================
    // Get user card
    // ==========================================

  }, {
    key: "getUserCard",
    value: function getUserCard(userName) {
      var name = this.page.getByRole("heading", {
        name: userName,
        exact: true
      });
      return name.locator("xpath=ancestor::*[.//button][1]");
    } // ==========================================
    // Check whether user exists
    // ==========================================

  }, {
    key: "userExists",
    value: function userExists(userName) {
      return regeneratorRuntime.async(function userExists$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return regeneratorRuntime.awrap(this.getUserCard(userName).count());

            case 2:
              _context8.t0 = _context8.sent;
              return _context8.abrupt("return", _context8.t0 > 0);

            case 4:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this);
    } // ==========================================
    // Get user details
    // ==========================================

  }, {
    key: "getUserDetails",
    value: function getUserDetails(userName) {
      var card;
      return regeneratorRuntime.async(function getUserDetails$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              card = this.getUserCard(userName);
              _context9.next = 3;
              return regeneratorRuntime.awrap(card.waitFor({
                state: "visible",
                timeout: 10000
              }));

            case 3:
              _context9.next = 5;
              return regeneratorRuntime.awrap(card.innerText());

            case 5:
              return _context9.abrupt("return", _context9.sent);

            case 6:
            case "end":
              return _context9.stop();
          }
        }
      }, null, this);
    } // ==========================================
    // Click card action
    // ==========================================

  }, {
    key: "clickCardAction",
    value: function clickCardAction(userName, action) {
      var card;
      return regeneratorRuntime.async(function clickCardAction$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              card = this.getUserCard(userName);
              _context10.next = 3;
              return regeneratorRuntime.awrap(card.waitFor({
                state: "visible",
                timeout: 10000
              }));

            case 3:
              _context10.next = 5;
              return regeneratorRuntime.awrap(card.getByRole("button", {
                name: new RegExp(action, "i")
              }).click());

            case 5:
            case "end":
              return _context10.stop();
          }
        }
      }, null, this);
    } // ==========================================
    // View user
    // ==========================================

  }, {
    key: "viewUser",
    value: function viewUser(userName) {
      return regeneratorRuntime.async(function viewUser$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return regeneratorRuntime.awrap(this.clickCardAction(userName, "View"));

            case 2:
            case "end":
              return _context11.stop();
          }
        }
      }, null, this);
    } // ==========================================
    // Edit user
    // ==========================================

  }, {
    key: "editUser",
    value: function editUser(userName) {
      return regeneratorRuntime.async(function editUser$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return regeneratorRuntime.awrap(this.clickCardAction(userName, "Edit"));

            case 2:
            case "end":
              return _context12.stop();
          }
        }
      }, null, this);
    } // ==========================================
    // View user assets
    // ==========================================

  }, {
    key: "viewAssets",
    value: function viewAssets(userName) {
      return regeneratorRuntime.async(function viewAssets$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return regeneratorRuntime.awrap(this.clickCardAction(userName, "Assets"));

            case 2:
            case "end":
              return _context13.stop();
          }
        }
      }, null, this);
    } // ==========================================
    // Delete user
    // ==========================================

  }, {
    key: "deleteUser",
    value: function deleteUser(userName) {
      return regeneratorRuntime.async(function deleteUser$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              _context14.next = 2;
              return regeneratorRuntime.awrap(this.clickCardAction(userName, "Delete"));

            case 2:
            case "end":
              return _context14.stop();
          }
        }
      }, null, this);
    } // ==========================================
    // Check card action
    // ==========================================

  }, {
    key: "hasCardAction",
    value: function hasCardAction(userName, action) {
      var card;
      return regeneratorRuntime.async(function hasCardAction$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              card = this.getUserCard(userName);
              _context15.next = 3;
              return regeneratorRuntime.awrap(card.waitFor({
                state: "visible",
                timeout: 10000
              }));

            case 3:
              _context15.next = 5;
              return regeneratorRuntime.awrap(card.getByRole("button", {
                name: new RegExp(action, "i")
              }).count());

            case 5:
              _context15.t0 = _context15.sent;
              return _context15.abrupt("return", _context15.t0 > 0);

            case 7:
            case "end":
              return _context15.stop();
          }
        }
      }, null, this);
    } // ==========================================
    // Check View button
    // ==========================================

  }, {
    key: "hasViewButton",
    value: function hasViewButton(userName) {
      return regeneratorRuntime.async(function hasViewButton$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _context16.next = 2;
              return regeneratorRuntime.awrap(this.hasCardAction(userName, "View"));

            case 2:
              return _context16.abrupt("return", _context16.sent);

            case 3:
            case "end":
              return _context16.stop();
          }
        }
      }, null, this);
    } // ==========================================
    // Check Edit button
    // ==========================================

  }, {
    key: "hasEditButton",
    value: function hasEditButton(userName) {
      return regeneratorRuntime.async(function hasEditButton$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              _context17.next = 2;
              return regeneratorRuntime.awrap(this.hasCardAction(userName, "Edit"));

            case 2:
              return _context17.abrupt("return", _context17.sent);

            case 3:
            case "end":
              return _context17.stop();
          }
        }
      }, null, this);
    } // ==========================================
    // Check Assets button
    // ==========================================

  }, {
    key: "hasAssetsButton",
    value: function hasAssetsButton(userName) {
      return regeneratorRuntime.async(function hasAssetsButton$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              _context18.next = 2;
              return regeneratorRuntime.awrap(this.hasCardAction(userName, "Assets"));

            case 2:
              return _context18.abrupt("return", _context18.sent);

            case 3:
            case "end":
              return _context18.stop();
          }
        }
      }, null, this);
    } // ==========================================
    // Check Delete button
    // ==========================================

  }, {
    key: "hasDeleteButton",
    value: function hasDeleteButton(userName) {
      return regeneratorRuntime.async(function hasDeleteButton$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              _context19.next = 2;
              return regeneratorRuntime.awrap(this.hasCardAction(userName, "Delete"));

            case 2:
              return _context19.abrupt("return", _context19.sent);

            case 3:
            case "end":
              return _context19.stop();
          }
        }
      }, null, this);
    } // ==========================================
    // Select filter
    // ==========================================

  }, {
    key: "selectFilter",
    value: function selectFilter(dropdown, value) {
      var option;
      return regeneratorRuntime.async(function selectFilter$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              _context20.next = 2;
              return regeneratorRuntime.awrap(expect(dropdown).toBeVisible({
                timeout: 10000
              }));

            case 2:
              _context20.next = 4;
              return regeneratorRuntime.awrap(dropdown.click({
                force: true,
                timeout: 10000
              }));

            case 4:
              option = this.page.getByText(value, {
                exact: true
              }).last();
              _context20.next = 7;
              return regeneratorRuntime.awrap(expect(option).toBeVisible({
                timeout: 10000
              }));

            case 7:
              _context20.next = 9;
              return regeneratorRuntime.awrap(option.click({
                timeout: 10000
              }));

            case 9:
              _context20.next = 11;
              return regeneratorRuntime.awrap(this.waitForUserList());

            case 11:
            case "end":
              return _context20.stop();
          }
        }
      }, null, this);
    } // ==========================================
    // Select department
    // ==========================================

  }, {
    key: "selectDepartment",
    value: function selectDepartment(department) {
      return regeneratorRuntime.async(function selectDepartment$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              _context21.next = 2;
              return regeneratorRuntime.awrap(this.selectFilter(this.departmentDropdown, department));

            case 2:
            case "end":
              return _context21.stop();
          }
        }
      }, null, this);
    } // ==========================================
    // Select location
    // ==========================================

  }, {
    key: "selectLocation",
    value: function selectLocation(location) {
      return regeneratorRuntime.async(function selectLocation$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              _context22.next = 2;
              return regeneratorRuntime.awrap(this.selectFilter(this.locationDropdown, location));

            case 2:
            case "end":
              return _context22.stop();
          }
        }
      }, null, this);
    } // ==========================================
    // Clear location filter
    // ==========================================

  }, {
    key: "clearLocation",
    value: function clearLocation() {
      return regeneratorRuntime.async(function clearLocation$(_context23) {
        while (1) {
          switch (_context23.prev = _context23.next) {
            case 0:
              _context23.next = 2;
              return regeneratorRuntime.awrap(this.page.reload({
                waitUntil: "domcontentloaded",
                timeout: 30000
              }));

            case 2:
              _context23.next = 4;
              return regeneratorRuntime.awrap(expect(this.page).toHaveURL(/\/users(?:\/)?$/, {
                timeout: 30000
              }));

            case 4:
              _context23.next = 6;
              return regeneratorRuntime.awrap(expect(this.pageTitle).toBeVisible({
                timeout: 30000
              }));

            case 6:
              _context23.next = 8;
              return regeneratorRuntime.awrap(expect(this.searchInput).toBeVisible({
                timeout: 30000
              }));

            case 8:
              _context23.next = 10;
              return regeneratorRuntime.awrap(this.waitForUserList());

            case 10:
            case "end":
              return _context23.stop();
          }
        }
      }, null, this);
    } // ==========================================
    // Reset search
    // ==========================================

  }, {
    key: "resetSearch",
    value: function resetSearch() {
      return regeneratorRuntime.async(function resetSearch$(_context24) {
        while (1) {
          switch (_context24.prev = _context24.next) {
            case 0:
              _context24.next = 2;
              return regeneratorRuntime.awrap(this.clearSearch());

            case 2:
            case "end":
              return _context24.stop();
          }
        }
      }, null, this);
    }
  }]);

  return UserManagementPage;
}();

module.exports = {
  UserManagementPage: UserManagementPage
};