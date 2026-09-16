"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var InventoryPage =
/*#__PURE__*/
function () {
  function InventoryPage(page) {
    _classCallCheck(this, InventoryPage);

    this.page = page;
    this.inventoryMenu = page.getByRole("link", {
      name: "Inventory",
      exact: true
    });
    this.technicalAssets = page.getByRole("tab", {
      name: "Technical Assets"
    });
    this.softwareLicenses = page.getByRole("tab", {
      name: "Software Licenses"
    });
    this.infrastructureAssets = page.getByRole("tab", {
      name: "Infrastructure Assets"
    });
  }

  _createClass(InventoryPage, [{
    key: "navigateToInventory",
    value: function navigateToInventory() {
      var inventoryMenu;
      return regeneratorRuntime.async(function navigateToInventory$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!/\/inventory(?:\/)?$/.test(this.page.url())) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return");

            case 2:
              _context.next = 4;
              return regeneratorRuntime.awrap(this.page.waitForLoadState("domcontentloaded"));

            case 4:
              inventoryMenu = this.page.getByRole("link", {
                name: "Inventory",
                exact: true
              });
              _context.next = 7;
              return regeneratorRuntime.awrap(inventoryMenu.isVisible()["catch"](function () {
                return false;
              }));

            case 7:
              if (!_context.sent) {
                _context.next = 12;
                break;
              }

              _context.next = 10;
              return regeneratorRuntime.awrap(inventoryMenu.click());

            case 10:
              _context.next = 14;
              break;

            case 12:
              _context.next = 14;
              return regeneratorRuntime.awrap(this.page["goto"]("/inventory", {
                waitUntil: "domcontentloaded",
                timeout: 30000
              }));

            case 14:
              _context.next = 16;
              return regeneratorRuntime.awrap(this.page.waitForURL(/\/inventory(?:\/)?$/, {
                waitUntil: "domcontentloaded",
                timeout: 30000
              }));

            case 16:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "openTechnicalAssets",
    value: function openTechnicalAssets() {
      return regeneratorRuntime.async(function openTechnicalAssets$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(this.technicalAssets.waitFor({
                state: "visible",
                timeout: 15000
              }));

            case 2:
              _context2.next = 4;
              return regeneratorRuntime.awrap(this.technicalAssets.click());

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "openSoftwareLicenses",
    value: function openSoftwareLicenses() {
      return regeneratorRuntime.async(function openSoftwareLicenses$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(this.softwareLicenses.waitFor({
                state: "visible",
                timeout: 15000
              }));

            case 2:
              _context3.next = 4;
              return regeneratorRuntime.awrap(this.softwareLicenses.click());

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "openInfrastructureAssets",
    value: function openInfrastructureAssets() {
      return regeneratorRuntime.async(function openInfrastructureAssets$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(this.infrastructureAssets.waitFor({
                state: "visible",
                timeout: 15000
              }));

            case 2:
              _context4.next = 4;
              return regeneratorRuntime.awrap(this.infrastructureAssets.click());

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }]);

  return InventoryPage;
}();

module.exports = {
  InventoryPage: InventoryPage
};