"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// inventory.page.js
var InventoryPage =
/*#__PURE__*/
function () {
  function InventoryPage(page) {
    _classCallCheck(this, InventoryPage);

    this.page = page; // Use a more flexible locator that's less brittle

    this.inventoryMenu = page.locator('a:has-text("Inventory")').first();
    this.technicalAssets = page.locator('a:has-text("Technical Assets")').first();
  }

  _createClass(InventoryPage, [{
    key: "navigateToInventory",
    value: function navigateToInventory() {
      return regeneratorRuntime.async(function navigateToInventory$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(this.page.waitForLoadState('networkidle'));

            case 2:
              _context.next = 4;
              return regeneratorRuntime.awrap(this.inventoryMenu.waitFor({
                state: 'visible'
              }));

            case 4:
              _context.next = 6;
              return regeneratorRuntime.awrap(this.inventoryMenu.click());

            case 6:
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
              return regeneratorRuntime.awrap(this.page.waitForLoadState('networkidle'));

            case 2:
              _context2.next = 4;
              return regeneratorRuntime.awrap(this.technicalAssets.waitFor({
                state: 'visible'
              }));

            case 4:
              _context2.next = 6;
              return regeneratorRuntime.awrap(this.technicalAssets.click());

            case 6:
            case "end":
              return _context2.stop();
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