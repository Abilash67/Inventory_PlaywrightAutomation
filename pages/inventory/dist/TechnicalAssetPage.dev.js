"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require("@playwright/test"),
    expect = _require.expect;

var TechnicalAssetPage =
/*#__PURE__*/
function () {
  function TechnicalAssetPage(page) {
    _classCallCheck(this, TechnicalAssetPage);

    this.page = page;
    this.technicalTab = page.getByRole("tabpanel", {
      name: "Technical Assets"
    });
    this.assetTypeFilter = this.technicalTab.getByText("Select Asset Type", {
      exact: true
    });
    this.statusFilter = this.technicalTab.getByText("Select Status", {
      exact: true
    }).first();
    this.locationFilter = this.technicalTab.getByText("Select Location", {
      exact: true
    });
    this.searchInput = this.technicalTab.getByPlaceholder(/Search Inventory/);
    this.assetTable = this.technicalTab.locator("table");
    this.previousButton = this.technicalTab.getByRole("button", {
      name: "Prev"
    });
    this.nextButton = this.technicalTab.getByRole("button", {
      name: "Next"
    });
    this.pageIndicator = this.technicalTab.getByText(/Page \d+ of \d+/);
    this.addAssetToggle = this.technicalTab.getByRole("button", {
      name: /Add Asset/
    });
    this.addAssetMenuItem = this.page.getByRole("button", {
      name: "Add Asset",
      exact: true
    });
    this.bulkUploadMenuItem = this.page.getByRole("button", {
      name: "Bulk Upload Assets",
      exact: true
    });
    this.pageButtons = this.technicalTab.getByRole("button", {
      name: /^\d+$/
    });
    this.rowsPerPageSelect = this.technicalTab.locator("select").last();
  }

  _createClass(TechnicalAssetPage, [{
    key: "searchAsset",
    value: function searchAsset(searchText) {
      return regeneratorRuntime.async(function searchAsset$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(this.searchInput.fill(searchText));

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "clearSearch",
    value: function clearSearch() {
      return regeneratorRuntime.async(function clearSearch$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(this.searchInput.clear());

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "clickNextPage",
    value: function clickNextPage() {
      return regeneratorRuntime.async(function clickNextPage$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(this.nextButton.click());

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "clickPreviousPage",
    value: function clickPreviousPage() {
      return regeneratorRuntime.async(function clickPreviousPage$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(this.previousButton.click());

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "goToPage",
    value: function goToPage(pageNumber) {
      return regeneratorRuntime.async(function goToPage$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(this.technicalTab.getByRole("button", {
                name: String(pageNumber),
                exact: true
              }).click());

            case 2:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "selectRowsPerPage",
    value: function selectRowsPerPage(value) {
      return regeneratorRuntime.async(function selectRowsPerPage$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(this.rowsPerPageSelect.selectOption(String(value)));

            case 2:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "selectFilterOption",
    value: function selectFilterOption(filter, option) {
      var checkbox;
      return regeneratorRuntime.async(function selectFilterOption$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(filter.click());

            case 2:
              checkbox = this.page.getByRole("checkbox", {
                name: option,
                exact: true
              });
              _context7.next = 5;
              return regeneratorRuntime.awrap(checkbox.check());

            case 5:
              _context7.next = 7;
              return regeneratorRuntime.awrap(expect(checkbox).toBeChecked());

            case 7:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "selectedFilterValue",
    value: function selectedFilterValue(label) {
      return this.technicalTab.locator("strong").filter({
        hasText: label
      }).locator("..");
    }
  }, {
    key: "filterByAssetType",
    value: function filterByAssetType(assetType) {
      return regeneratorRuntime.async(function filterByAssetType$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return regeneratorRuntime.awrap(this.selectFilterOption(this.assetTypeFilter, assetType));

            case 2:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "filterByStatus",
    value: function filterByStatus(status) {
      return regeneratorRuntime.async(function filterByStatus$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return regeneratorRuntime.awrap(this.selectFilterOption(this.statusFilter, status));

            case 2:
            case "end":
              return _context9.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "filterByLocation",
    value: function filterByLocation(location) {
      return regeneratorRuntime.async(function filterByLocation$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return regeneratorRuntime.awrap(this.selectFilterOption(this.locationFilter, location));

            case 2:
            case "end":
              return _context10.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "openAddAssetForm",
    value: function openAddAssetForm() {
      return regeneratorRuntime.async(function openAddAssetForm$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return regeneratorRuntime.awrap(this.addAssetToggle.click());

            case 2:
              _context11.next = 4;
              return regeneratorRuntime.awrap(this.addAssetMenuItem.click());

            case 4:
              _context11.next = 6;
              return regeneratorRuntime.awrap(expect(this.dialog()).toContainText("Add New Asset"));

            case 6:
            case "end":
              return _context11.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "openBulkUploadForm",
    value: function openBulkUploadForm() {
      return regeneratorRuntime.async(function openBulkUploadForm$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return regeneratorRuntime.awrap(this.addAssetToggle.click());

            case 2:
              _context12.next = 4;
              return regeneratorRuntime.awrap(this.bulkUploadMenuItem.click());

            case 4:
              _context12.next = 6;
              return regeneratorRuntime.awrap(expect(this.dialog()).toContainText("Bulk Upload Assets"));

            case 6:
            case "end":
              return _context12.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "dialog",
    value: function dialog() {
      return this.page.getByRole("dialog");
    }
  }, {
    key: "formSelect",
    value: function formSelect(index) {
      return this.dialog().locator("select").nth(index);
    }
  }, {
    key: "assetTypeSelect",
    value: function assetTypeSelect() {
      return this.formSelect(0);
    }
  }, {
    key: "locationSelect",
    value: function locationSelect() {
      return this.formSelect(1);
    }
  }, {
    key: "statusSelect",
    value: function statusSelect() {
      return this.formSelect(2);
    }
  }, {
    key: "verifyAssetFormFields",
    value: function verifyAssetFormFields() {
      var _ref,
          _ref$edit,
          edit,
          expectedTitle,
          _args13 = arguments;

      return regeneratorRuntime.async(function verifyAssetFormFields$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _ref = _args13.length > 0 && _args13[0] !== undefined ? _args13[0] : {}, _ref$edit = _ref.edit, edit = _ref$edit === void 0 ? false : _ref$edit;
              expectedTitle = edit ? "Edit Asset" : "Add New Asset";
              _context13.next = 4;
              return regeneratorRuntime.awrap(expect(this.dialog()).toContainText(expectedTitle));

            case 4:
              _context13.next = 6;
              return regeneratorRuntime.awrap(expect(this.formSelect(0)).toBeVisible());

            case 6:
              _context13.next = 8;
              return regeneratorRuntime.awrap(expect(this.dialog().getByPlaceholder("Auto-generated")).toBeVisible());

            case 8:
              _context13.next = 10;
              return regeneratorRuntime.awrap(expect(this.dialog().getByPlaceholder("Enter Model Name")).toBeVisible());

            case 10:
              _context13.next = 12;
              return regeneratorRuntime.awrap(expect(this.dialog().getByPlaceholder("Enter Storage")).toBeVisible());

            case 12:
              _context13.next = 14;
              return regeneratorRuntime.awrap(expect(this.dialog().getByPlaceholder("Enter OS")).toBeVisible());

            case 14:
              _context13.next = 16;
              return regeneratorRuntime.awrap(expect(this.dialog().getByPlaceholder("Enter RAM size")).toBeVisible());

            case 16:
              _context13.next = 18;
              return regeneratorRuntime.awrap(expect(this.dialog().getByPlaceholder("Enter Processor Details")).toBeVisible());

            case 18:
              _context13.next = 20;
              return regeneratorRuntime.awrap(expect(this.dialog().getByPlaceholder("Enter Purchase Amount")).toBeVisible());

            case 20:
              _context13.next = 22;
              return regeneratorRuntime.awrap(expect(this.dialog().locator('input[type="date"]')).toBeVisible());

            case 22:
              _context13.next = 24;
              return regeneratorRuntime.awrap(expect(this.formSelect(1)).toBeVisible());

            case 24:
              _context13.next = 26;
              return regeneratorRuntime.awrap(expect(this.formSelect(2)).toBeVisible());

            case 26:
              _context13.next = 28;
              return regeneratorRuntime.awrap(expect(this.dialog().getByPlaceholder("Additional notes about the asset")).toBeVisible());

            case 28:
            case "end":
              return _context13.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "saveButton",
    value: function saveButton() {
      return this.dialog().getByRole("button", {
        name: "Save",
        exact: true
      });
    }
  }, {
    key: "addButton",
    value: function addButton() {
      return this.dialog().getByRole("button", {
        name: "Add",
        exact: true
      });
    }
  }, {
    key: "cancelButton",
    value: function cancelButton() {
      return this.dialog().getByRole("button", {
        name: "Cancel",
        exact: true
      });
    }
  }, {
    key: "modelInput",
    value: function modelInput() {
      return this.dialog().getByPlaceholder("Enter Model Name");
    }
  }, {
    key: "storageInput",
    value: function storageInput() {
      return this.dialog().getByPlaceholder("Enter Storage");
    }
  }, {
    key: "osInput",
    value: function osInput() {
      return this.dialog().getByPlaceholder("Enter OS");
    }
  }, {
    key: "ramInput",
    value: function ramInput() {
      return this.dialog().getByPlaceholder("Enter RAM size");
    }
  }, {
    key: "processorInput",
    value: function processorInput() {
      return this.dialog().getByPlaceholder("Enter Processor Details");
    }
  }, {
    key: "purchaseAmountInput",
    value: function purchaseAmountInput() {
      return this.dialog().getByPlaceholder("Enter Purchase Amount");
    }
  }, {
    key: "purchaseDateInput",
    value: function purchaseDateInput() {
      return this.dialog().locator('input[type="date"]');
    }
  }, {
    key: "assetCodeInput",
    value: function assetCodeInput() {
      return this.dialog().getByPlaceholder("Auto-generated");
    }
  }, {
    key: "remarksInput",
    value: function remarksInput() {
      return this.dialog().getByPlaceholder("Additional notes about the asset");
    }
  }, {
    key: "fillValidAssetData",
    value: function fillValidAssetData(_ref2) {
      var assetType, model, storage, os, ram, processor, purchaseAmount, purchaseDate, location, status, remarks;
      return regeneratorRuntime.async(function fillValidAssetData$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              assetType = _ref2.assetType, model = _ref2.model, storage = _ref2.storage, os = _ref2.os, ram = _ref2.ram, processor = _ref2.processor, purchaseAmount = _ref2.purchaseAmount, purchaseDate = _ref2.purchaseDate, location = _ref2.location, status = _ref2.status, remarks = _ref2.remarks;
              _context14.next = 3;
              return regeneratorRuntime.awrap(this.assetTypeSelect().selectOption({
                label: assetType
              }));

            case 3:
              _context14.next = 5;
              return regeneratorRuntime.awrap(this.modelInput().fill(model));

            case 5:
              _context14.next = 7;
              return regeneratorRuntime.awrap(this.storageInput().fill(storage));

            case 7:
              _context14.next = 9;
              return regeneratorRuntime.awrap(this.osInput().fill(os));

            case 9:
              _context14.next = 11;
              return regeneratorRuntime.awrap(this.ramInput().fill(ram));

            case 11:
              _context14.next = 13;
              return regeneratorRuntime.awrap(this.processorInput().fill(processor));

            case 13:
              _context14.next = 15;
              return regeneratorRuntime.awrap(this.purchaseAmountInput().fill(String(purchaseAmount)));

            case 15:
              _context14.next = 17;
              return regeneratorRuntime.awrap(this.purchaseDateInput().fill(purchaseDate));

            case 17:
              _context14.next = 19;
              return regeneratorRuntime.awrap(this.locationSelect().selectOption({
                label: location
              }));

            case 19:
              _context14.next = 21;
              return regeneratorRuntime.awrap(this.statusSelect().selectOption({
                label: status
              }));

            case 21:
              _context14.next = 23;
              return regeneratorRuntime.awrap(this.remarksInput().fill(remarks));

            case 23:
            case "end":
              return _context14.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "cancelDialog",
    value: function cancelDialog() {
      return regeneratorRuntime.async(function cancelDialog$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _context15.next = 2;
              return regeneratorRuntime.awrap(this.cancelButton().click());

            case 2:
              _context15.next = 4;
              return regeneratorRuntime.awrap(expect(this.dialog()).toBeHidden());

            case 4:
            case "end":
              return _context15.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "clickSave",
    value: function clickSave() {
      return regeneratorRuntime.async(function clickSave$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _context16.next = 2;
              return regeneratorRuntime.awrap(this.saveButton().click());

            case 2:
            case "end":
              return _context16.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "clickAdd",
    value: function clickAdd() {
      return regeneratorRuntime.async(function clickAdd$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              _context17.next = 2;
              return regeneratorRuntime.awrap(this.addButton().click());

            case 2:
            case "end":
              return _context17.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "clearRequiredEditField",
    value: function clearRequiredEditField() {
      return regeneratorRuntime.async(function clearRequiredEditField$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              _context18.next = 2;
              return regeneratorRuntime.awrap(this.modelInput().clear());

            case 2:
            case "end":
              return _context18.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "clearRequiredAddFields",
    value: function clearRequiredAddFields() {
      return regeneratorRuntime.async(function clearRequiredAddFields$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              _context19.next = 2;
              return regeneratorRuntime.awrap(this.modelInput().clear());

            case 2:
            case "end":
              return _context19.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "enterNegativePurchaseAmount",
    value: function enterNegativePurchaseAmount() {
      return regeneratorRuntime.async(function enterNegativePurchaseAmount$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              _context20.next = 2;
              return regeneratorRuntime.awrap(this.purchaseAmountInput().fill("-1"));

            case 2:
            case "end":
              return _context20.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "enterFuturePurchaseDate",
    value: function enterFuturePurchaseDate() {
      var futureDate, year, month, day;
      return regeneratorRuntime.async(function enterFuturePurchaseDate$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              futureDate = new Date();
              futureDate.setDate(futureDate.getDate() + 30);
              year = futureDate.getFullYear();
              month = String(futureDate.getMonth() + 1).padStart(2, "0");
              day = String(futureDate.getDate()).padStart(2, "0");
              _context21.next = 7;
              return regeneratorRuntime.awrap(this.purchaseDateInput().fill("".concat(year, "-").concat(month, "-").concat(day)));

            case 7:
            case "end":
              return _context21.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "enterAssetDataForCancel",
    value: function enterAssetDataForCancel() {
      return regeneratorRuntime.async(function enterAssetDataForCancel$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              _context22.next = 2;
              return regeneratorRuntime.awrap(this.modelInput().fill("Cancel Test Asset"));

            case 2:
              _context22.next = 4;
              return regeneratorRuntime.awrap(this.storageInput().fill("500GB"));

            case 4:
            case "end":
              return _context22.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "verifyDialogRemainsOpen",
    value: function verifyDialogRemainsOpen() {
      return regeneratorRuntime.async(function verifyDialogRemainsOpen$(_context23) {
        while (1) {
          switch (_context23.prev = _context23.next) {
            case 0:
              _context23.next = 2;
              return regeneratorRuntime.awrap(expect(this.dialog()).toBeVisible());

            case 2:
            case "end":
              return _context23.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "verifyFieldInvalid",
    value: function verifyFieldInvalid(locator) {
      return regeneratorRuntime.async(function verifyFieldInvalid$(_context24) {
        while (1) {
          switch (_context24.prev = _context24.next) {
            case 0:
              return _context24.abrupt("return", locator.evaluate(function (element) {
                return element.matches(":invalid") || element.getAttribute("aria-invalid") === "true";
              }));

            case 1:
            case "end":
              return _context24.stop();
          }
        }
      });
    }
  }, {
    key: "downloadBulkUploadTemplate",
    value: function downloadBulkUploadTemplate() {
      var downloadLink, href;
      return regeneratorRuntime.async(function downloadBulkUploadTemplate$(_context25) {
        while (1) {
          switch (_context25.prev = _context25.next) {
            case 0:
              downloadLink = this.dialog().getByRole("link", {
                name: /Download Sample Template/
              });
              _context25.next = 3;
              return regeneratorRuntime.awrap(expect(downloadLink).toBeVisible());

            case 3:
              _context25.next = 5;
              return regeneratorRuntime.awrap(downloadLink.getAttribute("href"));

            case 5:
              href = _context25.sent;
              expect(href).toBe("/assets/addAssets.xlsx");
              return _context25.abrupt("return", href);

            case 8:
            case "end":
              return _context25.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "chooseBulkUploadFile",
    value: function chooseBulkUploadFile(filePath) {
      return regeneratorRuntime.async(function chooseBulkUploadFile$(_context26) {
        while (1) {
          switch (_context26.prev = _context26.next) {
            case 0:
              _context26.next = 2;
              return regeneratorRuntime.awrap(this.dialog().locator('input[type="file"]').setInputFiles(filePath));

            case 2:
              _context26.next = 4;
              return regeneratorRuntime.awrap(expect(this.dialog().getByRole("button", {
                name: "Upload"
              })).toBeEnabled());

            case 4:
            case "end":
              return _context26.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "rows",
    value: function rows() {
      return this.assetTable.locator("tbody tr");
    }
  }, {
    key: "rowByAssetCode",
    value: function rowByAssetCode(assetCode) {
      return this.rows().filter({
        hasText: assetCode
      }).first();
    }
  }, {
    key: "viewAsset",
    value: function viewAsset(assetCode) {
      return regeneratorRuntime.async(function viewAsset$(_context27) {
        while (1) {
          switch (_context27.prev = _context27.next) {
            case 0:
              _context27.next = 2;
              return regeneratorRuntime.awrap(this.rowByAssetCode(assetCode).getByRole("button", {
                name: "View"
              }).click());

            case 2:
            case "end":
              return _context27.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "editAsset",
    value: function editAsset(assetCode) {
      return regeneratorRuntime.async(function editAsset$(_context28) {
        while (1) {
          switch (_context28.prev = _context28.next) {
            case 0:
              _context28.next = 2;
              return regeneratorRuntime.awrap(this.rowByAssetCode(assetCode).getByRole("button", {
                name: "Edit"
              }).click());

            case 2:
            case "end":
              return _context28.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "viewAssetHistory",
    value: function viewAssetHistory(assetCode) {
      return regeneratorRuntime.async(function viewAssetHistory$(_context29) {
        while (1) {
          switch (_context29.prev = _context29.next) {
            case 0:
              _context29.next = 2;
              return regeneratorRuntime.awrap(this.rowByAssetCode(assetCode).getByRole("button", {
                name: "History"
              }).click());

            case 2:
            case "end":
              return _context29.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "closeDialog",
    value: function closeDialog() {
      return regeneratorRuntime.async(function closeDialog$(_context30) {
        while (1) {
          switch (_context30.prev = _context30.next) {
            case 0:
              _context30.next = 2;
              return regeneratorRuntime.awrap(this.page.getByRole("dialog").getByRole("button", {
                name: "Close"
              }).first().click());

            case 2:
            case "end":
              return _context30.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "verifyTechnicalAssetTable",
    value: function verifyTechnicalAssetTable() {
      var _i, _arr, header;

      return regeneratorRuntime.async(function verifyTechnicalAssetTable$(_context31) {
        while (1) {
          switch (_context31.prev = _context31.next) {
            case 0:
              _context31.next = 2;
              return regeneratorRuntime.awrap(expect(this.technicalTab).toBeVisible());

            case 2:
              _context31.next = 4;
              return regeneratorRuntime.awrap(expect(this.assetTable).toBeVisible());

            case 4:
              _i = 0, _arr = ["Asset Code", "Asset Type", "Location", "Status", "Actions"];

            case 5:
              if (!(_i < _arr.length)) {
                _context31.next = 12;
                break;
              }

              header = _arr[_i];
              _context31.next = 9;
              return regeneratorRuntime.awrap(expect(this.assetTable.getByRole("columnheader", {
                name: new RegExp(header)
              })).toBeVisible());

            case 9:
              _i++;
              _context31.next = 5;
              break;

            case 12:
              _context31.next = 14;
              return regeneratorRuntime.awrap(expect(this.rows().first()).toBeVisible());

            case 14:
            case "end":
              return _context31.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "verifyAssetDetails",
    value: function verifyAssetDetails(assetCode) {
      var _i2, _arr2, field;

      return regeneratorRuntime.async(function verifyAssetDetails$(_context32) {
        while (1) {
          switch (_context32.prev = _context32.next) {
            case 0:
              _context32.next = 2;
              return regeneratorRuntime.awrap(expect(this.dialog()).toContainText("Asset Details"));

            case 2:
              _context32.next = 4;
              return regeneratorRuntime.awrap(expect(this.dialog()).toContainText(assetCode));

            case 4:
              _i2 = 0, _arr2 = ["Asset Code", "Asset Type", "Environment", "Data Classification", "Model", "Storage", "Operating System", "RAM", "Processor", "Price", "Purchase Date", "Status", "Remarks", "Location"];

            case 5:
              if (!(_i2 < _arr2.length)) {
                _context32.next = 12;
                break;
              }

              field = _arr2[_i2];
              _context32.next = 9;
              return regeneratorRuntime.awrap(expect(this.dialog()).toContainText(field));

            case 9:
              _i2++;
              _context32.next = 5;
              break;

            case 12:
            case "end":
              return _context32.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "verifyHistory",
    value: function verifyHistory() {
      return regeneratorRuntime.async(function verifyHistory$(_context33) {
        while (1) {
          switch (_context33.prev = _context33.next) {
            case 0:
              _context33.next = 2;
              return regeneratorRuntime.awrap(expect(this.dialog()).toContainText("Asset History"));

            case 2:
              _context33.next = 4;
              return regeneratorRuntime.awrap(expect(this.dialog().getByRole("list")).toBeVisible());

            case 4:
            case "end":
              return _context33.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "verifyAssetRow",
    value: function verifyAssetRow(assetCode, expectedData) {
      var row, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, value;

      return regeneratorRuntime.async(function verifyAssetRow$(_context34) {
        while (1) {
          switch (_context34.prev = _context34.next) {
            case 0:
              row = this.rowByAssetCode(assetCode);
              _context34.next = 3;
              return regeneratorRuntime.awrap(expect(row).toBeVisible());

            case 3:
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context34.prev = 6;
              _iterator = expectedData[Symbol.iterator]();

            case 8:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context34.next = 15;
                break;
              }

              value = _step.value;
              _context34.next = 12;
              return regeneratorRuntime.awrap(expect(row).toContainText(String(value)));

            case 12:
              _iteratorNormalCompletion = true;
              _context34.next = 8;
              break;

            case 15:
              _context34.next = 21;
              break;

            case 17:
              _context34.prev = 17;
              _context34.t0 = _context34["catch"](6);
              _didIteratorError = true;
              _iteratorError = _context34.t0;

            case 21:
              _context34.prev = 21;
              _context34.prev = 22;

              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }

            case 24:
              _context34.prev = 24;

              if (!_didIteratorError) {
                _context34.next = 27;
                break;
              }

              throw _iteratorError;

            case 27:
              return _context34.finish(24);

            case 28:
              return _context34.finish(21);

            case 29:
            case "end":
              return _context34.stop();
          }
        }
      }, null, this, [[6, 17, 21, 29], [22,, 24, 28]]);
    }
  }]);

  return TechnicalAssetPage;
}();

module.exports = {
  TechnicalAssetPage: TechnicalAssetPage
};