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
    this.urls = urls;
    this.pageTitle = page.getByText("User Management", {
      exact: true
    }).first();
    this.searchInput = page.getByPlaceholder("🔍 Search Users...");
    this.departmentDropdown = page.getByText("Select Department", {
      exact: true
    }).first();
    this.locationDropdown = page.getByText("Select Location", {
      exact: true
    }).first();
    this.userCards = page.locator(".userCard:visible");
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
  }

  _createClass(UserManagementPage, [{
    key: "goto",
    value: function goto() {
      return regeneratorRuntime.async(function goto$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(this.page["goto"](this.urls.userManagement, {
                waitUntil: "domcontentloaded",
                timeout: 30000
              }));

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
    }
  }, {
    key: "waitForUserList",
    value: function waitForUserList() {
      var _this = this;

      var noResults;
      return regeneratorRuntime.async(function waitForUserList$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              noResults = this.page.getByText(/No users found based on request|No records found\./i);
              _context3.next = 3;
              return regeneratorRuntime.awrap(expect.poll(function _callee() {
                var userCount, emptyState;
                return regeneratorRuntime.async(function _callee$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return regeneratorRuntime.awrap(_this.userCards.count());

                      case 2:
                        userCount = _context2.sent;
                        _context2.next = 5;
                        return regeneratorRuntime.awrap(noResults.isVisible()["catch"](function () {
                          return false;
                        }));

                      case 5:
                        emptyState = _context2.sent;
                        return _context2.abrupt("return", userCount > 0 || emptyState);

                      case 7:
                      case "end":
                        return _context2.stop();
                    }
                  }
                });
              }, {
                timeout: 10000,
                intervals: [100, 250, 500]
              }).toBe(true));

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "searchUser",
    value: function searchUser(value) {
      return regeneratorRuntime.async(function searchUser$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(this.searchInput.waitFor({
                state: "visible"
              }));

            case 2:
              _context4.next = 4;
              return regeneratorRuntime.awrap(this.searchInput.fill(value));

            case 4:
              _context4.next = 6;
              return regeneratorRuntime.awrap(this.waitForUserList());

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "clearSearch",
    value: function clearSearch() {
      return regeneratorRuntime.async(function clearSearch$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(this.searchInput.fill(""));

            case 2:
              _context5.next = 4;
              return regeneratorRuntime.awrap(this.waitForUserList());

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getUserCount",
    value: function getUserCount() {
      return regeneratorRuntime.async(function getUserCount$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(this.waitForUserList());

            case 2:
              _context6.next = 4;
              return regeneratorRuntime.awrap(this.userCards.count());

            case 4:
              return _context6.abrupt("return", _context6.sent);

            case 5:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getUserCard",
    value: function getUserCard(userName) {
      var name = this.page.getByRole("heading", {
        name: userName,
        exact: true
      });
      return name.locator("xpath=ancestor::*[.//button][1]");
    }
  }, {
    key: "userExists",
    value: function userExists(userName) {
      return regeneratorRuntime.async(function userExists$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(this.getUserCard(userName).count());

            case 2:
              _context7.t0 = _context7.sent;
              return _context7.abrupt("return", _context7.t0 > 0);

            case 4:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getUserDetails",
    value: function getUserDetails(userName) {
      var card;
      return regeneratorRuntime.async(function getUserDetails$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              card = this.getUserCard(userName);
              _context8.next = 3;
              return regeneratorRuntime.awrap(card.waitFor({
                state: "visible"
              }));

            case 3:
              _context8.next = 5;
              return regeneratorRuntime.awrap(card.innerText());

            case 5:
              return _context8.abrupt("return", _context8.sent);

            case 6:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "clickCardAction",
    value: function clickCardAction(userName, action) {
      var card;
      return regeneratorRuntime.async(function clickCardAction$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              card = this.getUserCard(userName);
              _context9.next = 3;
              return regeneratorRuntime.awrap(card.waitFor({
                state: "visible"
              }));

            case 3:
              _context9.next = 5;
              return regeneratorRuntime.awrap(card.getByRole("button", {
                name: new RegExp(action, "i")
              }).click());

            case 5:
            case "end":
              return _context9.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "viewUser",
    value: function viewUser(userName) {
      return regeneratorRuntime.async(function viewUser$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return regeneratorRuntime.awrap(this.clickCardAction(userName, "View"));

            case 2:
            case "end":
              return _context10.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "editUser",
    value: function editUser(userName) {
      return regeneratorRuntime.async(function editUser$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return regeneratorRuntime.awrap(this.clickCardAction(userName, "Edit"));

            case 2:
            case "end":
              return _context11.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "viewAssets",
    value: function viewAssets(userName) {
      return regeneratorRuntime.async(function viewAssets$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return regeneratorRuntime.awrap(this.clickCardAction(userName, "Assets"));

            case 2:
            case "end":
              return _context12.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "deleteUser",
    value: function deleteUser(userName) {
      return regeneratorRuntime.async(function deleteUser$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return regeneratorRuntime.awrap(this.clickCardAction(userName, "Delete"));

            case 2:
            case "end":
              return _context13.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "hasCardAction",
    value: function hasCardAction(userName, action) {
      var card;
      return regeneratorRuntime.async(function hasCardAction$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              card = this.getUserCard(userName);
              _context14.next = 3;
              return regeneratorRuntime.awrap(card.waitFor({
                state: "visible"
              }));

            case 3:
              _context14.next = 5;
              return regeneratorRuntime.awrap(card.getByRole("button", {
                name: new RegExp(action, "i")
              }).count());

            case 5:
              _context14.t0 = _context14.sent;
              return _context14.abrupt("return", _context14.t0 > 0);

            case 7:
            case "end":
              return _context14.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "hasViewButton",
    value: function hasViewButton(userName) {
      return regeneratorRuntime.async(function hasViewButton$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _context15.next = 2;
              return regeneratorRuntime.awrap(this.hasCardAction(userName, "View"));

            case 2:
              return _context15.abrupt("return", _context15.sent);

            case 3:
            case "end":
              return _context15.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "hasEditButton",
    value: function hasEditButton(userName) {
      return regeneratorRuntime.async(function hasEditButton$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _context16.next = 2;
              return regeneratorRuntime.awrap(this.hasCardAction(userName, "Edit"));

            case 2:
              return _context16.abrupt("return", _context16.sent);

            case 3:
            case "end":
              return _context16.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "hasAssetsButton",
    value: function hasAssetsButton(userName) {
      return regeneratorRuntime.async(function hasAssetsButton$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              _context17.next = 2;
              return regeneratorRuntime.awrap(this.hasCardAction(userName, "Assets"));

            case 2:
              return _context17.abrupt("return", _context17.sent);

            case 3:
            case "end":
              return _context17.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "hasDeleteButton",
    value: function hasDeleteButton(userName) {
      return regeneratorRuntime.async(function hasDeleteButton$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              _context18.next = 2;
              return regeneratorRuntime.awrap(this.hasCardAction(userName, "Delete"));

            case 2:
              return _context18.abrupt("return", _context18.sent);

            case 3:
            case "end":
              return _context18.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "selectFilter",
    value: function selectFilter(dropdown, value) {
      return regeneratorRuntime.async(function selectFilter$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              _context19.next = 2;
              return regeneratorRuntime.awrap(dropdown.click());

            case 2:
              _context19.next = 4;
              return regeneratorRuntime.awrap(this.page.getByText(value, {
                exact: true
              }).last().click());

            case 4:
              _context19.next = 6;
              return regeneratorRuntime.awrap(this.waitForUserList());

            case 6:
            case "end":
              return _context19.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "selectDepartment",
    value: function selectDepartment(department) {
      return regeneratorRuntime.async(function selectDepartment$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              _context20.next = 2;
              return regeneratorRuntime.awrap(this.selectFilter(this.departmentDropdown, department));

            case 2:
            case "end":
              return _context20.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "selectLocation",
    value: function selectLocation(location) {
      return regeneratorRuntime.async(function selectLocation$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              _context21.next = 2;
              return regeneratorRuntime.awrap(this.selectFilter(this.locationDropdown, location));

            case 2:
            case "end":
              return _context21.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "clearLocation",
    value: function clearLocation() {
      return regeneratorRuntime.async(function clearLocation$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              _context22.next = 2;
              return regeneratorRuntime.awrap(this.page.reload({
                waitUntil: "domcontentloaded",
                timeout: 30000
              }));

            case 2:
              _context22.next = 4;
              return regeneratorRuntime.awrap(expect(this.page).toHaveURL(/\/users(?:\/)?$/, {
                timeout: 30000
              }));

            case 4:
              _context22.next = 6;
              return regeneratorRuntime.awrap(expect(this.pageTitle).toBeVisible({
                timeout: 30000
              }));

            case 6:
              _context22.next = 8;
              return regeneratorRuntime.awrap(expect(this.searchInput).toBeVisible({
                timeout: 30000
              }));

            case 8:
              _context22.next = 10;
              return regeneratorRuntime.awrap(this.waitForUserList());

            case 10:
            case "end":
              return _context22.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "resetSearch",
    value: function resetSearch() {
      return regeneratorRuntime.async(function resetSearch$(_context23) {
        while (1) {
          switch (_context23.prev = _context23.next) {
            case 0:
              _context23.next = 2;
              return regeneratorRuntime.awrap(this.clearSearch());

            case 2:
            case "end":
              return _context23.stop();
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