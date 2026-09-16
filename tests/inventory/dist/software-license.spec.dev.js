"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var _require = require("../../fixtures/appFixtures"),
    test = _require.test,
    expect = _require.expect;

test.describe("Inventory - Software Licenses", function () {
  test.beforeEach(function _callee(_ref) {
    var page, inventoryPage, softwareLicensePage;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            page = _ref.page, inventoryPage = _ref.inventoryPage, softwareLicensePage = _ref.softwareLicensePage;
            _context.next = 3;
            return regeneratorRuntime.awrap(page["goto"]("/"));

          case 3:
            _context.next = 5;
            return regeneratorRuntime.awrap(inventoryPage.navigateToInventory());

          case 5:
            _context.next = 7;
            return regeneratorRuntime.awrap(inventoryPage.openSoftwareLicenses());

          case 7:
            _context.next = 9;
            return regeneratorRuntime.awrap(softwareLicensePage.verifyTable());

          case 9:
          case "end":
            return _context.stop();
        }
      }
    });
  });
  test("displays and filters the Software Licenses table", function _callee2(_ref2) {
    var softwareLicensePage;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            softwareLicensePage = _ref2.softwareLicensePage;
            _context2.next = 3;
            return regeneratorRuntime.awrap(softwareLicensePage.selectFilterOption(softwareLicensePage.softwareFilter, "Operating System"));

          case 3:
            _context2.next = 5;
            return regeneratorRuntime.awrap(expect(softwareLicensePage.rows().first()).toContainText("Operating System"));

          case 5:
            _context2.next = 7;
            return regeneratorRuntime.awrap(softwareLicensePage.selectFilterOption(softwareLicensePage.statusFilter, "In Use"));

          case 7:
            _context2.next = 9;
            return regeneratorRuntime.awrap(expect(softwareLicensePage.rows().first()).toBeVisible());

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
  test("searches licenses and shows no matching record for invalid input", function _callee3(_ref3) {
    var softwareLicensePage, code;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            softwareLicensePage = _ref3.softwareLicensePage;
            _context3.next = 3;
            return regeneratorRuntime.awrap(softwareLicensePage.rows().first().locator("td").nth(1).innerText());

          case 3:
            code = _context3.sent.trim();
            _context3.next = 6;
            return regeneratorRuntime.awrap(softwareLicensePage.search(code));

          case 6:
            _context3.next = 8;
            return regeneratorRuntime.awrap(expect(softwareLicensePage.rows()).toHaveCount(1));

          case 8:
            _context3.next = 10;
            return regeneratorRuntime.awrap(expect(softwareLicensePage.rows().first()).toContainText(code));

          case 10:
            _context3.next = 12;
            return regeneratorRuntime.awrap(softwareLicensePage.search("NON_EXISTENT_LICENSE_999999"));

          case 12:
            _context3.next = 14;
            return regeneratorRuntime.awrap(expect(softwareLicensePage.licenseTab.getByText(/no\s*(results|records|data|licenses)\s*found/i)).toBeVisible());

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    });
  });
  test("changes rows per page and exposes safe pagination controls", function _callee4(_ref4) {
    var softwareLicensePage;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            softwareLicensePage = _ref4.softwareLicensePage;
            _context4.next = 3;
            return regeneratorRuntime.awrap(softwareLicensePage.selectRowsPerPage(50));

          case 3:
            _context4.next = 5;
            return regeneratorRuntime.awrap(expect(softwareLicensePage.rows()).toHaveCount(25));

          case 5:
            _context4.next = 7;
            return regeneratorRuntime.awrap(expect(softwareLicensePage.previousButton).toBeDisabled());

          case 7:
            _context4.next = 9;
            return regeneratorRuntime.awrap(expect(softwareLicensePage.nextButton).toBeDisabled());

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    });
  });
  test("opens license details and edit form", function _callee5(_ref5) {
    var page, softwareLicensePage;
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            page = _ref5.page, softwareLicensePage = _ref5.softwareLicensePage;
            _context5.next = 3;
            return regeneratorRuntime.awrap(softwareLicensePage.viewFirstLicense());

          case 3:
            _context5.next = 5;
            return regeneratorRuntime.awrap(softwareLicensePage.verifyLicenseDetails());

          case 5:
            _context5.next = 7;
            return regeneratorRuntime.awrap(softwareLicensePage.closeDialog());

          case 7:
            _context5.next = 9;
            return regeneratorRuntime.awrap(softwareLicensePage.editFirstLicense());

          case 9:
            _context5.next = 11;
            return regeneratorRuntime.awrap(softwareLicensePage.verifyLicenseForm({
              edit: true
            }));

          case 11:
            _context5.next = 13;
            return regeneratorRuntime.awrap(expect(page.getByRole("dialog").getByRole("button", {
              name: /Update|Save/
            })).toBeVisible());

          case 13:
            _context5.next = 15;
            return regeneratorRuntime.awrap(page.getByRole("dialog").getByRole("button", {
              name: "Cancel"
            }).click());

          case 15:
          case "end":
            return _context5.stop();
        }
      }
    });
  });
  test("opens the Add License form with supported fields", function _callee6(_ref6) {
    var softwareLicensePage;
    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            softwareLicensePage = _ref6.softwareLicensePage;
            _context6.next = 3;
            return regeneratorRuntime.awrap(softwareLicensePage.openAddLicenseForm());

          case 3:
            _context6.next = 5;
            return regeneratorRuntime.awrap(softwareLicensePage.verifyLicenseForm());

          case 5:
            _context6.next = 7;
            return regeneratorRuntime.awrap(softwareLicensePage.dialog().getByRole("button", {
              name: "Cancel"
            }).click());

          case 7:
          case "end":
            return _context6.stop();
        }
      }
    });
  });
  test("sorts the Software Licenses table by column header", function _callee7(_ref7) {
    var softwareLicensePage, nameHeader, nameColumnCells, valuesAfterFirstClick, trimmedFirst, ascSorted, valuesAfterSecondClick, trimmedSecond, descSorted;
    return regeneratorRuntime.async(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            softwareLicensePage = _ref7.softwareLicensePage;
            nameHeader = softwareLicensePage.licenseTable.getByRole("columnheader", {
              name: /Software Name/
            });
            _context7.next = 4;
            return regeneratorRuntime.awrap(nameHeader.click());

          case 4:
            nameColumnCells = softwareLicensePage.rows().locator("td").nth(0);
            _context7.next = 7;
            return regeneratorRuntime.awrap(nameColumnCells.allInnerTexts());

          case 7:
            valuesAfterFirstClick = _context7.sent;
            trimmedFirst = valuesAfterFirstClick.map(function (value) {
              return value.trim();
            });
            ascSorted = _toConsumableArray(trimmedFirst).sort(function (a, b) {
              return a.localeCompare(b);
            });
            expect(trimmedFirst).toEqual(ascSorted);
            _context7.next = 13;
            return regeneratorRuntime.awrap(nameHeader.click());

          case 13:
            _context7.next = 15;
            return regeneratorRuntime.awrap(nameColumnCells.allInnerTexts());

          case 15:
            valuesAfterSecondClick = _context7.sent;
            trimmedSecond = valuesAfterSecondClick.map(function (value) {
              return value.trim();
            });
            descSorted = _toConsumableArray(trimmedSecond).sort(function (a, b) {
              return b.localeCompare(a);
            });
            expect(trimmedSecond).toEqual(descSorted);

          case 19:
          case "end":
            return _context7.stop();
        }
      }
    });
  });
  test("shows empty state when search yields no results", function _callee8(_ref8) {
    var softwareLicensePage, emptyState;
    return regeneratorRuntime.async(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            softwareLicensePage = _ref8.softwareLicensePage;
            emptyState = softwareLicensePage.licenseTab.getByText(/no\s*(results|records|data|licenses)\s*found/i);
            _context8.next = 4;
            return regeneratorRuntime.awrap(softwareLicensePage.search("NON_EXISTENT_LICENSE_ZZZZZ"));

          case 4:
            _context8.next = 6;
            return regeneratorRuntime.awrap(expect(emptyState).toBeVisible());

          case 6:
            _context8.next = 8;
            return regeneratorRuntime.awrap(softwareLicensePage.search(""));

          case 8:
            _context8.next = 10;
            return regeneratorRuntime.awrap(expect(softwareLicensePage.rows().first()).toBeVisible());

          case 10:
          case "end":
            return _context8.stop();
        }
      }
    });
  });
  test("supports keyboard tab navigation through the Add License dialog", function _callee9(_ref9) {
    var page, softwareLicensePage, dialog, focusedTags, i, tagName, focusableTypes, insideDialog, isTrapped;
    return regeneratorRuntime.async(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            page = _ref9.page, softwareLicensePage = _ref9.softwareLicensePage;
            _context9.next = 3;
            return regeneratorRuntime.awrap(softwareLicensePage.openAddLicenseForm());

          case 3:
            dialog = softwareLicensePage.dialog();
            _context9.next = 6;
            return regeneratorRuntime.awrap(expect(dialog).toBeVisible());

          case 6:
            focusedTags = [];
            i = 0;

          case 8:
            if (!(i < 12)) {
              _context9.next = 18;
              break;
            }

            _context9.next = 11;
            return regeneratorRuntime.awrap(page.keyboard.press("Tab"));

          case 11:
            _context9.next = 13;
            return regeneratorRuntime.awrap(page.evaluate(function () {
              var element = document.activeElement;
              return element ? element.tagName.toLowerCase() : null;
            }));

          case 13:
            tagName = _context9.sent;
            focusedTags.push(tagName);

          case 15:
            i++;
            _context9.next = 8;
            break;

          case 18:
            focusableTypes = ["input", "select", "textarea", "button", "a"];
            insideDialog = focusedTags.filter(function (tag) {
              return focusableTypes.includes(tag);
            });
            expect(insideDialog.length).toBeGreaterThanOrEqual(5);
            _context9.next = 23;
            return regeneratorRuntime.awrap(page.evaluate(function () {
              var element = document.activeElement;
              return element ? !!element.closest('[role="dialog"]') : false;
            }));

          case 23:
            isTrapped = _context9.sent;
            expect(isTrapped).toBe(true);
            _context9.next = 27;
            return regeneratorRuntime.awrap(dialog.getByRole("button", {
              name: "Cancel"
            }).click());

          case 27:
          case "end":
            return _context9.stop();
        }
      }
    });
  });
  test("maintains visible layout across mobile, tablet, and desktop viewports", function _callee10(_ref10) {
    var page, softwareLicensePage, viewports, _i, _viewports, viewport;

    return regeneratorRuntime.async(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            page = _ref10.page, softwareLicensePage = _ref10.softwareLicensePage;
            viewports = [{
              name: "mobile",
              width: 375,
              height: 667
            }, {
              name: "tablet",
              width: 768,
              height: 1024
            }, {
              name: "desktop",
              width: 1440,
              height: 900
            }];
            _i = 0, _viewports = viewports;

          case 3:
            if (!(_i < _viewports.length)) {
              _context10.next = 14;
              break;
            }

            viewport = _viewports[_i];
            _context10.next = 7;
            return regeneratorRuntime.awrap(page.setViewportSize({
              width: viewport.width,
              height: viewport.height
            }));

          case 7:
            _context10.next = 9;
            return regeneratorRuntime.awrap(expect(softwareLicensePage.licenseTable).toBeVisible());

          case 9:
            _context10.next = 11;
            return regeneratorRuntime.awrap(expect(softwareLicensePage.rows().first()).toBeVisible());

          case 11:
            _i++;
            _context10.next = 3;
            break;

          case 14:
            _context10.next = 16;
            return regeneratorRuntime.awrap(page.setViewportSize({
              width: 375,
              height: 667
            }));

          case 16:
            _context10.next = 18;
            return regeneratorRuntime.awrap(softwareLicensePage.openAddLicenseForm());

          case 18:
            _context10.next = 20;
            return regeneratorRuntime.awrap(expect(softwareLicensePage.dialog()).toBeVisible());

          case 20:
            _context10.next = 22;
            return regeneratorRuntime.awrap(softwareLicensePage.dialog().getByRole("button", {
              name: "Cancel"
            }).click());

          case 22:
            _context10.next = 24;
            return regeneratorRuntime.awrap(page.setViewportSize({
              width: 1536,
              height: 864
            }));

          case 24:
          case "end":
            return _context10.stop();
        }
      }
    });
  });
});