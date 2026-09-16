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
    }); // Pagination controls

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
      var filterContainer, checkbox;
      return regeneratorRuntime.async(function selectFilterOption$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(filter.click());

            case 2:
              filterContainer = filter.locator("..");
              checkbox = filterContainer.getByRole("checkbox", {
                name: option,
                exact: true
              });
              _context7.next = 6;
              return regeneratorRuntime.awrap(checkbox.check());

            case 6:
              _context7.next = 8;
              return regeneratorRuntime.awrap(expect(checkbox).toBeChecked());

            case 8:
            case "end":
              return _context7.stop();
          }
        }
      });
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
              return regeneratorRuntime.awrap(expect(this.page.getByRole("dialog")).toContainText("Add New Asset"));

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
              return regeneratorRuntime.awrap(expect(this.page.getByRole("dialog")).toContainText("Bulk Upload Assets"));

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
    key: "cancelDialog",
    value: function cancelDialog() {
      return regeneratorRuntime.async(function cancelDialog$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              _context14.next = 2;
              return regeneratorRuntime.awrap(this.dialog().getByRole("button", {
                name: "Cancel"
              }).click());

            case 2:
            case "end":
              return _context14.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "downloadBulkUploadTemplate",
    value: function downloadBulkUploadTemplate() {
      var downloadLink, href;
      return regeneratorRuntime.async(function downloadBulkUploadTemplate$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              downloadLink = this.dialog().getByRole("link", {
                name: /Download Sample Template/
              });
              _context15.next = 3;
              return regeneratorRuntime.awrap(expect(downloadLink).toBeVisible());

            case 3:
              _context15.next = 5;
              return regeneratorRuntime.awrap(downloadLink.getAttribute("href"));

            case 5:
              href = _context15.sent;
              expect(href).toBe("/assets/addAssets.xlsx");
              return _context15.abrupt("return", href);

            case 8:
            case "end":
              return _context15.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "chooseBulkUploadFile",
    value: function chooseBulkUploadFile(filePath) {
      return regeneratorRuntime.async(function chooseBulkUploadFile$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _context16.next = 2;
              return regeneratorRuntime.awrap(this.dialog().locator('input[type="file"]').setInputFiles(filePath));

            case 2:
              _context16.next = 4;
              return regeneratorRuntime.awrap(expect(this.dialog().getByRole("button", {
                name: "Upload"
              })).toBeEnabled());

            case 4:
            case "end":
              return _context16.stop();
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
      return regeneratorRuntime.async(function viewAsset$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              _context17.next = 2;
              return regeneratorRuntime.awrap(this.rowByAssetCode(assetCode).getByRole("button", {
                name: "View"
              }).click());

            case 2:
            case "end":
              return _context17.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "editAsset",
    value: function editAsset(assetCode) {
      return regeneratorRuntime.async(function editAsset$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              _context18.next = 2;
              return regeneratorRuntime.awrap(this.rowByAssetCode(assetCode).getByRole("button", {
                name: "Edit"
              }).click());

            case 2:
            case "end":
              return _context18.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "viewAssetHistory",
    value: function viewAssetHistory(assetCode) {
      return regeneratorRuntime.async(function viewAssetHistory$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              _context19.next = 2;
              return regeneratorRuntime.awrap(this.rowByAssetCode(assetCode).getByRole("button", {
                name: "History"
              }).click());

            case 2:
            case "end":
              return _context19.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "closeDialog",
    value: function closeDialog() {
      return regeneratorRuntime.async(function closeDialog$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              _context20.next = 2;
              return regeneratorRuntime.awrap(this.page.getByRole("dialog").getByRole("button", {
                name: "Close"
              }).first().click());

            case 2:
            case "end":
              return _context20.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "verifyTechnicalAssetTable",
    value: function verifyTechnicalAssetTable() {
      var _i, _arr, header;

      return regeneratorRuntime.async(function verifyTechnicalAssetTable$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              _context21.next = 2;
              return regeneratorRuntime.awrap(expect(this.technicalTab).toBeVisible());

            case 2:
              _context21.next = 4;
              return regeneratorRuntime.awrap(expect(this.assetTable).toBeVisible());

            case 4:
              _i = 0, _arr = ["Asset Code", "Asset Type", "Location", "Status", "Actions"];

            case 5:
              if (!(_i < _arr.length)) {
                _context21.next = 12;
                break;
              }

              header = _arr[_i];
              _context21.next = 9;
              return regeneratorRuntime.awrap(expect(this.assetTable.getByRole("columnheader", {
                name: new RegExp(header)
              })).toBeVisible());

            case 9:
              _i++;
              _context21.next = 5;
              break;

            case 12:
              _context21.next = 14;
              return regeneratorRuntime.awrap(expect(this.rows().first()).toBeVisible());

            case 14:
            case "end":
              return _context21.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "verifyAssetDetails",
    value: function verifyAssetDetails(assetCode) {
      var _i2, _arr2, field;

      return regeneratorRuntime.async(function verifyAssetDetails$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              _context22.next = 2;
              return regeneratorRuntime.awrap(expect(this.dialog()).toContainText("Asset Details"));

            case 2:
              _context22.next = 4;
              return regeneratorRuntime.awrap(expect(this.dialog()).toContainText(assetCode));

            case 4:
              _i2 = 0, _arr2 = ["Asset Code", "Asset Type", "Environment", "Data Classification", "Model", "Storage", "Operating System", "RAM", "Processor", "Price", "Purchase Date", "Status", "Remarks", "Location"];

            case 5:
              if (!(_i2 < _arr2.length)) {
                _context22.next = 12;
                break;
              }

              field = _arr2[_i2];
              _context22.next = 9;
              return regeneratorRuntime.awrap(expect(this.dialog()).toContainText(field));

            case 9:
              _i2++;
              _context22.next = 5;
              break;

            case 12:
            case "end":
              return _context22.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "verifyHistory",
    value: function verifyHistory() {
      return regeneratorRuntime.async(function verifyHistory$(_context23) {
        while (1) {
          switch (_context23.prev = _context23.next) {
            case 0:
              _context23.next = 2;
              return regeneratorRuntime.awrap(expect(this.dialog()).toContainText("Asset History"));

            case 2:
              _context23.next = 4;
              return regeneratorRuntime.awrap(expect(this.dialog().getByRole("list")).toBeVisible());

            case 4:
            case "end":
              return _context23.stop();
          }
        }
      }, null, this);
    }
  }]);

  return TechnicalAssetPage;
}();

module.exports = {
  TechnicalAssetPage: TechnicalAssetPage
};