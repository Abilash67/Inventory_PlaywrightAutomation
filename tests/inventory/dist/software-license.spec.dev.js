"use strict";

var _require = require('../../fixtures/appFixtures'),
    test = _require.test,
    expect = _require.expect;

test.describe('Inventory - Software Licenses', function () {
  test.beforeEach(function _callee(_ref) {
    var page, inventoryPage, softwareLicensePage;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            page = _ref.page, inventoryPage = _ref.inventoryPage, softwareLicensePage = _ref.softwareLicensePage;
            _context.next = 3;
            return regeneratorRuntime.awrap(page["goto"]('/'));

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
  test('displays and filters the Software Licenses table', function _callee2(_ref2) {
    var softwareLicensePage;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            softwareLicensePage = _ref2.softwareLicensePage;
            _context2.next = 3;
            return regeneratorRuntime.awrap(softwareLicensePage.selectFilterOption(softwareLicensePage.softwareFilter, 'Operating System'));

          case 3:
            _context2.next = 5;
            return regeneratorRuntime.awrap(expect(softwareLicensePage.rows().first()).toContainText('Operating System'));

          case 5:
            _context2.next = 7;
            return regeneratorRuntime.awrap(softwareLicensePage.selectFilterOption(softwareLicensePage.statusFilter, 'In Use'));

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
  test('searches licenses and shows no matching record for invalid input', function _callee3(_ref3) {
    var softwareLicensePage, code;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            softwareLicensePage = _ref3.softwareLicensePage;
            _context3.next = 3;
            return regeneratorRuntime.awrap(softwareLicensePage.rows().first().locator('td').nth(1).innerText());

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
            return regeneratorRuntime.awrap(softwareLicensePage.search('NON_EXISTENT_LICENSE_999999'));

          case 12:
            _context3.next = 14;
            return regeneratorRuntime.awrap(expect(softwareLicensePage.rows()).toHaveCount(0));

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    });
  });
  test('changes rows per page and exposes safe pagination controls', function _callee4(_ref4) {
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
  test('opens license details and edit form', function _callee5(_ref5) {
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
            return regeneratorRuntime.awrap(expect(page.getByRole('dialog').getByRole('button', {
              name: /Update|Save/
            })).toBeVisible());

          case 13:
            _context5.next = 15;
            return regeneratorRuntime.awrap(page.getByRole('dialog').getByRole('button', {
              name: 'Cancel'
            }).click());

          case 15:
          case "end":
            return _context5.stop();
        }
      }
    });
  });
  test('opens the Add License form with supported fields', function _callee6(_ref6) {
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
            return regeneratorRuntime.awrap(softwareLicensePage.dialog().getByRole('button', {
              name: 'Cancel'
            }).click());

          case 7:
          case "end":
            return _context6.stop();
        }
      }
    });
  });
});