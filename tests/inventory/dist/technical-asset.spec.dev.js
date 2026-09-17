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
    var technicalAssetPage;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            technicalAssetPage = _ref2.technicalAssetPage;
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
  test("applies multiple filters simultaneously", function _callee3(_ref3) {
    var technicalAssetPage, rows, rowCount, i, row;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            technicalAssetPage = _ref3.technicalAssetPage;
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
            return regeneratorRuntime.awrap(expect(technicalAssetPage.selectedFilterValue("Selected Asset Type:")).toContainText("Desktop"));

          case 9:
            _context3.next = 11;
            return regeneratorRuntime.awrap(expect(technicalAssetPage.selectedFilterValue("Selected Status:")).toContainText("Available"));

          case 11:
            _context3.next = 13;
            return regeneratorRuntime.awrap(expect(technicalAssetPage.selectedFilterValue("Selected Location:")).toContainText("Kochi"));

          case 13:
            rows = technicalAssetPage.rows();
            _context3.next = 16;
            return regeneratorRuntime.awrap(expect(rows.first()).toBeVisible());

          case 16:
            _context3.next = 18;
            return regeneratorRuntime.awrap(rows.count());

          case 18:
            rowCount = _context3.sent;
            expect(rowCount).toBeGreaterThan(0);
            i = 0;

          case 21:
            if (!(i < rowCount)) {
              _context3.next = 32;
              break;
            }

            row = rows.nth(i);
            _context3.next = 25;
            return regeneratorRuntime.awrap(expect(row).toContainText("Desktop"));

          case 25:
            _context3.next = 27;
            return regeneratorRuntime.awrap(expect(row).toContainText("Available"));

          case 27:
            _context3.next = 29;
            return regeneratorRuntime.awrap(expect(row).toContainText("Kochi"));

          case 29:
            i++;
            _context3.next = 21;
            break;

          case 32:
          case "end":
            return _context3.stop();
        }
      }
    });
  });
  test("displays no results for a non-matching search", function _callee4(_ref4) {
    var technicalAssetPage;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            technicalAssetPage = _ref4.technicalAssetPage;
            _context4.next = 3;
            return regeneratorRuntime.awrap(technicalAssetPage.searchAsset("NON_EXISTING_ASSET_99999"));

          case 3:
            _context4.next = 5;
            return regeneratorRuntime.awrap(expect(technicalAssetPage.technicalTab.getByText("No records found.", {
              exact: true
            })).toBeVisible());

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    });
  });
  test("clears search and restores the table", function _callee5(_ref5) {
    var technicalAssetPage, initialRows, restoredRows;
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            technicalAssetPage = _ref5.technicalAssetPage;
            _context5.next = 3;
            return regeneratorRuntime.awrap(technicalAssetPage.rows().count());

          case 3:
            initialRows = _context5.sent;
            _context5.next = 6;
            return regeneratorRuntime.awrap(technicalAssetPage.searchAsset("TV-DT-6863"));

          case 6:
            _context5.next = 8;
            return regeneratorRuntime.awrap(expect(technicalAssetPage.rows()).toHaveCount(1));

          case 8:
            _context5.next = 10;
            return regeneratorRuntime.awrap(technicalAssetPage.clearSearch());

          case 10:
            _context5.next = 12;
            return regeneratorRuntime.awrap(expect(technicalAssetPage.rows().first()).toBeVisible());

          case 12:
            _context5.next = 14;
            return regeneratorRuntime.awrap(technicalAssetPage.rows().count());

          case 14:
            restoredRows = _context5.sent;
            expect(restoredRows).toBe(initialRows);

          case 16:
          case "end":
            return _context5.stop();
        }
      }
    });
  });
  test("changes rows per page", function _callee6(_ref6) {
    var technicalAssetPage, rowsPerPage, currentValue, options, newValue, visibleRows;
    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            technicalAssetPage = _ref6.technicalAssetPage;
            rowsPerPage = technicalAssetPage.rowsPerPageSelect;
            _context6.next = 4;
            return regeneratorRuntime.awrap(expect(rowsPerPage).toBeVisible());

          case 4:
            _context6.next = 6;
            return regeneratorRuntime.awrap(rowsPerPage.inputValue());

          case 6:
            currentValue = _context6.sent;
            _context6.next = 9;
            return regeneratorRuntime.awrap(rowsPerPage.locator("option").evaluateAll(function (options) {
              return options.map(function (option) {
                return option.value;
              });
            }));

          case 9:
            options = _context6.sent;
            newValue = options.find(function (value) {
              return value !== currentValue;
            });
            expect(newValue).toBeTruthy();
            _context6.next = 14;
            return regeneratorRuntime.awrap(technicalAssetPage.selectRowsPerPage(newValue));

          case 14:
            _context6.next = 16;
            return regeneratorRuntime.awrap(expect(rowsPerPage).toHaveValue(newValue));

          case 16:
            _context6.next = 18;
            return regeneratorRuntime.awrap(technicalAssetPage.rows().count());

          case 18:
            visibleRows = _context6.sent;
            expect(visibleRows).toBeGreaterThan(0);
            expect(visibleRows).toBeLessThanOrEqual(Number(newValue));

          case 21:
          case "end":
            return _context6.stop();
        }
      }
    });
  });
  test("moves between asset pages using Previous and Next", function _callee7(_ref7) {
    var technicalAssetPage;
    return regeneratorRuntime.async(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            technicalAssetPage = _ref7.technicalAssetPage;
            _context7.next = 3;
            return regeneratorRuntime.awrap(expect(technicalAssetPage.previousButton).toBeDisabled());

          case 3:
            _context7.next = 5;
            return regeneratorRuntime.awrap(technicalAssetPage.clickNextPage());

          case 5:
            _context7.next = 7;
            return regeneratorRuntime.awrap(expect(technicalAssetPage.previousButton).toBeEnabled());

          case 7:
            _context7.next = 9;
            return regeneratorRuntime.awrap(expect(technicalAssetPage.pageIndicator).toContainText("Page 2"));

          case 9:
            _context7.next = 11;
            return regeneratorRuntime.awrap(technicalAssetPage.clickPreviousPage());

          case 11:
            _context7.next = 13;
            return regeneratorRuntime.awrap(expect(technicalAssetPage.previousButton).toBeDisabled());

          case 13:
            _context7.next = 15;
            return regeneratorRuntime.awrap(expect(technicalAssetPage.pageIndicator).toContainText("Page 1"));

          case 15:
          case "end":
            return _context7.stop();
        }
      }
    });
  });
  test("opens asset details, edit form, and history", function _callee8(_ref8) {
    var page, technicalAssetPage, assetCode;
    return regeneratorRuntime.async(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            page = _ref8.page, technicalAssetPage = _ref8.technicalAssetPage;
            assetCode = "TV-DT-6863";
            _context8.next = 4;
            return regeneratorRuntime.awrap(technicalAssetPage.viewAsset(assetCode));

          case 4:
            _context8.next = 6;
            return regeneratorRuntime.awrap(technicalAssetPage.verifyAssetDetails(assetCode));

          case 6:
            _context8.next = 8;
            return regeneratorRuntime.awrap(technicalAssetPage.closeDialog());

          case 8:
            _context8.next = 10;
            return regeneratorRuntime.awrap(technicalAssetPage.editAsset(assetCode));

          case 10:
            _context8.next = 12;
            return regeneratorRuntime.awrap(technicalAssetPage.verifyAssetFormFields({
              edit: true
            }));

          case 12:
            _context8.next = 14;
            return regeneratorRuntime.awrap(expect(page.getByRole("dialog").getByRole("button", {
              name: "Save",
              exact: true
            })).toBeVisible());

          case 14:
            _context8.next = 16;
            return regeneratorRuntime.awrap(page.getByRole("dialog").getByRole("button", {
              name: "Cancel",
              exact: true
            }).click());

          case 16:
            _context8.next = 18;
            return regeneratorRuntime.awrap(technicalAssetPage.viewAssetHistory(assetCode));

          case 18:
            _context8.next = 20;
            return regeneratorRuntime.awrap(technicalAssetPage.verifyHistory());

          case 20:
            _context8.next = 22;
            return regeneratorRuntime.awrap(expect(page.getByRole("dialog")).toContainText("Asset added to inventory"));

          case 22:
          case "end":
            return _context8.stop();
        }
      }
    });
  });
  test("opens the add asset form with all supported fields", function _callee9(_ref9) {
    var technicalAssetPage;
    return regeneratorRuntime.async(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            technicalAssetPage = _ref9.technicalAssetPage;
            _context9.next = 3;
            return regeneratorRuntime.awrap(technicalAssetPage.openAddAssetForm());

          case 3:
            _context9.next = 5;
            return regeneratorRuntime.awrap(technicalAssetPage.verifyAssetFormFields());

          case 5:
            _context9.next = 7;
            return regeneratorRuntime.awrap(technicalAssetPage.cancelDialog());

          case 7:
            _context9.next = 9;
            return regeneratorRuntime.awrap(expect(technicalAssetPage.dialog()).toBeHidden());

          case 9:
          case "end":
            return _context9.stop();
        }
      }
    });
  });
  test("validates required field during Edit", function _callee10(_ref10) {
    var technicalAssetPage, assetCode;
    return regeneratorRuntime.async(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            technicalAssetPage = _ref10.technicalAssetPage;
            assetCode = "TV-DT-6863";
            _context10.next = 4;
            return regeneratorRuntime.awrap(technicalAssetPage.editAsset(assetCode));

          case 4:
            _context10.next = 6;
            return regeneratorRuntime.awrap(technicalAssetPage.verifyAssetFormFields({
              edit: true
            }));

          case 6:
            _context10.next = 8;
            return regeneratorRuntime.awrap(technicalAssetPage.clearRequiredEditField());

          case 8:
            _context10.next = 10;
            return regeneratorRuntime.awrap(technicalAssetPage.clickSave());

          case 10:
            _context10.next = 12;
            return regeneratorRuntime.awrap(technicalAssetPage.verifyDialogRemainsOpen());

          case 12:
            _context10.next = 14;
            return regeneratorRuntime.awrap(expect(technicalAssetPage.dialog()).toBeVisible());

          case 14:
          case "end":
            return _context10.stop();
        }
      }
    });
  });
  test("cancels Edit without saving", function _callee11(_ref11) {
    var technicalAssetPage, assetCode;
    return regeneratorRuntime.async(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            technicalAssetPage = _ref11.technicalAssetPage;
            assetCode = "TV-DT-6863";
            _context11.next = 4;
            return regeneratorRuntime.awrap(technicalAssetPage.editAsset(assetCode));

          case 4:
            _context11.next = 6;
            return regeneratorRuntime.awrap(technicalAssetPage.verifyAssetFormFields({
              edit: true
            }));

          case 6:
            _context11.next = 8;
            return regeneratorRuntime.awrap(technicalAssetPage.modelInput().fill("Temporary Edit Value"));

          case 8:
            _context11.next = 10;
            return regeneratorRuntime.awrap(technicalAssetPage.cancelDialog());

          case 10:
            _context11.next = 12;
            return regeneratorRuntime.awrap(expect(technicalAssetPage.dialog()).toBeHidden());

          case 12:
            _context11.next = 14;
            return regeneratorRuntime.awrap(expect(technicalAssetPage.rowByAssetCode(assetCode)).toBeVisible());

          case 14:
          case "end":
            return _context11.stop();
        }
      }
    });
  });
  test("validates required fields during Add Asset", function _callee12(_ref12) {
    var technicalAssetPage;
    return regeneratorRuntime.async(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            technicalAssetPage = _ref12.technicalAssetPage;
            _context12.next = 3;
            return regeneratorRuntime.awrap(technicalAssetPage.openAddAssetForm());

          case 3:
            _context12.next = 5;
            return regeneratorRuntime.awrap(technicalAssetPage.verifyAssetFormFields());

          case 5:
            _context12.next = 7;
            return regeneratorRuntime.awrap(technicalAssetPage.clearRequiredAddFields());

          case 7:
            _context12.next = 9;
            return regeneratorRuntime.awrap(technicalAssetPage.clickAdd());

          case 9:
            _context12.next = 11;
            return regeneratorRuntime.awrap(technicalAssetPage.verifyDialogRemainsOpen());

          case 11:
            _context12.next = 13;
            return regeneratorRuntime.awrap(expect(technicalAssetPage.dialog()).toBeVisible());

          case 13:
          case "end":
            return _context12.stop();
        }
      }
    });
  });
  test("validates negative Purchase Amount", function _callee13(_ref13) {
    var technicalAssetPage;
    return regeneratorRuntime.async(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            technicalAssetPage = _ref13.technicalAssetPage;
            _context13.next = 3;
            return regeneratorRuntime.awrap(technicalAssetPage.openAddAssetForm());

          case 3:
            _context13.next = 5;
            return regeneratorRuntime.awrap(technicalAssetPage.verifyAssetFormFields());

          case 5:
            _context13.next = 7;
            return regeneratorRuntime.awrap(technicalAssetPage.enterNegativePurchaseAmount());

          case 7:
            _context13.next = 9;
            return regeneratorRuntime.awrap(technicalAssetPage.clickAdd());

          case 9:
            _context13.next = 11;
            return regeneratorRuntime.awrap(technicalAssetPage.verifyDialogRemainsOpen());

          case 11:
            _context13.next = 13;
            return regeneratorRuntime.awrap(expect(technicalAssetPage.dialog()).toBeVisible());

          case 13:
          case "end":
            return _context13.stop();
        }
      }
    });
  });
  test("validates future Purchase Date", function _callee14(_ref14) {
    var technicalAssetPage;
    return regeneratorRuntime.async(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            technicalAssetPage = _ref14.technicalAssetPage;
            _context14.next = 3;
            return regeneratorRuntime.awrap(technicalAssetPage.openAddAssetForm());

          case 3:
            _context14.next = 5;
            return regeneratorRuntime.awrap(technicalAssetPage.verifyAssetFormFields());

          case 5:
            _context14.next = 7;
            return regeneratorRuntime.awrap(technicalAssetPage.enterFuturePurchaseDate());

          case 7:
            _context14.next = 9;
            return regeneratorRuntime.awrap(technicalAssetPage.clickAdd());

          case 9:
            _context14.next = 11;
            return regeneratorRuntime.awrap(technicalAssetPage.verifyDialogRemainsOpen());

          case 11:
            _context14.next = 13;
            return regeneratorRuntime.awrap(expect(technicalAssetPage.dialog()).toBeVisible());

          case 13:
          case "end":
            return _context14.stop();
        }
      }
    });
  });
  test("cancels Add Asset without saving", function _callee15(_ref15) {
    var technicalAssetPage;
    return regeneratorRuntime.async(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            technicalAssetPage = _ref15.technicalAssetPage;
            _context15.next = 3;
            return regeneratorRuntime.awrap(technicalAssetPage.openAddAssetForm());

          case 3:
            _context15.next = 5;
            return regeneratorRuntime.awrap(technicalAssetPage.verifyAssetFormFields());

          case 5:
            _context15.next = 7;
            return regeneratorRuntime.awrap(technicalAssetPage.enterAssetDataForCancel());

          case 7:
            _context15.next = 9;
            return regeneratorRuntime.awrap(technicalAssetPage.cancelDialog());

          case 9:
            _context15.next = 11;
            return regeneratorRuntime.awrap(expect(technicalAssetPage.dialog()).toBeHidden());

          case 11:
            _context15.next = 13;
            return regeneratorRuntime.awrap(expect(technicalAssetPage.rowByAssetCode("Cancel Test Asset")).toHaveCount(0));

          case 13:
          case "end":
            return _context15.stop();
        }
      }
    });
  });
  test("verifies the bulk upload template link and accepts an Excel file", function _callee16(_ref16) {
    var technicalAssetPage, downloadLink, href;
    return regeneratorRuntime.async(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            technicalAssetPage = _ref16.technicalAssetPage;
            _context16.next = 3;
            return regeneratorRuntime.awrap(technicalAssetPage.openBulkUploadForm());

          case 3:
            downloadLink = technicalAssetPage.dialog().getByRole("link", {
              name: /Download Sample Template/
            });
            _context16.next = 6;
            return regeneratorRuntime.awrap(expect(downloadLink).toBeVisible());

          case 6:
            _context16.next = 8;
            return regeneratorRuntime.awrap(expect(downloadLink).toHaveAttribute("href", /addAssets\.xlsx/));

          case 8:
            _context16.next = 10;
            return regeneratorRuntime.awrap(technicalAssetPage.downloadBulkUploadTemplate());

          case 10:
            href = _context16.sent;
            expect(href).toBe("/assets/addAssets.xlsx");
            _context16.next = 14;
            return regeneratorRuntime.awrap(technicalAssetPage.chooseBulkUploadFile({
              name: "technical-assets.xlsx",
              mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
              buffer: Buffer.from("technical asset upload test")
            }));

          case 14:
            _context16.next = 16;
            return regeneratorRuntime.awrap(expect(technicalAssetPage.dialog().getByRole("button", {
              name: "Upload",
              exact: true
            })).toBeEnabled());

          case 16:
            _context16.next = 18;
            return regeneratorRuntime.awrap(technicalAssetPage.cancelDialog());

          case 18:
            _context16.next = 20;
            return regeneratorRuntime.awrap(expect(technicalAssetPage.dialog()).toBeHidden());

          case 20:
          case "end":
            return _context16.stop();
        }
      }
    });
  });
});