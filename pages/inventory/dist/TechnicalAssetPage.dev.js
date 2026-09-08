"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('@playwright/test'),
    expect = _require.expect;

var TechnicalAssetPage =
/*#__PURE__*/
function () {
  function TechnicalAssetPage(page) {
    _classCallCheck(this, TechnicalAssetPage);

    this.page = page; // Filters

    this.assetTypeFilter = page.getByText('Select Asset Type', {
      exact: true
    });
    this.statusFilter = page.getByText('Select Status', {
      exact: true
    });
    this.locationFilter = page.getByText('Select Location', {
      exact: true
    }); // Search

    this.searchInput = page.getByPlaceholder('Search Inventory'); // Table

    this.assetTable = page.locator('table');
    this.assetCodeHeader = page.getByText('Asset Code', {
      exact: true
    });
    this.assetTypeHeader = page.getByText('Asset Type', {
      exact: true
    });
    this.locationHeader = page.getByText('Location', {
      exact: true
    });
    this.statusHeader = page.getByText('Status', {
      exact: true
    });
    this.actionsHeader = page.getByText('Actions', {
      exact: true
    }); // Pagination

    this.previousButton = page.getByRole('button', {
      name: 'Prev'
    });
    this.nextButton = page.getByRole('button', {
      name: 'Next'
    });
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
    key: "verifyTechnicalAssetTable",
    value: function verifyTechnicalAssetTable() {
      return regeneratorRuntime.async(function verifyTechnicalAssetTable$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(expect(this.assetCodeHeader).toBeVisible());

            case 2:
              _context5.next = 4;
              return regeneratorRuntime.awrap(expect(this.assetTypeHeader).toBeVisible());

            case 4:
              _context5.next = 6;
              return regeneratorRuntime.awrap(expect(this.locationHeader).toBeVisible());

            case 6:
              _context5.next = 8;
              return regeneratorRuntime.awrap(expect(this.statusHeader).toBeVisible());

            case 8:
              _context5.next = 10;
              return regeneratorRuntime.awrap(expect(this.actionsHeader).toBeVisible());

            case 10:
            case "end":
              return _context5.stop();
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