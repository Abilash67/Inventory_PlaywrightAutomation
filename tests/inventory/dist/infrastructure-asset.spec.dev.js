"use strict";

var _require = require("../../fixtures/appFixtures"),
    test = _require.test,
    expect = _require.expect;

test.describe("Inventory - Infrastructure Assets", function () {
  test.beforeEach(function _callee(_ref) {
    var page, inventoryPage, infrastructureAssetPage;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            page = _ref.page, inventoryPage = _ref.inventoryPage, infrastructureAssetPage = _ref.infrastructureAssetPage;
            _context.next = 3;
            return regeneratorRuntime.awrap(page["goto"]("/"));

          case 3:
            _context.next = 5;
            return regeneratorRuntime.awrap(inventoryPage.navigateToInventory());

          case 5:
            _context.next = 7;
            return regeneratorRuntime.awrap(inventoryPage.openInfrastructureAssets());

          case 7:
            _context.next = 9;
            return regeneratorRuntime.awrap(infrastructureAssetPage.verifyTable());

          case 9:
          case "end":
            return _context.stop();
        }
      }
    });
  });
  test("displays the Infrastructure Assets table and pagination state", function _callee2(_ref2) {
    var infrastructureAssetPage, rowCount;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            infrastructureAssetPage = _ref2.infrastructureAssetPage;
            _context2.next = 3;
            return regeneratorRuntime.awrap(infrastructureAssetPage.rows().count());

          case 3:
            rowCount = _context2.sent;
            expect(rowCount).toBeGreaterThan(0);
            _context2.next = 7;
            return regeneratorRuntime.awrap(expect(infrastructureAssetPage.pageIndicator).toContainText("Page 1 of 1"));

          case 7:
            _context2.next = 9;
            return regeneratorRuntime.awrap(expect(infrastructureAssetPage.previousButton).toBeDisabled());

          case 9:
            _context2.next = 11;
            return regeneratorRuntime.awrap(expect(infrastructureAssetPage.nextButton).toBeDisabled());

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
  test("changes the infrastructure rows per page control", function _callee3(_ref3) {
    var infrastructureAssetPage, initialRowCount;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            infrastructureAssetPage = _ref3.infrastructureAssetPage;
            _context3.next = 3;
            return regeneratorRuntime.awrap(infrastructureAssetPage.rows().count());

          case 3:
            initialRowCount = _context3.sent;
            _context3.next = 6;
            return regeneratorRuntime.awrap(infrastructureAssetPage.selectRowsPerPage(50));

          case 6:
            _context3.next = 8;
            return regeneratorRuntime.awrap(expect(infrastructureAssetPage.rows()).toHaveCount(initialRowCount));

          case 8:
            _context3.next = 10;
            return regeneratorRuntime.awrap(expect(infrastructureAssetPage.pageIndicator).toContainText("Page 1 of 1"));

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    });
  });
  test("opens infrastructure asset details and edit form", function _callee4(_ref4) {
    var infrastructureAssetPage;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            infrastructureAssetPage = _ref4.infrastructureAssetPage;
            _context4.next = 3;
            return regeneratorRuntime.awrap(infrastructureAssetPage.viewFirstAsset());

          case 3:
            _context4.next = 5;
            return regeneratorRuntime.awrap(infrastructureAssetPage.verifyViewDetails());

          case 5:
            _context4.next = 7;
            return regeneratorRuntime.awrap(infrastructureAssetPage.closeDialog());

          case 7:
            _context4.next = 9;
            return regeneratorRuntime.awrap(infrastructureAssetPage.editFirstAsset());

          case 9:
            _context4.next = 11;
            return regeneratorRuntime.awrap(infrastructureAssetPage.verifyAssetForm({
              edit: true
            }));

          case 11:
            _context4.next = 13;
            return regeneratorRuntime.awrap(infrastructureAssetPage.dialog().getByRole("button", {
              name: "Cancel",
              exact: true
            }).click());

          case 13:
            _context4.next = 15;
            return regeneratorRuntime.awrap(expect(infrastructureAssetPage.dialog()).toBeHidden());

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    });
  });
  test("opens the Add Infrastructure Asset form with supported fields", function _callee5(_ref5) {
    var infrastructureAssetPage;
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            infrastructureAssetPage = _ref5.infrastructureAssetPage;
            _context5.next = 3;
            return regeneratorRuntime.awrap(infrastructureAssetPage.openAddAssetForm());

          case 3:
            _context5.next = 5;
            return regeneratorRuntime.awrap(infrastructureAssetPage.verifyAssetForm());

          case 5:
            _context5.next = 7;
            return regeneratorRuntime.awrap(infrastructureAssetPage.dialog().getByRole("button", {
              name: "Cancel",
              exact: true
            }).click());

          case 7:
            _context5.next = 9;
            return regeneratorRuntime.awrap(expect(infrastructureAssetPage.dialog()).toBeHidden());

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    });
  });
  test("adds a valid infrastructure asset and verifies the created record", function _callee6(_ref6) {
    var infrastructureAssetPage, assetCode;
    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            infrastructureAssetPage = _ref6.infrastructureAssetPage;
            _context6.next = 3;
            return regeneratorRuntime.awrap(infrastructureAssetPage.openAddAssetForm());

          case 3:
            _context6.next = 5;
            return regeneratorRuntime.awrap(infrastructureAssetPage.fillInfrastructureAsset({
              assetType: "Laptop",
              location: "Kochi",
              status: "Deployed",
              purchaseAmount: "50000",
              purchaseDate: "2026-09-18",
              model: "Dell Latitude 5550",
              processor: "Intel Core i7",
              ram: "32 GB",
              storage: "1 TB SSD",
              operatingSystem: "Windows 11 Pro",
              remarks: "Automation test infrastructure asset"
            }));

          case 5:
            _context6.next = 7;
            return regeneratorRuntime.awrap(infrastructureAssetPage.getGeneratedAssetCode());

          case 7:
            assetCode = _context6.sent;
            expect(assetCode).toBeTruthy();
            _context6.next = 11;
            return regeneratorRuntime.awrap(infrastructureAssetPage.addInfrastructureAsset());

          case 11:
            _context6.next = 13;
            return regeneratorRuntime.awrap(infrastructureAssetPage.verifyAssetInTable(assetCode, ["Laptop", "Kochi", "Deployed"]));

          case 13:
          case "end":
            return _context6.stop();
        }
      }
    });
  });
});