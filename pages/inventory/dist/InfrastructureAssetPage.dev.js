"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require("@playwright/test"),
    expect = _require.expect;

var InfrastructureAssetPage =
/*#__PURE__*/
function () {
  function InfrastructureAssetPage(page) {
    _classCallCheck(this, InfrastructureAssetPage);

    this.page = page;
    this.infrastructureTab = page.getByRole("tabpanel", {
      name: "Infrastructure Assets"
    });
    this.assetTable = this.infrastructureTab.getByRole("table");
    this.addAssetButton = this.infrastructureTab.getByRole("button", {
      name: "+ Add Asset",
      exact: true
    });
    this.pageIndicator = this.infrastructureTab.getByText(/Page \d+ of \d+/i);
    this.previousButton = this.infrastructureTab.getByRole("button", {
      name: "Prev",
      exact: true
    });
    this.nextButton = this.infrastructureTab.getByRole("button", {
      name: "Next",
      exact: true
    });
  }

  _createClass(InfrastructureAssetPage, [{
    key: "rows",
    value: function rows() {
      return this.assetTable.getByRole("rowgroup").nth(1).getByRole("row");
    }
  }, {
    key: "dialog",
    value: function dialog() {
      return this.page.getByRole("dialog").last();
    }
  }, {
    key: "verifyTable",
    value: function verifyTable() {
      return regeneratorRuntime.async(function verifyTable$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(expect(this.assetTable).toBeVisible());

            case 2:
              _context.next = 4;
              return regeneratorRuntime.awrap(expect(this.infrastructureTab.getByText(/Total Rows/i)).toBeVisible());

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "selectRowsPerPage",
    value: function selectRowsPerPage(value) {
      return regeneratorRuntime.async(function selectRowsPerPage$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(this.infrastructureTab.getByRole("combobox").first().selectOption({
                label: "".concat(value, " Rows")
              }));

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "viewFirstAsset",
    value: function viewFirstAsset() {
      var firstRow, dialog;
      return regeneratorRuntime.async(function viewFirstAsset$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              firstRow = this.rows().first();
              _context3.next = 3;
              return regeneratorRuntime.awrap(expect(firstRow).toBeVisible());

            case 3:
              _context3.next = 5;
              return regeneratorRuntime.awrap(firstRow.getByRole("button", {
                name: "View",
                exact: true
              }).click());

            case 5:
              dialog = this.dialog();
              _context3.next = 8;
              return regeneratorRuntime.awrap(expect(dialog).toBeVisible());

            case 8:
              _context3.next = 10;
              return regeneratorRuntime.awrap(expect(dialog.getByText("Infrastructure Assets Details", {
                exact: true
              })).toBeVisible());

            case 10:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "editFirstAsset",
    value: function editFirstAsset() {
      var firstRow, dialog;
      return regeneratorRuntime.async(function editFirstAsset$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              firstRow = this.rows().first();
              _context4.next = 3;
              return regeneratorRuntime.awrap(expect(firstRow).toBeVisible());

            case 3:
              _context4.next = 5;
              return regeneratorRuntime.awrap(firstRow.getByRole("button", {
                name: "Edit",
                exact: true
              }).click());

            case 5:
              dialog = this.dialog();
              _context4.next = 8;
              return regeneratorRuntime.awrap(expect(dialog).toBeVisible());

            case 8:
              _context4.next = 10;
              return regeneratorRuntime.awrap(expect(dialog.getByPlaceholder("Auto-generated")).toBeVisible());

            case 10:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "closeDialog",
    value: function closeDialog() {
      var dialog, closeButton;
      return regeneratorRuntime.async(function closeDialog$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              dialog = this.dialog();
              closeButton = dialog.getByRole("button", {
                name: /close|cancel/i
              }).first();
              _context5.next = 4;
              return regeneratorRuntime.awrap(expect(closeButton).toBeVisible());

            case 4:
              _context5.next = 6;
              return regeneratorRuntime.awrap(closeButton.click());

            case 6:
              _context5.next = 8;
              return regeneratorRuntime.awrap(expect(dialog).toBeHidden());

            case 8:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "openAddAssetForm",
    value: function openAddAssetForm() {
      var addInfrastructureButton, dialog;
      return regeneratorRuntime.async(function openAddAssetForm$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(this.addAssetButton.click());

            case 2:
              addInfrastructureButton = this.page.getByRole("button", {
                name: "Add Infrastructure Assets",
                exact: true
              });
              _context6.next = 5;
              return regeneratorRuntime.awrap(expect(addInfrastructureButton).toBeVisible());

            case 5:
              _context6.next = 7;
              return regeneratorRuntime.awrap(addInfrastructureButton.click());

            case 7:
              dialog = this.dialog();
              _context6.next = 10;
              return regeneratorRuntime.awrap(expect(dialog).toBeVisible());

            case 10:
              _context6.next = 12;
              return regeneratorRuntime.awrap(expect(dialog.getByText("Add Company Asset", {
                exact: true
              })).toBeVisible());

            case 12:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "verifyViewDetails",
    value: function verifyViewDetails() {
      var dialog, closeButtons;
      return regeneratorRuntime.async(function verifyViewDetails$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              dialog = this.dialog();
              _context7.next = 3;
              return regeneratorRuntime.awrap(expect(dialog).toBeVisible());

            case 3:
              _context7.next = 5;
              return regeneratorRuntime.awrap(expect(dialog.getByText("Infrastructure Assets Details", {
                exact: true
              })).toBeVisible());

            case 5:
              _context7.next = 7;
              return regeneratorRuntime.awrap(expect(dialog).toContainText("Asset Code"));

            case 7:
              _context7.next = 9;
              return regeneratorRuntime.awrap(expect(dialog).toContainText("Asset Type"));

            case 9:
              _context7.next = 11;
              return regeneratorRuntime.awrap(expect(dialog).toContainText("Location"));

            case 11:
              _context7.next = 13;
              return regeneratorRuntime.awrap(expect(dialog).toContainText("Status"));

            case 13:
              closeButtons = dialog.getByRole("button", {
                name: "Close",
                exact: true
              });
              _context7.next = 16;
              return regeneratorRuntime.awrap(expect(closeButtons.first()).toBeVisible());

            case 16:
              _context7.next = 18;
              return regeneratorRuntime.awrap(expect(closeButtons.last()).toBeVisible());

            case 18:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "verifyAssetDetails",
    value: function verifyAssetDetails() {
      var dialog;
      return regeneratorRuntime.async(function verifyAssetDetails$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              dialog = this.dialog();
              _context8.next = 3;
              return regeneratorRuntime.awrap(expect(dialog.getByPlaceholder("Auto-generated")).toBeVisible());

            case 3:
              _context8.next = 5;
              return regeneratorRuntime.awrap(expect(dialog.getByPlaceholder("Enter model")).toBeVisible());

            case 5:
              _context8.next = 7;
              return regeneratorRuntime.awrap(expect(dialog.getByPlaceholder("Enter processor")).toBeVisible());

            case 7:
              _context8.next = 9;
              return regeneratorRuntime.awrap(expect(dialog.getByPlaceholder("Example: 16 GB")).toBeVisible());

            case 9:
              _context8.next = 11;
              return regeneratorRuntime.awrap(expect(dialog.getByPlaceholder("Example: 512 GB SSD")).toBeVisible());

            case 11:
              _context8.next = 13;
              return regeneratorRuntime.awrap(expect(dialog.getByPlaceholder("Example: Windows 11 Pro")).toBeVisible());

            case 13:
              _context8.next = 15;
              return regeneratorRuntime.awrap(expect(dialog.getByPlaceholder("Enter remarks")).toBeVisible());

            case 15:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "verifyAssetForm",
    value: function verifyAssetForm() {
      var _ref,
          _ref$edit,
          edit,
          dialog,
          buttonName,
          _args9 = arguments;

      return regeneratorRuntime.async(function verifyAssetForm$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _ref = _args9.length > 0 && _args9[0] !== undefined ? _args9[0] : {}, _ref$edit = _ref.edit, edit = _ref$edit === void 0 ? false : _ref$edit;
              dialog = this.dialog();
              _context9.next = 4;
              return regeneratorRuntime.awrap(expect(dialog).toBeVisible());

            case 4:
              _context9.next = 6;
              return regeneratorRuntime.awrap(this.verifyAssetDetails());

            case 6:
              if (edit) {
                buttonName = "Update";
              } else {
                buttonName = "Create";
              }

              _context9.next = 9;
              return regeneratorRuntime.awrap(expect(dialog.getByRole("button", {
                name: buttonName,
                exact: true
              })).toBeVisible());

            case 9:
            case "end":
              return _context9.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "fillInfrastructureAsset",
    value: function fillInfrastructureAsset(_ref2) {
      var assetType, location, status, purchaseAmount, purchaseDate, model, processor, ram, storage, operatingSystem, remarks, form;
      return regeneratorRuntime.async(function fillInfrastructureAsset$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              assetType = _ref2.assetType, location = _ref2.location, status = _ref2.status, purchaseAmount = _ref2.purchaseAmount, purchaseDate = _ref2.purchaseDate, model = _ref2.model, processor = _ref2.processor, ram = _ref2.ram, storage = _ref2.storage, operatingSystem = _ref2.operatingSystem, remarks = _ref2.remarks;
              form = this.dialog();

              if (!(assetType !== undefined)) {
                _context10.next = 5;
                break;
              }

              _context10.next = 5;
              return regeneratorRuntime.awrap(form.locator("select").nth(0).selectOption({
                label: assetType
              }));

            case 5:
              if (!(location !== undefined)) {
                _context10.next = 8;
                break;
              }

              _context10.next = 8;
              return regeneratorRuntime.awrap(form.locator("select").nth(1).selectOption({
                label: location
              }));

            case 8:
              if (!(status !== undefined)) {
                _context10.next = 11;
                break;
              }

              _context10.next = 11;
              return regeneratorRuntime.awrap(form.locator("select").nth(2).selectOption({
                label: status
              }));

            case 11:
              if (!(purchaseAmount !== undefined)) {
                _context10.next = 14;
                break;
              }

              _context10.next = 14;
              return regeneratorRuntime.awrap(form.getByPlaceholder("Enter purchase amount").fill(String(purchaseAmount)));

            case 14:
              if (!(purchaseDate !== undefined)) {
                _context10.next = 17;
                break;
              }

              _context10.next = 17;
              return regeneratorRuntime.awrap(form.locator('input[type="date"]').fill(purchaseDate));

            case 17:
              if (!(model !== undefined)) {
                _context10.next = 20;
                break;
              }

              _context10.next = 20;
              return regeneratorRuntime.awrap(form.getByPlaceholder("Enter model").fill(model));

            case 20:
              if (!(processor !== undefined)) {
                _context10.next = 23;
                break;
              }

              _context10.next = 23;
              return regeneratorRuntime.awrap(form.getByPlaceholder("Enter processor").fill(processor));

            case 23:
              if (!(ram !== undefined)) {
                _context10.next = 26;
                break;
              }

              _context10.next = 26;
              return regeneratorRuntime.awrap(form.getByPlaceholder("Example: 16 GB").fill(ram));

            case 26:
              if (!(storage !== undefined)) {
                _context10.next = 29;
                break;
              }

              _context10.next = 29;
              return regeneratorRuntime.awrap(form.getByPlaceholder("Example: 512 GB SSD").fill(storage));

            case 29:
              if (!(operatingSystem !== undefined)) {
                _context10.next = 32;
                break;
              }

              _context10.next = 32;
              return regeneratorRuntime.awrap(form.getByPlaceholder("Example: Windows 11 Pro").fill(operatingSystem));

            case 32:
              if (!(remarks !== undefined)) {
                _context10.next = 35;
                break;
              }

              _context10.next = 35;
              return regeneratorRuntime.awrap(form.getByPlaceholder("Enter remarks").fill(remarks));

            case 35:
            case "end":
              return _context10.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getGeneratedAssetCode",
    value: function getGeneratedAssetCode() {
      var assetCodeField;
      return regeneratorRuntime.async(function getGeneratedAssetCode$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              assetCodeField = this.dialog().getByPlaceholder("Auto-generated");
              _context12.next = 3;
              return regeneratorRuntime.awrap(expect(assetCodeField).toBeVisible());

            case 3:
              _context12.next = 5;
              return regeneratorRuntime.awrap(expect.poll(function _callee() {
                return regeneratorRuntime.async(function _callee$(_context11) {
                  while (1) {
                    switch (_context11.prev = _context11.next) {
                      case 0:
                        return _context11.abrupt("return", assetCodeField.inputValue());

                      case 1:
                      case "end":
                        return _context11.stop();
                    }
                  }
                });
              }, {
                timeout: 5000
              }).not.toBe(""));

            case 5:
              return _context12.abrupt("return", assetCodeField.inputValue());

            case 6:
            case "end":
              return _context12.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "addInfrastructureAsset",
    value: function addInfrastructureAsset() {
      var dialog;
      return regeneratorRuntime.async(function addInfrastructureAsset$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              dialog = this.dialog();
              _context13.next = 3;
              return regeneratorRuntime.awrap(dialog.getByRole("button", {
                name: "Create",
                exact: true
              }).click());

            case 3:
            case "end":
              return _context13.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "updateInfrastructureAsset",
    value: function updateInfrastructureAsset() {
      var dialog;
      return regeneratorRuntime.async(function updateInfrastructureAsset$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              dialog = this.dialog();
              _context14.next = 3;
              return regeneratorRuntime.awrap(dialog.getByRole("button", {
                name: "Update",
                exact: true
              }).click());

            case 3:
            case "end":
              return _context14.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "verifyAssetInTable",
    value: function verifyAssetInTable(assetCode) {
      var expectedValues,
          row,
          _iteratorNormalCompletion,
          _didIteratorError,
          _iteratorError,
          _iterator,
          _step,
          value,
          _args15 = arguments;

      return regeneratorRuntime.async(function verifyAssetInTable$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              expectedValues = _args15.length > 1 && _args15[1] !== undefined ? _args15[1] : [];
              row = this.rows().filter({
                hasText: assetCode
              });
              _context15.next = 4;
              return regeneratorRuntime.awrap(expect(row).toHaveCount(1));

            case 4:
              _context15.next = 6;
              return regeneratorRuntime.awrap(expect(row).toBeVisible());

            case 6:
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context15.prev = 9;
              _iterator = expectedValues[Symbol.iterator]();

            case 11:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context15.next = 18;
                break;
              }

              value = _step.value;
              _context15.next = 15;
              return regeneratorRuntime.awrap(expect(row).toContainText(value));

            case 15:
              _iteratorNormalCompletion = true;
              _context15.next = 11;
              break;

            case 18:
              _context15.next = 24;
              break;

            case 20:
              _context15.prev = 20;
              _context15.t0 = _context15["catch"](9);
              _didIteratorError = true;
              _iteratorError = _context15.t0;

            case 24:
              _context15.prev = 24;
              _context15.prev = 25;

              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }

            case 27:
              _context15.prev = 27;

              if (!_didIteratorError) {
                _context15.next = 30;
                break;
              }

              throw _iteratorError;

            case 30:
              return _context15.finish(27);

            case 31:
              return _context15.finish(24);

            case 32:
            case "end":
              return _context15.stop();
          }
        }
      }, null, this, [[9, 20, 24, 32], [25,, 27, 31]]);
    }
  }, {
    key: "verifyAssetByValues",
    value: function verifyAssetByValues() {
      var expectedValues,
          rows,
          _iteratorNormalCompletion2,
          _didIteratorError2,
          _iteratorError2,
          _iterator2,
          _step2,
          value,
          _args16 = arguments;

      return regeneratorRuntime.async(function verifyAssetByValues$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              expectedValues = _args16.length > 0 && _args16[0] !== undefined ? _args16[0] : [];
              rows = this.rows();
              _context16.next = 4;
              return regeneratorRuntime.awrap(expect(rows).not.toHaveCount(0));

            case 4:
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context16.prev = 7;
              _iterator2 = expectedValues[Symbol.iterator]();

            case 9:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                _context16.next = 16;
                break;
              }

              value = _step2.value;
              _context16.next = 13;
              return regeneratorRuntime.awrap(expect(rows.filter({
                hasText: value
              }).first()).toBeVisible());

            case 13:
              _iteratorNormalCompletion2 = true;
              _context16.next = 9;
              break;

            case 16:
              _context16.next = 22;
              break;

            case 18:
              _context16.prev = 18;
              _context16.t0 = _context16["catch"](7);
              _didIteratorError2 = true;
              _iteratorError2 = _context16.t0;

            case 22:
              _context16.prev = 22;
              _context16.prev = 23;

              if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                _iterator2["return"]();
              }

            case 25:
              _context16.prev = 25;

              if (!_didIteratorError2) {
                _context16.next = 28;
                break;
              }

              throw _iteratorError2;

            case 28:
              return _context16.finish(25);

            case 29:
              return _context16.finish(22);

            case 30:
            case "end":
              return _context16.stop();
          }
        }
      }, null, this, [[7, 18, 22, 30], [23,, 25, 29]]);
    }
  }]);

  return InfrastructureAssetPage;
}();

module.exports = {
  InfrastructureAssetPage: InfrastructureAssetPage
};