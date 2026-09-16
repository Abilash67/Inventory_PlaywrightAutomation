"use strict";

var _require = require("../../fixtures/appFixtures"),
    test = _require.test,
    expect = _require.expect;

test.describe("Inventory - Technical Assets", function () {
  test.beforeEach(function _callee(_ref) {
    var page, inventoryPage;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            page = _ref.page, inventoryPage = _ref.inventoryPage;
            _context.next = 3;
            return regeneratorRuntime.awrap(page["goto"]("/"));

          case 3:
            _context.next = 5;
            return regeneratorRuntime.awrap(inventoryPage.navigateToInventory());

          case 5:
            _context.next = 7;
            return regeneratorRuntime.awrap(expect(page).toHaveURL(/\/inventory/));

          case 7:
            _context.next = 9;
            return regeneratorRuntime.awrap(inventoryPage.openTechnicalAssets());

          case 9:
          case "end":
            return _context.stop();
        }
      }
    });
  });
  test("displays the Technical Assets table", function _callee2(_ref2) {
    var page, technicalAssetPage;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            page = _ref2.page, technicalAssetPage = _ref2.technicalAssetPage;
            _context2.next = 3;
            return regeneratorRuntime.awrap(technicalAssetPage.verifyTechnicalAssetTable());

          case 3:
            _context2.next = 5;
            return regeneratorRuntime.awrap(expect(technicalAssetPage.pageIndicator).toBeVisible());

          case 5:
            _context2.next = 7;
            return regeneratorRuntime.awrap(expect(technicalAssetPage.searchInput).toBeVisible());

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
  test("filters assets by type, status, location, and searches inventory", function _callee3(_ref3) {
    var page, technicalAssetPage;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            page = _ref3.page, technicalAssetPage = _ref3.technicalAssetPage;
            _context3.next = 3;
            return regeneratorRuntime.awrap(technicalAssetPage.filterByAssetType("Desktop"));

          case 3:
            _context3.next = 5;
            return regeneratorRuntime.awrap(technicalAssetPage.filterByStatus("Available"));

          case 5:
            _context3.next = 7;
            return regeneratorRuntime.awrap(technicalAssetPage.filterByLocation("Kochi"));

          case 7:
            _context3.next = 9;
            return regeneratorRuntime.awrap(expect(technicalAssetPage.rows().first()).toContainText("Desktop"));

          case 9:
            _context3.next = 11;
            return regeneratorRuntime.awrap(expect(technicalAssetPage.rows().first()).toContainText("Kochi"));

          case 11:
            _context3.next = 13;
            return regeneratorRuntime.awrap(expect(technicalAssetPage.rows().first()).toContainText("Available"));

          case 13:
            _context3.next = 15;
            return regeneratorRuntime.awrap(technicalAssetPage.searchAsset("TV-DT-6863"));

          case 15:
            _context3.next = 17;
            return regeneratorRuntime.awrap(expect(technicalAssetPage.rows()).toHaveCount(1));

          case 17:
            _context3.next = 19;
            return regeneratorRuntime.awrap(expect(technicalAssetPage.rows().first()).toContainText("TV-DT-6863"));

          case 19:
            _context3.next = 21;
            return regeneratorRuntime.awrap(technicalAssetPage.clearSearch());

          case 21:
          case "end":
            return _context3.stop();
        }
      }
    });
  });
  test("moves between asset pages", function _callee4(_ref4) {
    var page, technicalAssetPage;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            page = _ref4.page, technicalAssetPage = _ref4.technicalAssetPage;
            _context4.next = 3;
            return regeneratorRuntime.awrap(expect(technicalAssetPage.previousButton).toBeDisabled());

          case 3:
            _context4.next = 5;
            return regeneratorRuntime.awrap(technicalAssetPage.clickNextPage());

          case 5:
            _context4.next = 7;
            return regeneratorRuntime.awrap(expect(technicalAssetPage.previousButton).toBeEnabled());

          case 7:
            _context4.next = 9;
            return regeneratorRuntime.awrap(expect(technicalAssetPage.pageIndicator).toContainText("Page 2"));

          case 9:
            _context4.next = 11;
            return regeneratorRuntime.awrap(technicalAssetPage.clickPreviousPage());

          case 11:
            _context4.next = 13;
            return regeneratorRuntime.awrap(expect(technicalAssetPage.previousButton).toBeDisabled());

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    });
  });
  test("opens asset details, edit form, and history", function _callee5(_ref5) {
    var page, technicalAssetPage, assetCode;
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            page = _ref5.page, technicalAssetPage = _ref5.technicalAssetPage;
            assetCode = "TV-DT-6863";
            _context5.next = 4;
            return regeneratorRuntime.awrap(technicalAssetPage.viewAsset(assetCode));

          case 4:
            _context5.next = 6;
            return regeneratorRuntime.awrap(technicalAssetPage.verifyAssetDetails(assetCode));

          case 6:
            _context5.next = 8;
            return regeneratorRuntime.awrap(technicalAssetPage.closeDialog());

          case 8:
            _context5.next = 10;
            return regeneratorRuntime.awrap(technicalAssetPage.editAsset(assetCode));

          case 10:
            _context5.next = 12;
            return regeneratorRuntime.awrap(technicalAssetPage.verifyAssetFormFields({
              edit: true
            }));

          case 12:
            _context5.next = 14;
            return regeneratorRuntime.awrap(expect(page.getByRole("dialog").getByRole("button", {
              name: "Save"
            })).toBeVisible());

          case 14:
            _context5.next = 16;
            return regeneratorRuntime.awrap(page.getByRole("dialog").getByRole("button", {
              name: "Cancel"
            }).click());

          case 16:
            _context5.next = 18;
            return regeneratorRuntime.awrap(technicalAssetPage.viewAssetHistory(assetCode));

          case 18:
            _context5.next = 20;
            return regeneratorRuntime.awrap(technicalAssetPage.verifyHistory());

          case 20:
            _context5.next = 22;
            return regeneratorRuntime.awrap(expect(page.getByRole("dialog")).toContainText("Asset added to inventory"));

          case 22:
          case "end":
            return _context5.stop();
        }
      }
    });
  });
  test("opens the add asset form with all supported fields", function _callee6(_ref6) {
    var technicalAssetPage;
    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            technicalAssetPage = _ref6.technicalAssetPage;
            _context6.next = 3;
            return regeneratorRuntime.awrap(technicalAssetPage.openAddAssetForm());

          case 3:
            _context6.next = 5;
            return regeneratorRuntime.awrap(technicalAssetPage.verifyAssetFormFields());

          case 5:
            _context6.next = 7;
            return regeneratorRuntime.awrap(technicalAssetPage.cancelDialog());

          case 7:
          case "end":
            return _context6.stop();
        }
      }
    });
  });
  test("verifies the bulk upload template link and accepts an Excel file", function _callee7(_ref7) {
    var technicalAssetPage, downloadLink, href;
    return regeneratorRuntime.async(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            technicalAssetPage = _ref7.technicalAssetPage;
            _context7.next = 3;
            return regeneratorRuntime.awrap(technicalAssetPage.openBulkUploadForm());

          case 3:
            downloadLink = technicalAssetPage.dialog().getByRole("link", {
              name: /Download Sample Template/
            });
            _context7.next = 6;
            return regeneratorRuntime.awrap(expect(downloadLink).toBeVisible());

          case 6:
            _context7.next = 8;
            return regeneratorRuntime.awrap(expect(downloadLink).toHaveAttribute("href", /addAssets\.xlsx/));

          case 8:
            _context7.next = 10;
            return regeneratorRuntime.awrap(technicalAssetPage.downloadBulkUploadTemplate());

          case 10:
            href = _context7.sent;
            expect(href).toBe("/assets/addAssets.xlsx");
            _context7.next = 14;
            return regeneratorRuntime.awrap(technicalAssetPage.chooseBulkUploadFile({
              name: "technical-assets.xlsx",
              mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
              buffer: Buffer.from("technical asset upload test")
            }));

          case 14:
            _context7.next = 16;
            return regeneratorRuntime.awrap(expect(technicalAssetPage.dialog().getByRole("button", {
              name: "Upload"
            })).toBeEnabled());

          case 16:
            _context7.next = 18;
            return regeneratorRuntime.awrap(technicalAssetPage.cancelDialog());

          case 18:
          case "end":
            return _context7.stop();
        }
      }
    });
  });
});