"use strict";

function _templateObject2() {
  var data = _taggedTemplateLiteral(["^s*", "s*$"], ["^\\s*", "\\s*$"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["$&"], ["\\$&"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _require = require("@playwright/test"),
    expect = _require.expect;

var escapeRegExp = function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, String.raw(_templateObject()));
};

var TechnicalAssetPage =
/*#__PURE__*/
function () {
  function TechnicalAssetPage(page) {
    _classCallCheck(this, TechnicalAssetPage);

    this.page = page;
    this.inventoryLink = page.getByRole("link", {
      name: "Inventory",
      exact: true
    });
    this.technicalTab = page.getByRole("tabpanel", {
      name: "Technical Assets"
    }); // Filters

    this.filterComboboxes = this.technicalTab.getByRole("combobox");
    this.assetTypeFilter = this.filterComboboxes.nth(0);
    this.statusFilter = this.filterComboboxes.nth(1);
    this.locationFilter = this.filterComboboxes.nth(2);
    this.rowsPerPage = this.filterComboboxes.last(); // Search

    this.searchInput = this.technicalTab.getByPlaceholder("Search Inventory");
    this.resetSearchButton = this.technicalTab.getByRole("button", {
      name: /reset|clear/i
    }).first();
    this.noRecordsMessage = this.technicalTab.getByText("No records found.", {
      exact: true
    }); // Table and pagination

    this.assetTable = this.technicalTab.getByRole("table");
    this.pageIndicator = this.technicalTab.getByText(/Page \d+ of \d+/);
    this.previousButton = this.technicalTab.getByRole("button", {
      name: /previous|prev/i
    }).first();
    this.nextButton = this.technicalTab.getByRole("button", {
      name: /next/i
    }).first(); // Asset actions

    this.addAssetButton = this.technicalTab.getByRole("button", {
      name: /add\s+(new\s+)?(technical\s+)?asset/i
    }).first();
    this.addAssetDialog = page.getByRole("dialog").filter({
      hasText: /add new asset/i
    }).first();
  } // ---------- Helpers ----------


  _createClass(TechnicalAssetPage, [{
    key: "selectFromCombobox",
    value: function selectFromCombobox(combobox, value) {
      var tagName, text, exactOption;
      return regeneratorRuntime.async(function selectFromCombobox$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(expect(combobox).toBeVisible());

            case 2:
              _context.next = 4;
              return regeneratorRuntime.awrap(expect(combobox).toBeEnabled());

            case 4:
              _context.next = 6;
              return regeneratorRuntime.awrap(combobox.evaluate(function (element) {
                return element.tagName.toLowerCase();
              }));

            case 6:
              tagName = _context.sent;
              text = String(value);

              if (!(tagName === "select")) {
                _context.next = 19;
                break;
              }

              _context.prev = 9;
              _context.next = 12;
              return regeneratorRuntime.awrap(combobox.selectOption(text, {
                timeout: 3000
              }));

            case 12:
              _context.next = 18;
              break;

            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](9);
              _context.next = 18;
              return regeneratorRuntime.awrap(combobox.selectOption({
                label: text
              }, {
                timeout: 3000
              }));

            case 18:
              return _context.abrupt("return");

            case 19:
              _context.next = 21;
              return regeneratorRuntime.awrap(combobox.click());

            case 21:
              exactOption = this.page.getByRole("option", {
                name: new RegExp(String.raw(_templateObject2(), escapeRegExp(text)), "i")
              });
              _context.next = 24;
              return regeneratorRuntime.awrap(expect(exactOption).toBeVisible());

            case 24:
              _context.next = 26;
              return regeneratorRuntime.awrap(exactOption.click());

            case 26:
            case "end":
              return _context.stop();
          }
        }
      }, null, this, [[9, 14]]);
    }
  }, {
    key: "rows",
    value: function rows() {
      return this.assetTable.locator("tbody tr");
    }
  }, {
    key: "waitForTableState",
    value: function waitForTableState() {
      var _this = this;

      var _ref,
          _ref$allowEmpty,
          allowEmpty,
          _args3 = arguments;

      return regeneratorRuntime.async(function waitForTableState$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _ref = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {}, _ref$allowEmpty = _ref.allowEmpty, allowEmpty = _ref$allowEmpty === void 0 ? false : _ref$allowEmpty;
              _context3.next = 3;
              return regeneratorRuntime.awrap(expect(this.assetTable).toBeVisible());

            case 3:
              _context3.next = 5;
              return regeneratorRuntime.awrap(expect.poll(function _callee() {
                return regeneratorRuntime.async(function _callee$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return regeneratorRuntime.awrap(_this.rows().count());

                      case 2:
                        _context2.t0 = _context2.sent;

                        if (!(_context2.t0 > 0)) {
                          _context2.next = 5;
                          break;
                        }

                        return _context2.abrupt("return", "rows");

                      case 5:
                        _context2.t1 = allowEmpty;

                        if (!_context2.t1) {
                          _context2.next = 10;
                          break;
                        }

                        _context2.next = 9;
                        return regeneratorRuntime.awrap(_this.noRecordsMessage.isVisible()["catch"](function () {
                          return false;
                        }));

                      case 9:
                        _context2.t1 = _context2.sent;

                      case 10:
                        if (!_context2.t1) {
                          _context2.next = 12;
                          break;
                        }

                        return _context2.abrupt("return", "empty");

                      case 12:
                        return _context2.abrupt("return", "loading");

                      case 13:
                      case "end":
                        return _context2.stop();
                    }
                  }
                });
              }, {
                timeout: 20000,
                intervals: [200, 500, 1000],
                message: "Technical Assets table did not reach the expected state"
              }).not.toBe("loading"));

            case 5:
              _context3.next = 7;
              return regeneratorRuntime.awrap(this.rows().count());

            case 7:
              _context3.t0 = _context3.sent;

              if (!(_context3.t0 > 0)) {
                _context3.next = 11;
                break;
              }

              _context3.next = 11;
              return regeneratorRuntime.awrap(expect(this.pageIndicator).toBeVisible());

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "waitForTableRows",
    value: function waitForTableRows() {
      return regeneratorRuntime.async(function waitForTableRows$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(this.waitForTableState());

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "waitForSearchResult",
    value: function waitForSearchResult(assetCode) {
      var _this2 = this;

      var matchingRow;
      return regeneratorRuntime.async(function waitForSearchResult$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              matchingRow = this.rowByAssetCode(assetCode);
              _context6.next = 3;
              return regeneratorRuntime.awrap(expect.poll(function _callee2() {
                return regeneratorRuntime.async(function _callee2$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.next = 2;
                        return regeneratorRuntime.awrap(matchingRow.isVisible()["catch"](function () {
                          return false;
                        }));

                      case 2:
                        if (!_context5.sent) {
                          _context5.next = 4;
                          break;
                        }

                        return _context5.abrupt("return", "match");

                      case 4:
                        _context5.next = 6;
                        return regeneratorRuntime.awrap(_this2.noRecordsMessage.isVisible()["catch"](function () {
                          return false;
                        }));

                      case 6:
                        if (!_context5.sent) {
                          _context5.next = 8;
                          break;
                        }

                        return _context5.abrupt("return", "empty");

                      case 8:
                        return _context5.abrupt("return", "loading");

                      case 9:
                      case "end":
                        return _context5.stop();
                    }
                  }
                });
              }, {
                timeout: 30000,
                intervals: [300, 500, 750, 1000, 1500],
                message: "Search did not complete for asset \"".concat(assetCode, "\"")
              }).not.toBe("loading"));

            case 3:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    } // ---------- Navigation ----------

  }, {
    key: "open",
    value: function open() {
      return regeneratorRuntime.async(function open$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(this.page["goto"]("/inventory"));

            case 2:
              _context7.next = 4;
              return regeneratorRuntime.awrap(expect(this.technicalTab).toBeVisible());

            case 4:
              _context7.next = 6;
              return regeneratorRuntime.awrap(expect(this.assetTable).toBeVisible());

            case 6:
              _context7.next = 8;
              return regeneratorRuntime.awrap(this.waitForTableRows());

            case 8:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this);
    } // ---------- Table ----------

  }, {
    key: "rowByAssetCode",
    value: function rowByAssetCode(assetCode) {
      var code = String(assetCode).trim();
      return this.rows().filter({
        has: this.page.getByRole("cell", {
          name: code,
          exact: true
        })
      });
    }
  }, {
    key: "verifyTechnicalAssetTable",
    value: function verifyTechnicalAssetTable() {
      var _this3 = this;

      var headers;
      return regeneratorRuntime.async(function verifyTechnicalAssetTable$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return regeneratorRuntime.awrap(expect(this.technicalTab).toBeVisible());

            case 2:
              _context8.next = 4;
              return regeneratorRuntime.awrap(expect(this.assetTable).toBeVisible());

            case 4:
              headers = ["Asset Code", "Asset Type", "Location", "Status", "Actions"];
              _context8.next = 7;
              return regeneratorRuntime.awrap(Promise.all(headers.map(function (header) {
                return expect(_this3.assetTable.getByRole("columnheader", {
                  name: new RegExp(escapeRegExp(header), "i")
                })).toBeVisible();
              })));

            case 7:
              _context8.next = 9;
              return regeneratorRuntime.awrap(this.waitForTableRows());

            case 9:
              _context8.next = 11;
              return regeneratorRuntime.awrap(expect(this.pageIndicator).toBeVisible());

            case 11:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "verifyAssetRow",
    value: function verifyAssetRow(assetCode) {
      var expectedValues,
          row,
          _args9 = arguments;
      return regeneratorRuntime.async(function verifyAssetRow$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              expectedValues = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : [];
              row = this.rowByAssetCode(assetCode);
              _context9.next = 4;
              return regeneratorRuntime.awrap(expect(row).toBeVisible());

            case 4:
              _context9.next = 6;
              return regeneratorRuntime.awrap(Promise.all(expectedValues.map(function (value) {
                return expect(row).toContainText(value);
              })));

            case 6:
            case "end":
              return _context9.stop();
          }
        }
      }, null, this);
    } // ---------- Filters ----------

  }, {
    key: "filterByAssetType",
    value: function filterByAssetType(value) {
      return regeneratorRuntime.async(function filterByAssetType$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return regeneratorRuntime.awrap(this.selectFromCombobox(this.assetTypeFilter, value));

            case 2:
              _context10.next = 4;
              return regeneratorRuntime.awrap(this.waitForTableState({
                allowEmpty: true
              }));

            case 4:
            case "end":
              return _context10.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "filterByStatus",
    value: function filterByStatus(value) {
      return regeneratorRuntime.async(function filterByStatus$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return regeneratorRuntime.awrap(this.selectFromCombobox(this.statusFilter, value));

            case 2:
              _context11.next = 4;
              return regeneratorRuntime.awrap(this.waitForTableState({
                allowEmpty: true
              }));

            case 4:
            case "end":
              return _context11.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "filterByLocation",
    value: function filterByLocation(value) {
      return regeneratorRuntime.async(function filterByLocation$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return regeneratorRuntime.awrap(this.selectFromCombobox(this.locationFilter, value));

            case 2:
              _context12.next = 4;
              return regeneratorRuntime.awrap(this.waitForTableState({
                allowEmpty: true
              }));

            case 4:
            case "end":
              return _context12.stop();
          }
        }
      }, null, this);
    } // ---------- Search ----------

  }, {
    key: "searchAsset",
    value: function searchAsset(assetCode) {
      var searchValue, matchingRow;
      return regeneratorRuntime.async(function searchAsset$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              searchValue = String(assetCode);
              _context13.next = 3;
              return regeneratorRuntime.awrap(expect(this.searchInput).toBeVisible());

            case 3:
              _context13.next = 5;
              return regeneratorRuntime.awrap(expect(this.searchInput).toBeEnabled());

            case 5:
              _context13.next = 7;
              return regeneratorRuntime.awrap(this.searchInput.fill(searchValue));

            case 7:
              _context13.next = 9;
              return regeneratorRuntime.awrap(expect(this.searchInput).toHaveValue(searchValue));

            case 9:
              _context13.next = 11;
              return regeneratorRuntime.awrap(this.waitForSearchResult(searchValue));

            case 11:
              matchingRow = this.rowByAssetCode(searchValue);
              _context13.next = 14;
              return regeneratorRuntime.awrap(matchingRow.isVisible()["catch"](function () {
                return false;
              }));

            case 14:
              if (!_context13.sent) {
                _context13.next = 18;
                break;
              }

              _context13.next = 17;
              return regeneratorRuntime.awrap(Promise.all(["View", "Edit", "History"].map(function (actionName) {
                return expect(matchingRow.getByRole("button", {
                  name: actionName,
                  exact: true
                })).toBeVisible();
              })));

            case 17:
              return _context13.abrupt("return");

            case 18:
              _context13.next = 20;
              return regeneratorRuntime.awrap(expect(this.noRecordsMessage).toBeVisible());

            case 20:
            case "end":
              return _context13.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "clearSearch",
    value: function clearSearch() {
      var currentValue;
      return regeneratorRuntime.async(function clearSearch$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              _context14.next = 2;
              return regeneratorRuntime.awrap(expect(this.searchInput).toBeVisible());

            case 2:
              _context14.next = 4;
              return regeneratorRuntime.awrap(this.searchInput.inputValue());

            case 4:
              currentValue = _context14.sent;

              if (!(currentValue !== "")) {
                _context14.next = 14;
                break;
              }

              _context14.next = 8;
              return regeneratorRuntime.awrap(expect(this.resetSearchButton).toBeVisible());

            case 8:
              _context14.next = 10;
              return regeneratorRuntime.awrap(expect(this.resetSearchButton).toBeEnabled());

            case 10:
              _context14.next = 12;
              return regeneratorRuntime.awrap(this.resetSearchButton.click());

            case 12:
              _context14.next = 16;
              break;

            case 14:
              _context14.next = 16;
              return regeneratorRuntime.awrap(this.searchInput.fill(""));

            case 16:
              _context14.next = 18;
              return regeneratorRuntime.awrap(expect(this.searchInput).toHaveValue(""));

            case 18:
              _context14.next = 20;
              return regeneratorRuntime.awrap(expect(this.noRecordsMessage).toBeHidden({
                timeout: 30000
              }));

            case 20:
              _context14.next = 22;
              return regeneratorRuntime.awrap(this.waitForTableRows());

            case 22:
              _context14.next = 24;
              return regeneratorRuntime.awrap(expect(this.pageIndicator).toContainText("Page 1"));

            case 24:
              _context14.next = 26;
              return regeneratorRuntime.awrap(expect(this.rows().first()).toBeVisible());

            case 26:
            case "end":
              return _context14.stop();
          }
        }
      }, null, this);
    } // ---------- Row actions ----------

  }, {
    key: "clickRowAction",
    value: function clickRowAction(assetCode, actionName) {
      var row, button;
      return regeneratorRuntime.async(function clickRowAction$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _context15.next = 2;
              return regeneratorRuntime.awrap(this.searchAsset(assetCode));

            case 2:
              row = this.rowByAssetCode(assetCode);
              _context15.next = 5;
              return regeneratorRuntime.awrap(expect(row).toBeVisible());

            case 5:
              button = row.getByRole("button", {
                name: actionName,
                exact: true
              });
              _context15.next = 8;
              return regeneratorRuntime.awrap(expect(button).toBeVisible());

            case 8:
              _context15.next = 10;
              return regeneratorRuntime.awrap(expect(button).toBeEnabled());

            case 10:
              _context15.next = 12;
              return regeneratorRuntime.awrap(button.click());

            case 12:
            case "end":
              return _context15.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "viewAsset",
    value: function viewAsset(assetCode) {
      return regeneratorRuntime.async(function viewAsset$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _context16.next = 2;
              return regeneratorRuntime.awrap(this.clickRowAction(assetCode, "View"));

            case 2:
            case "end":
              return _context16.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "editAsset",
    value: function editAsset(assetCode) {
      return regeneratorRuntime.async(function editAsset$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              _context17.next = 2;
              return regeneratorRuntime.awrap(this.clickRowAction(assetCode, "Edit"));

            case 2:
            case "end":
              return _context17.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "viewAssetHistory",
    value: function viewAssetHistory(assetCode) {
      return regeneratorRuntime.async(function viewAssetHistory$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              _context18.next = 2;
              return regeneratorRuntime.awrap(this.clickRowAction(assetCode, "History"));

            case 2:
            case "end":
              return _context18.stop();
          }
        }
      }, null, this);
    } // ---------- Add asset ----------

  }, {
    key: "openAddAssetDialog",
    value: function openAddAssetDialog() {
      return regeneratorRuntime.async(function openAddAssetDialog$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              _context19.next = 2;
              return regeneratorRuntime.awrap(expect(this.addAssetButton).toBeVisible());

            case 2:
              _context19.next = 4;
              return regeneratorRuntime.awrap(expect(this.addAssetButton).toBeEnabled());

            case 4:
              _context19.next = 6;
              return regeneratorRuntime.awrap(this.addAssetButton.click());

            case 6:
              _context19.next = 8;
              return regeneratorRuntime.awrap(expect(this.addAssetDialog).toBeVisible());

            case 8:
            case "end":
              return _context19.stop();
          }
        }
      }, null, this);
    } // ---------- Pagination ----------

  }, {
    key: "goToNextPage",
    value: function goToNextPage() {
      var previousPage;
      return regeneratorRuntime.async(function goToNextPage$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              _context20.next = 2;
              return regeneratorRuntime.awrap(expect(this.nextButton).toBeVisible());

            case 2:
              _context20.next = 4;
              return regeneratorRuntime.awrap(expect(this.nextButton).toBeEnabled());

            case 4:
              _context20.next = 6;
              return regeneratorRuntime.awrap(this.pageIndicator.innerText());

            case 6:
              previousPage = _context20.sent.trim();
              _context20.next = 9;
              return regeneratorRuntime.awrap(this.nextButton.click());

            case 9:
              _context20.next = 11;
              return regeneratorRuntime.awrap(expect(this.pageIndicator).not.toHaveText(previousPage));

            case 11:
              _context20.next = 13;
              return regeneratorRuntime.awrap(this.waitForTableRows());

            case 13:
            case "end":
              return _context20.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "goToPreviousPage",
    value: function goToPreviousPage() {
      var previousPage;
      return regeneratorRuntime.async(function goToPreviousPage$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              _context21.next = 2;
              return regeneratorRuntime.awrap(expect(this.previousButton).toBeVisible());

            case 2:
              _context21.next = 4;
              return regeneratorRuntime.awrap(expect(this.previousButton).toBeEnabled());

            case 4:
              _context21.next = 6;
              return regeneratorRuntime.awrap(this.pageIndicator.innerText());

            case 6:
              previousPage = _context21.sent.trim();
              _context21.next = 9;
              return regeneratorRuntime.awrap(this.previousButton.click());

            case 9:
              _context21.next = 11;
              return regeneratorRuntime.awrap(expect(this.pageIndicator).not.toHaveText(previousPage));

            case 11:
              _context21.next = 13;
              return regeneratorRuntime.awrap(this.waitForTableRows());

            case 13:
            case "end":
              return _context21.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "selectRowsPerPage",
    value: function selectRowsPerPage(value) {
      return regeneratorRuntime.async(function selectRowsPerPage$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              _context22.next = 2;
              return regeneratorRuntime.awrap(this.selectFromCombobox(this.rowsPerPage, value));

            case 2:
              _context22.next = 4;
              return regeneratorRuntime.awrap(this.waitForTableState({
                allowEmpty: true
              }));

            case 4:
            case "end":
              return _context22.stop();
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