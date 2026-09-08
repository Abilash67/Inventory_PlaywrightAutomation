"use strict";

// inventory.technical-asset.spec.js
var _require = require('@playwright/test'),
    test = _require.test,
    expect = _require.expect;

var _require2 = require('./inventory.page'),
    InventoryPage = _require2.InventoryPage;

test('Open Inventory', function _callee(_ref) {
  var page, inventoryPage;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          page = _ref.page;
          inventoryPage = new InventoryPage(page); // ✅ Use the corrected base URL (without the extra path)

          _context.next = 4;
          return regeneratorRuntime.awrap(page["goto"]('https://inventoryqa.techversantinfotech.com/'));

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(inventoryPage.navigateToInventory());

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(expect(page).toHaveURL(/.*inventory.*/));

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
});