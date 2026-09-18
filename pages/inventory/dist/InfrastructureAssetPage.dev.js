"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('@playwright/test'),
    expect = _require.expect;

var InfrastructureAssetPage =
/*#__PURE__*/
function () {
  function InfrastructureAssetPage(page) {
    _classCallCheck(this, InfrastructureAssetPage);

    this.page = page;
    this.infrastructureTab = page.getByRole('tabpanel', {
      name: 'Infrastructure Assets'
    });
    this.assetTable = this.infrastructureTab.locator('table');
    this.rowsPerPage = this.infrastructureTab.locator('select').first();
    this.previousButton = this.infrastructureTab.getByRole('button', {
      name: 'Prev'
    });
    this.nextButton = this.infrastructureTab.getByRole('button', {
      name: 'Next'
    });
    this.pageIndicator = this.infrastructureTab.getByText(/Page \d+ of \d+/);
    this.addAssetToggle = this.infrastructureTab.locator('button.addAssetButton');
  }

  _createClass(InfrastructureAssetPage, [{
    key: "rows",
    value: function rows() {
      return this.assetTable.locator('tbody tr');
    }
  }, {
    key: "dialog",
    value: function dialog() {
      return this.page.getByRole('dialog');
    }
  }, {
    key: "verifyTable",
    value: function verifyTable() {
      var _i, _arr, header;

      return regeneratorRuntime.async(function verifyTable$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(expect(this.infrastructureTab).toBeVisible());

            case 2:
              _context.next = 4;
              return regeneratorRuntime.awrap(expect(this.assetTable).toBeVisible({
                timeout: 15000
              }));

            case 4:
              _i = 0, _arr = ['Asset Code', 'Asset Type', 'Location', 'Status', 'Actions'];

            case 5:
              if (!(_i < _arr.length)) {
                _context.next = 12;
                break;
              }

              header = _arr[_i];
              _context.next = 9;
              return regeneratorRuntime.awrap(expect(this.assetTable.getByRole('columnheader', {
                name: new RegExp(header)
              })).toBeVisible());

            case 9:
              _i++;
              _context.next = 5;
              break;

            case 12:
              _context.next = 14;
              return regeneratorRuntime.awrap(expect(this.rows().first()).toBeVisible());

            case 14:
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
              return regeneratorRuntime.awrap(this.rowsPerPage.selectOption(String(value)));

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
      return regeneratorRuntime.async(function viewFirstAsset$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(this.rows().first().getByRole('button', {
                name: 'View'
              }).click());

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "editFirstAsset",
    value: function editFirstAsset() {
      return regeneratorRuntime.async(function editFirstAsset$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(this.rows().first().getByRole('button', {
                name: 'Edit'
              }).click());

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "closeDialog",
    value: function closeDialog() {
      return regeneratorRuntime.async(function closeDialog$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(this.dialog().getByRole('button', {
                name: 'Close'
              }).last().click());

            case 2:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "openAddAssetForm",
    value: function openAddAssetForm() {
      return regeneratorRuntime.async(function openAddAssetForm$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(this.addAssetToggle.click());

            case 2:
              _context6.next = 4;
              return regeneratorRuntime.awrap(this.page.getByRole('button', {
                name: 'Add Infrastructure Assets',
                exact: true
              }).click());

            case 4:
              _context6.next = 6;
              return regeneratorRuntime.awrap(expect(this.dialog()).toContainText('Add Company Asset'));

            case 6:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "verifyAssetDetails",
    value: function verifyAssetDetails() {
      var _i2, _arr2, field;

      return regeneratorRuntime.async(function verifyAssetDetails$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(expect(this.dialog()).toContainText('Infrastructure Assets Details'));

            case 2:
              _i2 = 0, _arr2 = ['Asset Code', 'Asset Type', 'Location', 'Status', 'Purchase Amount', 'Purchase Date', 'Processor', 'RAM', 'Storage', 'Model', 'Labels'];

            case 3:
              if (!(_i2 < _arr2.length)) {
                _context7.next = 10;
                break;
              }

              field = _arr2[_i2];
              _context7.next = 7;
              return regeneratorRuntime.awrap(expect(this.dialog()).toContainText(field));

            case 7:
              _i2++;
              _context7.next = 3;
              break;

            case 10:
            case "end":
              return _context7.stop();
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
          _args8 = arguments;

      return regeneratorRuntime.async(function verifyAssetForm$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _ref = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : {}, _ref$edit = _ref.edit, edit = _ref$edit === void 0 ? false : _ref$edit;
              _context8.next = 3;
              return regeneratorRuntime.awrap(expect(this.dialog()).toContainText(edit ? 'Edit Company Asset' : 'Add Company Asset'));

            case 3:
              _context8.next = 5;
              return regeneratorRuntime.awrap(expect(this.dialog().locator('select')).toHaveCount(3));

            case 5:
              _context8.next = 7;
              return regeneratorRuntime.awrap(expect(this.dialog().getByPlaceholder('Auto-generated')).toBeVisible());

            case 7:
              _context8.next = 9;
              return regeneratorRuntime.awrap(expect(this.dialog().getByPlaceholder('Enter purchase amount')).toBeVisible());

            case 9:
              _context8.next = 11;
              return regeneratorRuntime.awrap(expect(this.dialog().locator('input[type="date"]')).toBeVisible());

            case 11:
              _context8.next = 13;
              return regeneratorRuntime.awrap(expect(this.dialog().getByPlaceholder('Enter model')).toBeVisible());

            case 13:
              _context8.next = 15;
              return regeneratorRuntime.awrap(expect(this.dialog().getByPlaceholder('Enter processor')).toBeVisible());

            case 15:
              _context8.next = 17;
              return regeneratorRuntime.awrap(expect(this.dialog().getByPlaceholder('Example: 16 GB')).toBeVisible());

            case 17:
              _context8.next = 19;
              return regeneratorRuntime.awrap(expect(this.dialog().getByPlaceholder('Example: 512 GB SSD')).toBeVisible());

            case 19:
              _context8.next = 21;
              return regeneratorRuntime.awrap(expect(this.dialog().getByPlaceholder('Example: Windows 11 Pro')).toBeVisible());

            case 21:
              _context8.next = 23;
              return regeneratorRuntime.awrap(expect(this.dialog().getByPlaceholder('Enter remarks')).toBeVisible());

            case 23:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this);
    }
  }]);

  return InfrastructureAssetPage;
}();

module.exports = {
  InfrastructureAssetPage: InfrastructureAssetPage
};