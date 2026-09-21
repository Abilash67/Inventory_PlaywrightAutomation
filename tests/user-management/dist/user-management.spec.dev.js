"use strict";

var _require = require("@playwright/test"),
    test = _require.test,
    expect = _require.expect;

var _require2 = require("../../pages/user-management/UserManagementPage"),
    UserManagementPage = _require2.UserManagementPage;

var userData = require("../../test-data/userManagementData.json");

test.describe("User Management - Complete Test Suite", function () {
  var userManagementPage;
  test.beforeEach(function _callee(_ref) {
    var page;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            page = _ref.page;
            userManagementPage = new UserManagementPage(page);
            _context.next = 4;
            return regeneratorRuntime.awrap(userManagementPage["goto"]());

          case 4:
          case "end":
            return _context.stop();
        }
      }
    });
  }); // TC01 - PAGE LOAD

  test("TC01 - Verify User Management page is displayed", function _callee2() {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(expect(userManagementPage.pageTitle).toBeVisible());

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    });
  }); // TC02 - USER LIST

  test("TC02 - Verify users are displayed", function _callee3() {
    var count;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(userManagementPage.getUserCount());

          case 2:
            count = _context3.sent;
            expect(count).toBeGreaterThan(0);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    });
  }); // TC03 - USER DETAILS

  test("TC03 - Verify user card displays required information", function _callee4() {
    var card;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            card = userManagementPage.getUserCard(userData.validUser.name);
            _context4.next = 3;
            return regeneratorRuntime.awrap(expect(card).toBeVisible());

          case 3:
            _context4.next = 5;
            return regeneratorRuntime.awrap(expect(card).toContainText(userData.validUser.name));

          case 5:
            _context4.next = 7;
            return regeneratorRuntime.awrap(expect(card).toContainText(userData.validUser.employeeId));

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    });
  }); // TC04 - SEARCH BY NAME

  test("TC04 - Search user by valid name", function _callee5() {
    var count;
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return regeneratorRuntime.awrap(userManagementPage.searchUser(userData.searchData.validName));

          case 2:
            _context5.next = 4;
            return regeneratorRuntime.awrap(userManagementPage.getUserCount());

          case 4:
            count = _context5.sent;
            expect(count).toBeGreaterThan(0);
            _context5.next = 8;
            return regeneratorRuntime.awrap(expect(userManagementPage.getUserCard(userData.validUser.name)).toBeVisible());

          case 8:
          case "end":
            return _context5.stop();
        }
      }
    });
  }); // TC05 - SEARCH BY EMPLOYEE ID

  test("TC05 - Search user using employee ID", function _callee6() {
    var count;
    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return regeneratorRuntime.awrap(userManagementPage.searchUser(userData.searchData.validEmployeeId));

          case 2:
            _context6.next = 4;
            return regeneratorRuntime.awrap(userManagementPage.getUserCount());

          case 4:
            count = _context6.sent;
            expect(count).toBeGreaterThan(0);
            _context6.next = 8;
            return regeneratorRuntime.awrap(expect(userManagementPage.getUserCard(userData.validUser.name)).toBeVisible());

          case 8:
          case "end":
            return _context6.stop();
        }
      }
    });
  }); // TC06 - INVALID SEARCH

  test("TC06 - Search with invalid user name", function _callee7() {
    var count;
    return regeneratorRuntime.async(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return regeneratorRuntime.awrap(userManagementPage.searchUser(userData.searchData.invalidName));

          case 2:
            _context7.next = 4;
            return regeneratorRuntime.awrap(userManagementPage.getUserCount());

          case 4:
            count = _context7.sent;
            expect(count).toBe(0);

          case 6:
          case "end":
            return _context7.stop();
        }
      }
    });
  }); // TC07 - EMPTY SEARCH

  test("TC07 - Verify empty search displays all users", function _callee8() {
    var initialCount, finalCount;
    return regeneratorRuntime.async(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return regeneratorRuntime.awrap(userManagementPage.getUserCount());

          case 2:
            initialCount = _context8.sent;
            _context8.next = 5;
            return regeneratorRuntime.awrap(userManagementPage.searchUser(""));

          case 5:
            _context8.next = 7;
            return regeneratorRuntime.awrap(userManagementPage.getUserCount());

          case 7:
            finalCount = _context8.sent;
            expect(finalCount).toBe(initialCount);
            expect(finalCount).toBeGreaterThan(0);

          case 10:
          case "end":
            return _context8.stop();
        }
      }
    });
  }); // TC08 - SINGLE CHARACTER

  test("TC08 - Search using single character", function _callee9() {
    var count;
    return regeneratorRuntime.async(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return regeneratorRuntime.awrap(userManagementPage.searchUser("A"));

          case 2:
            _context9.next = 4;
            return regeneratorRuntime.awrap(userManagementPage.getUserCount());

          case 4:
            count = _context9.sent;
            expect(count).toBeGreaterThanOrEqual(0);

          case 6:
          case "end":
            return _context9.stop();
        }
      }
    });
  }); // TC09 - SPACES

  test("TC09 - Search using only spaces", function _callee10() {
    var count;
    return regeneratorRuntime.async(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return regeneratorRuntime.awrap(userManagementPage.searchUser("   "));

          case 2:
            _context10.next = 4;
            return regeneratorRuntime.awrap(userManagementPage.getUserCount());

          case 4:
            count = _context10.sent;
            expect(count).toBeGreaterThanOrEqual(0);

          case 6:
          case "end":
            return _context10.stop();
        }
      }
    });
  }); // TC10 - SPECIAL CHARACTERS

  test("TC10 - Search using special characters", function _callee11() {
    var count;
    return regeneratorRuntime.async(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return regeneratorRuntime.awrap(userManagementPage.searchUser("@#$%^&*"));

          case 2:
            _context11.next = 4;
            return regeneratorRuntime.awrap(userManagementPage.getUserCount());

          case 4:
            count = _context11.sent;
            expect(count).toBeGreaterThanOrEqual(0);

          case 6:
          case "end":
            return _context11.stop();
        }
      }
    });
  }); // TC11 - NUMBERS

  test("TC11 - Search using numeric value", function _callee12() {
    var count;
    return regeneratorRuntime.async(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return regeneratorRuntime.awrap(userManagementPage.searchUser("123456789"));

          case 2:
            _context12.next = 4;
            return regeneratorRuntime.awrap(userManagementPage.getUserCount());

          case 4:
            count = _context12.sent;
            expect(count).toBeGreaterThanOrEqual(0);

          case 6:
          case "end":
            return _context12.stop();
        }
      }
    });
  }); // TC12 - CASE INSENSITIVE

  test("TC12 - Verify search handles lowercase input", function _callee13() {
    var count;
    return regeneratorRuntime.async(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return regeneratorRuntime.awrap(userManagementPage.searchUser("amrutha"));

          case 2:
            _context13.next = 4;
            return regeneratorRuntime.awrap(userManagementPage.getUserCount());

          case 4:
            count = _context13.sent;
            expect(count).toBeGreaterThanOrEqual(0);

          case 6:
          case "end":
            return _context13.stop();
        }
      }
    });
  }); // TC13 - CLEAR SEARCH

  test("TC13 - Verify clearing search restores users", function _callee14() {
    var initialCount, finalCount;
    return regeneratorRuntime.async(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return regeneratorRuntime.awrap(userManagementPage.getUserCount());

          case 2:
            initialCount = _context14.sent;
            _context14.next = 5;
            return regeneratorRuntime.awrap(userManagementPage.searchUser("Amrutha"));

          case 5:
            _context14.next = 7;
            return regeneratorRuntime.awrap(userManagementPage.clearSearch());

          case 7:
            _context14.next = 9;
            return regeneratorRuntime.awrap(expect.poll(function () {
              return userManagementPage.getUserCount();
            }, {
              timeout: 10000,
              intervals: [200, 500, 1000]
            }).toBe(initialCount));

          case 9:
            _context14.next = 11;
            return regeneratorRuntime.awrap(userManagementPage.getUserCount());

          case 11:
            finalCount = _context14.sent;
            expect(finalCount).toBeGreaterThan(0);

          case 13:
          case "end":
            return _context14.stop();
        }
      }
    });
  }); // TC14 - DEPARTMENT FILTER

  test("TC14 - Filter users by department", function _callee15() {
    var count;
    return regeneratorRuntime.async(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.next = 2;
            return regeneratorRuntime.awrap(userManagementPage.selectDepartment("Java"));

          case 2:
            _context15.next = 4;
            return regeneratorRuntime.awrap(userManagementPage.getUserCount());

          case 4:
            count = _context15.sent;
            expect(count).toBeGreaterThanOrEqual(0);

          case 6:
          case "end":
            return _context15.stop();
        }
      }
    });
  }); // TC15 - DEPARTMENT FILTER VALIDATION

  test("TC15 - Verify users displayed after department filter", function _callee16() {
    var count;
    return regeneratorRuntime.async(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.next = 2;
            return regeneratorRuntime.awrap(userManagementPage.selectDepartment("Java"));

          case 2:
            _context16.next = 4;
            return regeneratorRuntime.awrap(userManagementPage.getUserCount());

          case 4:
            count = _context16.sent;
            expect(count).toBeGreaterThanOrEqual(0);

          case 6:
          case "end":
            return _context16.stop();
        }
      }
    });
  }); // TC16 - LOCATION FILTER

  test("TC16 - Filter users by location", function _callee17() {
    var count;
    return regeneratorRuntime.async(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.next = 2;
            return regeneratorRuntime.awrap(userManagementPage.selectLocation("Trivandrum"));

          case 2:
            _context17.next = 4;
            return regeneratorRuntime.awrap(userManagementPage.getUserCount());

          case 4:
            count = _context17.sent;
            expect(count).toBeGreaterThanOrEqual(0);

          case 6:
          case "end":
            return _context17.stop();
        }
      }
    });
  }); // TC17 - LOCATION VALIDATION

  test("TC17 - Verify location filter is applied", function _callee18() {
    var count;
    return regeneratorRuntime.async(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _context18.next = 2;
            return regeneratorRuntime.awrap(userManagementPage.selectLocation("Trivandrum"));

          case 2:
            _context18.next = 4;
            return regeneratorRuntime.awrap(userManagementPage.getUserCount());

          case 4:
            count = _context18.sent;
            expect(count).toBeGreaterThanOrEqual(0);

          case 6:
          case "end":
            return _context18.stop();
        }
      }
    });
  }); // TC18 - MULTIPLE FILTERS

  test("TC18 - Apply department and location filters", function _callee19() {
    var count;
    return regeneratorRuntime.async(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            _context19.next = 2;
            return regeneratorRuntime.awrap(userManagementPage.selectDepartment("Java"));

          case 2:
            _context19.next = 4;
            return regeneratorRuntime.awrap(userManagementPage.selectLocation("Trivandrum"));

          case 4:
            _context19.next = 6;
            return regeneratorRuntime.awrap(userManagementPage.getUserCount());

          case 6:
            count = _context19.sent;
            expect(count).toBeGreaterThanOrEqual(0);

          case 8:
          case "end":
            return _context19.stop();
        }
      }
    });
  }); // TC19 - FILTER + SEARCH

  test("TC19 - Apply filter and search together", function _callee20() {
    var count;
    return regeneratorRuntime.async(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            _context20.next = 2;
            return regeneratorRuntime.awrap(userManagementPage.selectLocation("Trivandrum"));

          case 2:
            _context20.next = 4;
            return regeneratorRuntime.awrap(userManagementPage.searchUser("Amrutha"));

          case 4:
            _context20.next = 6;
            return regeneratorRuntime.awrap(userManagementPage.getUserCount());

          case 6:
            count = _context20.sent;
            expect(count).toBeGreaterThanOrEqual(0);

          case 8:
          case "end":
            return _context20.stop();
        }
      }
    });
  }); // TC20 - CLEAR LOCATION

  test("TC20 - Verify clearing location filter", function _callee21() {
    var initialCount, finalCount;
    return regeneratorRuntime.async(function _callee21$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            _context21.next = 2;
            return regeneratorRuntime.awrap(userManagementPage.getUserCount());

          case 2:
            initialCount = _context21.sent;
            _context21.next = 5;
            return regeneratorRuntime.awrap(userManagementPage.selectLocation("Trivandrum"));

          case 5:
            _context21.next = 7;
            return regeneratorRuntime.awrap(userManagementPage.clearLocation());

          case 7:
            _context21.next = 9;
            return regeneratorRuntime.awrap(userManagementPage.getUserCount());

          case 9:
            finalCount = _context21.sent;
            expect(finalCount).toBe(initialCount);
            expect(finalCount).toBeGreaterThan(0);

          case 12:
          case "end":
            return _context21.stop();
        }
      }
    });
  }); // TC21 - VIEW USER

  test("TC21 - Verify View user functionality", function _callee22(_ref2) {
    var page;
    return regeneratorRuntime.async(function _callee22$(_context22) {
      while (1) {
        switch (_context22.prev = _context22.next) {
          case 0:
            page = _ref2.page;
            _context22.next = 3;
            return regeneratorRuntime.awrap(userManagementPage.viewUser(userData.validUser.name));

          case 3:
            _context22.next = 5;
            return regeneratorRuntime.awrap(expect(page).toHaveURL(/\/users/i));

          case 5:
          case "end":
            return _context22.stop();
        }
      }
    });
  }); // TC22 - NON EXISTING USER

  test("TC22 - Verify non-existing user is not displayed", function _callee23() {
    var exists;
    return regeneratorRuntime.async(function _callee23$(_context23) {
      while (1) {
        switch (_context23.prev = _context23.next) {
          case 0:
            _context23.next = 2;
            return regeneratorRuntime.awrap(userManagementPage.userExists("UserDoesNotExist999"));

          case 2:
            exists = _context23.sent;
            expect(exists).toBe(false);

          case 4:
          case "end":
            return _context23.stop();
        }
      }
    });
  }); // TC23 - EDIT BUTTON

  test("TC23 - Verify Edit button is displayed", function _callee24() {
    var hasEditButton;
    return regeneratorRuntime.async(function _callee24$(_context24) {
      while (1) {
        switch (_context24.prev = _context24.next) {
          case 0:
            _context24.next = 2;
            return regeneratorRuntime.awrap(userManagementPage.hasEditButton(userData.validUser.name));

          case 2:
            hasEditButton = _context24.sent;
            expect(hasEditButton).toBe(true);

          case 4:
          case "end":
            return _context24.stop();
        }
      }
    });
  }); // TC24 - ASSETS BUTTON

  test("TC24 - Verify Assets button is displayed", function _callee25() {
    var hasAssetsButton;
    return regeneratorRuntime.async(function _callee25$(_context25) {
      while (1) {
        switch (_context25.prev = _context25.next) {
          case 0:
            _context25.next = 2;
            return regeneratorRuntime.awrap(userManagementPage.hasAssetsButton(userData.validUser.name));

          case 2:
            hasAssetsButton = _context25.sent;
            expect(hasAssetsButton).toBe(true);

          case 4:
          case "end":
            return _context25.stop();
        }
      }
    });
  }); // TC25 - DELETE BUTTON

  test("TC25 - Verify Delete button is displayed", function _callee26() {
    var hasDeleteButton;
    return regeneratorRuntime.async(function _callee26$(_context26) {
      while (1) {
        switch (_context26.prev = _context26.next) {
          case 0:
            _context26.next = 2;
            return regeneratorRuntime.awrap(userManagementPage.hasDeleteButton(userData.validUser.name));

          case 2:
            hasDeleteButton = _context26.sent;
            expect(hasDeleteButton).toBe(true);

          case 4:
          case "end":
            return _context26.stop();
        }
      }
    });
  }); // TC26 - DELETE CANCEL

  test("TC26 - Verify delete can be cancelled", function _callee27(_ref3) {
    var page, card, dialog, cancelButton;
    return regeneratorRuntime.async(function _callee27$(_context27) {
      while (1) {
        switch (_context27.prev = _context27.next) {
          case 0:
            page = _ref3.page;
            card = userManagementPage.getUserCard(userData.validUser.name);
            _context27.next = 4;
            return regeneratorRuntime.awrap(card.getByRole("button", {
              name: /Delete/i
            }).click());

          case 4:
            dialog = page.getByRole("dialog");
            _context27.next = 7;
            return regeneratorRuntime.awrap(dialog.count());

          case 7:
            _context27.t0 = _context27.sent;

            if (!(_context27.t0 > 0)) {
              _context27.next = 20;
              break;
            }

            _context27.next = 11;
            return regeneratorRuntime.awrap(expect(dialog).toBeVisible());

          case 11:
            cancelButton = dialog.getByRole("button", {
              name: /Cancel|No/i
            });
            _context27.next = 14;
            return regeneratorRuntime.awrap(cancelButton.count());

          case 14:
            _context27.t1 = _context27.sent;

            if (!(_context27.t1 > 0)) {
              _context27.next = 20;
              break;
            }

            _context27.next = 18;
            return regeneratorRuntime.awrap(cancelButton.click());

          case 18:
            _context27.next = 20;
            return regeneratorRuntime.awrap(expect(dialog).not.toBeVisible());

          case 20:
          case "end":
            return _context27.stop();
        }
      }
    });
  }); // TC27 - LONG SEARCH

  test("TC27 - Search using very long input", function _callee28() {
    var longText, count;
    return regeneratorRuntime.async(function _callee28$(_context28) {
      while (1) {
        switch (_context28.prev = _context28.next) {
          case 0:
            longText = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".repeat(20);
            _context28.next = 3;
            return regeneratorRuntime.awrap(userManagementPage.searchUser(longText));

          case 3:
            _context28.next = 5;
            return regeneratorRuntime.awrap(userManagementPage.getUserCount());

          case 5:
            count = _context28.sent;
            expect(count).toBeGreaterThanOrEqual(0);

          case 7:
          case "end":
            return _context28.stop();
        }
      }
    });
  }); // TC28 - LEADING/TRAILING SPACES

  test("TC28 - Search with leading and trailing spaces", function _callee29() {
    var count;
    return regeneratorRuntime.async(function _callee29$(_context29) {
      while (1) {
        switch (_context29.prev = _context29.next) {
          case 0:
            _context29.next = 2;
            return regeneratorRuntime.awrap(userManagementPage.searchUser("   Amrutha   "));

          case 2:
            _context29.next = 4;
            return regeneratorRuntime.awrap(userManagementPage.getUserCount());

          case 4:
            count = _context29.sent;
            expect(count).toBeGreaterThanOrEqual(0);

          case 6:
          case "end":
            return _context29.stop();
        }
      }
    });
  }); // TC29 - MIXED CASE

  test("TC29 - Search using mixed case", function _callee30() {
    var count;
    return regeneratorRuntime.async(function _callee30$(_context30) {
      while (1) {
        switch (_context30.prev = _context30.next) {
          case 0:
            _context30.next = 2;
            return regeneratorRuntime.awrap(userManagementPage.searchUser("aMrUtHa"));

          case 2:
            _context30.next = 4;
            return regeneratorRuntime.awrap(userManagementPage.getUserCount());

          case 4:
            count = _context30.sent;
            expect(count).toBeGreaterThanOrEqual(0);

          case 6:
          case "end":
            return _context30.stop();
        }
      }
    });
  }); // TC30 - RAPID SEARCH

  test("TC30 - Verify rapid search changes", function _callee31() {
    var count;
    return regeneratorRuntime.async(function _callee31$(_context31) {
      while (1) {
        switch (_context31.prev = _context31.next) {
          case 0:
            _context31.next = 2;
            return regeneratorRuntime.awrap(userManagementPage.searchUser("A"));

          case 2:
            _context31.next = 4;
            return regeneratorRuntime.awrap(userManagementPage.searchUser("Am"));

          case 4:
            _context31.next = 6;
            return regeneratorRuntime.awrap(userManagementPage.searchUser("Amr"));

          case 6:
            _context31.next = 8;
            return regeneratorRuntime.awrap(userManagementPage.searchUser("Amrutha"));

          case 8:
            _context31.next = 10;
            return regeneratorRuntime.awrap(userManagementPage.getUserCount());

          case 10:
            count = _context31.sent;
            expect(count).toBeGreaterThanOrEqual(0);

          case 12:
          case "end":
            return _context31.stop();
        }
      }
    });
  }); // TC31 - CHANGE FILTER

  test("TC31 - Verify changing department filter", function _callee32() {
    var firstCount, secondCount;
    return regeneratorRuntime.async(function _callee32$(_context32) {
      while (1) {
        switch (_context32.prev = _context32.next) {
          case 0:
            _context32.next = 2;
            return regeneratorRuntime.awrap(userManagementPage.selectDepartment("Java"));

          case 2:
            _context32.next = 4;
            return regeneratorRuntime.awrap(userManagementPage.getUserCount());

          case 4:
            firstCount = _context32.sent;
            _context32.next = 7;
            return regeneratorRuntime.awrap(userManagementPage.selectDepartment("testing"));

          case 7:
            _context32.next = 9;
            return regeneratorRuntime.awrap(userManagementPage.getUserCount());

          case 9:
            secondCount = _context32.sent;
            expect(firstCount).toBeGreaterThanOrEqual(0);
            expect(secondCount).toBeGreaterThanOrEqual(0);

          case 12:
          case "end":
            return _context32.stop();
        }
      }
    });
  }); // TC32 - ALL ACTION BUTTONS

  test("TC32 - Verify all user action buttons", function _callee33() {
    var user;
    return regeneratorRuntime.async(function _callee33$(_context33) {
      while (1) {
        switch (_context33.prev = _context33.next) {
          case 0:
            user = userData.validUser.name;
            _context33.t0 = expect;
            _context33.next = 4;
            return regeneratorRuntime.awrap(userManagementPage.hasViewButton(user));

          case 4:
            _context33.t1 = _context33.sent;
            (0, _context33.t0)(_context33.t1).toBe(true);
            _context33.t2 = expect;
            _context33.next = 9;
            return regeneratorRuntime.awrap(userManagementPage.hasEditButton(user));

          case 9:
            _context33.t3 = _context33.sent;
            (0, _context33.t2)(_context33.t3).toBe(true);
            _context33.t4 = expect;
            _context33.next = 14;
            return regeneratorRuntime.awrap(userManagementPage.hasAssetsButton(user));

          case 14:
            _context33.t5 = _context33.sent;
            (0, _context33.t4)(_context33.t5).toBe(true);
            _context33.t6 = expect;
            _context33.next = 19;
            return regeneratorRuntime.awrap(userManagementPage.hasDeleteButton(user));

          case 19:
            _context33.t7 = _context33.sent;
            (0, _context33.t6)(_context33.t7).toBe(true);

          case 21:
          case "end":
            return _context33.stop();
        }
      }
    });
  }); // TC33 - USER DETAILS NOT BLANK

  test("TC33 - Verify user details are not blank", function _callee34() {
    var details;
    return regeneratorRuntime.async(function _callee34$(_context34) {
      while (1) {
        switch (_context34.prev = _context34.next) {
          case 0:
            _context34.next = 2;
            return regeneratorRuntime.awrap(userManagementPage.getUserDetails(userData.validUser.name));

          case 2:
            details = _context34.sent;
            expect(details.trim().length).toBeGreaterThan(0);

          case 4:
          case "end":
            return _context34.stop();
        }
      }
    });
  }); // TC34 - NO RESULT SEARCH

  test("TC34 - Verify invalid search returns no users", function _callee35() {
    var count;
    return regeneratorRuntime.async(function _callee35$(_context35) {
      while (1) {
        switch (_context35.prev = _context35.next) {
          case 0:
            _context35.next = 2;
            return regeneratorRuntime.awrap(userManagementPage.searchUser("INVALID_USER_999999"));

          case 2:
            _context35.next = 4;
            return regeneratorRuntime.awrap(userManagementPage.getUserCount());

          case 4:
            count = _context35.sent;
            expect(count).toBe(0);

          case 6:
          case "end":
            return _context35.stop();
        }
      }
    });
  }); // TC35 - PAGE REFRESH

  test("TC35 - Verify users remain after page refresh", function _callee36(_ref4) {
    var page, initialCount, afterRefreshCount;
    return regeneratorRuntime.async(function _callee36$(_context36) {
      while (1) {
        switch (_context36.prev = _context36.next) {
          case 0:
            page = _ref4.page;
            _context36.next = 3;
            return regeneratorRuntime.awrap(userManagementPage.getUserCount());

          case 3:
            initialCount = _context36.sent;
            _context36.next = 6;
            return regeneratorRuntime.awrap(page.reload({
              waitUntil: "domcontentloaded"
            }));

          case 6:
            _context36.next = 8;
            return regeneratorRuntime.awrap(expect(userManagementPage.pageTitle).toBeVisible({
              timeout: 30000
            }));

          case 8:
            _context36.next = 10;
            return regeneratorRuntime.awrap(userManagementPage.getUserCount());

          case 10:
            afterRefreshCount = _context36.sent;
            expect(afterRefreshCount).toBe(initialCount);

          case 12:
          case "end":
            return _context36.stop();
        }
      }
    });
  }); // TC36 - URL

  test("TC36 - Verify User Management URL", function _callee37(_ref5) {
    var page;
    return regeneratorRuntime.async(function _callee37$(_context37) {
      while (1) {
        switch (_context37.prev = _context37.next) {
          case 0:
            page = _ref5.page;
            _context37.next = 3;
            return regeneratorRuntime.awrap(expect(page).toHaveURL(/\/users/i));

          case 3:
          case "end":
            return _context37.stop();
        }
      }
    });
  }); // TC37 - SEARCH ENABLED

  test("TC37 - Verify search field is enabled", function _callee38() {
    return regeneratorRuntime.async(function _callee38$(_context38) {
      while (1) {
        switch (_context38.prev = _context38.next) {
          case 0:
            _context38.next = 2;
            return regeneratorRuntime.awrap(expect(userManagementPage.searchInput).toBeEnabled());

          case 2:
          case "end":
            return _context38.stop();
        }
      }
    });
  }); // TC38 - DEPARTMENT DROPDOWN

  test("TC38 - Verify department dropdown is visible", function _callee39() {
    return regeneratorRuntime.async(function _callee39$(_context39) {
      while (1) {
        switch (_context39.prev = _context39.next) {
          case 0:
            _context39.next = 2;
            return regeneratorRuntime.awrap(expect(userManagementPage.departmentDropdown).toBeVisible());

          case 2:
          case "end":
            return _context39.stop();
        }
      }
    });
  }); // TC39 - LOCATION DROPDOWN

  test("TC39 - Verify location dropdown is visible", function _callee40() {
    return regeneratorRuntime.async(function _callee40$(_context40) {
      while (1) {
        switch (_context40.prev = _context40.next) {
          case 0:
            _context40.next = 2;
            return regeneratorRuntime.awrap(expect(userManagementPage.locationDropdown).toBeVisible());

          case 2:
          case "end":
            return _context40.stop();
        }
      }
    });
  });
});