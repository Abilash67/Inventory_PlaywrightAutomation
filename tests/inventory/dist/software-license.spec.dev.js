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
    var page, softwareLicensePage;
    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            page = _ref6.page, softwareLicensePage = _ref6.softwareLicensePage;
            _context6.next = 3;
            return regeneratorRuntime.awrap(softwareLicensePage.openAddLicenseForm());

          case 3:
            _context6.next = 5;
            return regeneratorRuntime.awrap(expect(page.getByRole("dialog")).toBeVisible());

          case 5:
            _context6.next = 7;
            return regeneratorRuntime.awrap(softwareLicensePage.verifyLicenseForm());

          case 7:
            _context6.next = 9;
            return regeneratorRuntime.awrap(softwareLicensePage.cancelForm());

          case 9:
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
            return regeneratorRuntime.awrap(softwareLicensePage.cancelForm());

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
            return regeneratorRuntime.awrap(softwareLicensePage.cancelForm());

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
  test("adds a valid software license and verifies it", function _callee11(_ref11) {
    var softwareLicensePage, options, software, licenseKey;
    return regeneratorRuntime.async(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            softwareLicensePage = _ref11.softwareLicensePage;
            _context11.next = 3;
            return regeneratorRuntime.awrap(softwareLicensePage.openAddLicenseForm());

          case 3:
            _context11.next = 5;
            return regeneratorRuntime.awrap(softwareLicensePage.getSoftwareOptions());

          case 5:
            options = _context11.sent;
            software = options.find(function (option) {
              return option.trim() && !/select|choose/i.test(option);
            });
            expect(software).toBeTruthy();
            licenseKey = "AUTO-LIC-".concat(Date.now());
            _context11.next = 11;
            return regeneratorRuntime.awrap(softwareLicensePage.fillLicenseForm({
              software: software,
              licenseKey: licenseKey,
              maxDevices: 10,
              purchaseDate: "2026-09-18",
              expirationDate: "2027-09-18",
              adminEmail: "admin@example.com",
              remarks: "Playwright Phase 2 automation test",
              autoRenewal: false
            }));

          case 11:
            _context11.next = 13;
            return regeneratorRuntime.awrap(softwareLicensePage.saveLicense());

          case 13:
            _context11.next = 15;
            return regeneratorRuntime.awrap(softwareLicensePage.verifySuccessMessage());

          case 15:
            _context11.next = 17;
            return regeneratorRuntime.awrap(softwareLicensePage.search(licenseKey));

          case 17:
            _context11.next = 19;
            return regeneratorRuntime.awrap(softwareLicensePage.verifyLicenseExists(licenseKey));

          case 19:
          case "end":
            return _context11.stop();
        }
      }
    });
  });
  test("edits a software license and verifies persistence", function _callee12(_ref12) {
    var softwareLicensePage, license, updatedRemarks;
    return regeneratorRuntime.async(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            softwareLicensePage = _ref12.softwareLicensePage;
            _context12.next = 3;
            return regeneratorRuntime.awrap(softwareLicensePage.getFirstLicenseData());

          case 3:
            license = _context12.sent;
            expect(license.softwareCode).toBeTruthy();
            _context12.next = 7;
            return regeneratorRuntime.awrap(softwareLicensePage.editLicenseByText(license.softwareName));

          case 7:
            _context12.next = 9;
            return regeneratorRuntime.awrap(softwareLicensePage.verifyLicenseForm({
              edit: true
            }));

          case 9:
            updatedRemarks = "Updated by Playwright ".concat(Date.now());
            _context12.next = 12;
            return regeneratorRuntime.awrap(softwareLicensePage.fillLicenseForm({
              remarks: updatedRemarks
            }));

          case 12:
            _context12.next = 14;
            return regeneratorRuntime.awrap(softwareLicensePage.updateLicense());

          case 14:
            _context12.next = 16;
            return regeneratorRuntime.awrap(softwareLicensePage.verifySuccessMessage());

          case 16:
            _context12.next = 18;
            return regeneratorRuntime.awrap(softwareLicensePage.search(license.softwareCode));

          case 18:
            _context12.next = 20;
            return regeneratorRuntime.awrap(softwareLicensePage.verifyLicenseExists(license.softwareCode));

          case 20:
          case "end":
            return _context12.stop();
        }
      }
    });
  });
  test("validates an empty software license form", function _callee13(_ref13) {
    var softwareLicensePage;
    return regeneratorRuntime.async(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            softwareLicensePage = _ref13.softwareLicensePage;
            _context13.next = 3;
            return regeneratorRuntime.awrap(softwareLicensePage.openAddLicenseForm());

          case 3:
            _context13.next = 5;
            return regeneratorRuntime.awrap(softwareLicensePage.clearLicenseForm());

          case 5:
            _context13.next = 7;
            return regeneratorRuntime.awrap(softwareLicensePage.saveLicense());

          case 7:
            _context13.next = 9;
            return regeneratorRuntime.awrap(softwareLicensePage.verifyValidationMessage());

          case 9:
            _context13.next = 11;
            return regeneratorRuntime.awrap(expect(softwareLicensePage.licenseTab).toBeVisible());

          case 11:
          case "end":
            return _context13.stop();
        }
      }
    });
  });
  test("validates invalid software license fields", function _callee14(_ref14) {
    var softwareLicensePage, options, software;
    return regeneratorRuntime.async(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            softwareLicensePage = _ref14.softwareLicensePage;
            _context14.next = 3;
            return regeneratorRuntime.awrap(softwareLicensePage.openAddLicenseForm());

          case 3:
            _context14.next = 5;
            return regeneratorRuntime.awrap(softwareLicensePage.getSoftwareOptions());

          case 5:
            options = _context14.sent;
            software = options.find(function (option) {
              return option.trim() && !/select|choose/i.test(option);
            });
            expect(software).toBeTruthy();
            _context14.next = 10;
            return regeneratorRuntime.awrap(softwareLicensePage.fillLicenseForm({
              software: software,
              licenseKey: "INVALID",
              maxDevices: -1,
              purchaseDate: "2027-09-18",
              expirationDate: "2026-09-18",
              adminEmail: "invalid-email",
              remarks: "Invalid field validation"
            }));

          case 10:
            _context14.next = 12;
            return regeneratorRuntime.awrap(softwareLicensePage.saveLicense());

          case 12:
            _context14.next = 14;
            return regeneratorRuntime.awrap(softwareLicensePage.verifyValidationMessage());

          case 14:
          case "end":
            return _context14.stop();
        }
      }
    });
  });
  test("rejects a duplicate license key", function _callee15(_ref15) {
    var softwareLicensePage, existingLicense, options, software;
    return regeneratorRuntime.async(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            softwareLicensePage = _ref15.softwareLicensePage;
            _context15.next = 3;
            return regeneratorRuntime.awrap(softwareLicensePage.getFirstLicenseData());

          case 3:
            existingLicense = _context15.sent;
            _context15.next = 6;
            return regeneratorRuntime.awrap(softwareLicensePage.openAddLicenseForm());

          case 6:
            _context15.next = 8;
            return regeneratorRuntime.awrap(softwareLicensePage.getSoftwareOptions());

          case 8:
            options = _context15.sent;
            software = options.find(function (option) {
              return option.trim() && !/select|choose/i.test(option);
            });
            expect(software).toBeTruthy();
            _context15.next = 13;
            return regeneratorRuntime.awrap(softwareLicensePage.fillLicenseForm({
              software: software,
              licenseKey: existingLicense.softwareCode,
              maxDevices: 10,
              purchaseDate: "2026-09-18",
              expirationDate: "2027-09-18",
              adminEmail: "admin@example.com",
              remarks: "Duplicate license key validation"
            }));

          case 13:
            _context15.next = 15;
            return regeneratorRuntime.awrap(softwareLicensePage.saveLicense());

          case 15:
            _context15.next = 17;
            return regeneratorRuntime.awrap(softwareLicensePage.verifyValidationMessage());

          case 17:
          case "end":
            return _context15.stop();
        }
      }
    });
  });
  test("validates duplicate software selection", function _callee16(_ref16) {
    var softwareLicensePage, existingLicense, options, software;
    return regeneratorRuntime.async(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            softwareLicensePage = _ref16.softwareLicensePage;
            _context16.next = 3;
            return regeneratorRuntime.awrap(softwareLicensePage.getFirstLicenseData());

          case 3:
            existingLicense = _context16.sent;
            _context16.next = 6;
            return regeneratorRuntime.awrap(softwareLicensePage.openAddLicenseForm());

          case 6:
            _context16.next = 8;
            return regeneratorRuntime.awrap(softwareLicensePage.getSoftwareOptions());

          case 8:
            options = _context16.sent;
            software = options.find(function (option) {
              return option.trim() === existingLicense.softwareName.trim();
            });
            expect(software).toBeTruthy();
            _context16.next = 13;
            return regeneratorRuntime.awrap(softwareLicensePage.fillLicenseForm({
              software: software,
              licenseKey: "DUP-SOFTWARE-".concat(Date.now()),
              maxDevices: 10,
              purchaseDate: "2026-09-18",
              expirationDate: "2027-09-18",
              adminEmail: "admin@example.com",
              remarks: "Duplicate software validation"
            }));

          case 13:
            _context16.next = 15;
            return regeneratorRuntime.awrap(softwareLicensePage.saveLicense());

          case 15:
            _context16.next = 17;
            return regeneratorRuntime.awrap(softwareLicensePage.verifyValidationMessage());

          case 17:
          case "end":
            return _context16.stop();
        }
      }
    });
  });
  test("validates an expiration date earlier than the purchase date", function _callee17(_ref17) {
    var softwareLicensePage, options, software;
    return regeneratorRuntime.async(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            softwareLicensePage = _ref17.softwareLicensePage;
            _context17.next = 3;
            return regeneratorRuntime.awrap(softwareLicensePage.openAddLicenseForm());

          case 3:
            _context17.next = 5;
            return regeneratorRuntime.awrap(softwareLicensePage.getSoftwareOptions());

          case 5:
            options = _context17.sent;
            software = options.find(function (option) {
              return option.trim() && !/select|choose/i.test(option);
            });
            expect(software).toBeTruthy();
            _context17.next = 10;
            return regeneratorRuntime.awrap(softwareLicensePage.fillLicenseForm({
              software: software,
              licenseKey: "EXPIRY-".concat(Date.now()),
              maxDevices: 10,
              purchaseDate: "2027-09-18",
              expirationDate: "2026-09-18",
              adminEmail: "admin@example.com",
              remarks: "Expiration date validation"
            }));

          case 10:
            _context17.next = 12;
            return regeneratorRuntime.awrap(softwareLicensePage.saveLicense());

          case 12:
            _context17.next = 14;
            return regeneratorRuntime.awrap(softwareLicensePage.verifyValidationMessage());

          case 14:
          case "end":
            return _context17.stop();
        }
      }
    });
  });
  test("verifies active license records", function _callee18(_ref18) {
    var softwareLicensePage;
    return regeneratorRuntime.async(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            softwareLicensePage = _ref18.softwareLicensePage;
            _context18.next = 3;
            return regeneratorRuntime.awrap(softwareLicensePage.selectFilterOption(softwareLicensePage.statusFilter, "In Use"));

          case 3:
            _context18.next = 5;
            return regeneratorRuntime.awrap(expect(softwareLicensePage.rows().first()).toBeVisible());

          case 5:
          case "end":
            return _context18.stop();
        }
      }
    });
  });
  test("verifies expired license records when available", function _callee19(_ref19) {
    var softwareLicensePage, expiredRows, rowCount;
    return regeneratorRuntime.async(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            softwareLicensePage = _ref19.softwareLicensePage;
            expiredRows = softwareLicensePage.rows().filter({
              hasText: /Expired\s*\(/i
            });
            _context19.next = 4;
            return regeneratorRuntime.awrap(expiredRows.count());

          case 4:
            rowCount = _context19.sent;

            if (!(rowCount > 0)) {
              _context19.next = 12;
              break;
            }

            _context19.next = 8;
            return regeneratorRuntime.awrap(expect(expiredRows.first()).toBeVisible());

          case 8:
            _context19.next = 10;
            return regeneratorRuntime.awrap(expect(expiredRows.first()).toContainText(/Expired\s*\(/i));

          case 10:
            _context19.next = 14;
            break;

          case 12:
            _context19.next = 14;
            return regeneratorRuntime.awrap(expect(softwareLicensePage.licenseTab.getByText(/no\s*(results|records|data|licenses)\s*found/i)).toBeVisible());

          case 14:
          case "end":
            return _context19.stop();
        }
      }
    });
  });
  test("verifies non-expired license records when available", function _callee20(_ref20) {
    var softwareLicensePage, rows, rowCount, nonExpiredCount, index, expirationText, nonExpiredRows;
    return regeneratorRuntime.async(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            softwareLicensePage = _ref20.softwareLicensePage;
            rows = softwareLicensePage.rows();
            _context20.next = 4;
            return regeneratorRuntime.awrap(rows.count());

          case 4:
            rowCount = _context20.sent;
            nonExpiredCount = 0;
            index = 0;

          case 7:
            if (!(index < rowCount)) {
              _context20.next = 15;
              break;
            }

            _context20.next = 10;
            return regeneratorRuntime.awrap(rows.nth(index).locator("td").nth(2).innerText());

          case 10:
            expirationText = _context20.sent.trim();

            if (!/Expired\s*\(/i.test(expirationText)) {
              nonExpiredCount++;
            }

          case 12:
            index++;
            _context20.next = 7;
            break;

          case 15:
            if (!(nonExpiredCount > 0)) {
              _context20.next = 21;
              break;
            }

            nonExpiredRows = rows.filter({
              hasNotText: /Expired\s*\(/i
            });
            _context20.next = 19;
            return regeneratorRuntime.awrap(expect(nonExpiredRows.first()).toBeVisible());

          case 19:
            _context20.next = 23;
            break;

          case 21:
            _context20.next = 23;
            return regeneratorRuntime.awrap(expect(softwareLicensePage.licenseTab.getByText(/no\s*(results|records|data|licenses)\s*found/i)).toBeVisible());

          case 23:
          case "end":
            return _context20.stop();
        }
      }
    });
  });
  test("opens edit form for an existing license and supports status transition fields", function _callee21(_ref21) {
    var softwareLicensePage, fields;
    return regeneratorRuntime.async(function _callee21$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            softwareLicensePage = _ref21.softwareLicensePage;
            _context21.next = 3;
            return regeneratorRuntime.awrap(softwareLicensePage.editFirstLicense());

          case 3:
            _context21.next = 5;
            return regeneratorRuntime.awrap(softwareLicensePage.verifyLicenseForm({
              edit: true
            }));

          case 5:
            _context21.next = 7;
            return regeneratorRuntime.awrap(softwareLicensePage.getFormFields());

          case 7:
            fields = _context21.sent;
            _context21.next = 10;
            return regeneratorRuntime.awrap(expect(fields.dates).toHaveCount(2));

          case 10:
            _context21.next = 12;
            return regeneratorRuntime.awrap(expect(fields.autoRenewal).toBeVisible());

          case 12:
            _context21.next = 14;
            return regeneratorRuntime.awrap(softwareLicensePage.cancelForm());

          case 14:
          case "end":
            return _context21.stop();
        }
      }
    });
  });
});