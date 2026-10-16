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
    this.inventoryHeading = page.getByRole("heading", {
      name: "Inventory",
      exact: true
    });
    this.tabList = page.getByRole("tablist");
    this.technicalAssets = page.getByRole("tab", {
      name: "Technical Assets",
      exact: true
    });
    this.softwareLicenses = page.getByRole("tab", {
      name: "Software Licenses",
      exact: true
    });
    this.infrastructureAssets = page.getByRole("tab", {
      name: "Infrastructure Assets",
      exact: true
    });
  }

  _createClass(InventoryPage, [{
    key: "navigateToInventory",
    value: function navigateToInventory() {
      return regeneratorRuntime.async(function navigateToInventory$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (/\/inventory(?:\/)?$/.test(this.page.url())) {
                _context.next = 14;
                break;
              }

              _context.next = 3;
              return regeneratorRuntime.awrap(this.page.waitForLoadState("domcontentloaded"));

            case 3:
              _context.next = 5;
              return regeneratorRuntime.awrap(this.inventoryMenu.isVisible()["catch"](function () {
                return false;
              }));

            case 5:
              if (!_context.sent) {
                _context.next = 10;
                break;
              }

              _context.next = 8;
              return regeneratorRuntime.awrap(this.inventoryMenu.click());

            case 8:
              _context.next = 12;
              break;

            case 10:
              _context.next = 12;
              return regeneratorRuntime.awrap(this.page["goto"]("/inventory", {
                waitUntil: "domcontentloaded",
                timeout: 30000
              }));

            case 12:
              _context.next = 14;
              return regeneratorRuntime.awrap(this.page.waitForURL(/\/inventory(?:\/)?$/, {
                waitUntil: "domcontentloaded",
                timeout: 30000
              }));

            case 14:
              _context.next = 16;
              return regeneratorRuntime.awrap(this.inventoryHeading.waitFor({
                state: "visible",
                timeout: 30000
              }));

            case 16:
              _context.next = 18;
              return regeneratorRuntime.awrap(this.tabList.waitFor({
                state: "visible",
                timeout: 30000
              }));

            case 18:
              _context.next = 20;
              return regeneratorRuntime.awrap(this.technicalAssets.waitFor({
                state: "visible",
                timeout: 30000
              }));

            case 20:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "openTechnicalAssets",
    value: function openTechnicalAssets() {
      var selected;
      return regeneratorRuntime.async(function openTechnicalAssets$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(this.technicalAssets.waitFor({
                state: "visible",
                timeout: 30000
              }));

            case 2:
              _context2.next = 4;
              return regeneratorRuntime.awrap(this.technicalAssets.getAttribute("aria-selected"));

            case 4:
              selected = _context2.sent;

              if (!(selected !== "true")) {
                _context2.next = 8;
                break;
              }

              _context2.next = 8;
              return regeneratorRuntime.awrap(this.technicalAssets.click({
                timeout: 15000
              }));

            case 8:
              _context2.next = 10;
              return regeneratorRuntime.awrap(this.page.getByRole("tabpanel", {
                name: "Technical Assets"
              }).waitFor({
                state: "visible",
                timeout: 30000
              }));

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "openSoftwareLicenses",
    value: function openSoftwareLicenses() {
      var selected;
      return regeneratorRuntime.async(function openSoftwareLicenses$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(this.softwareLicenses.waitFor({
                state: "visible",
                timeout: 30000
              }));

            case 2:
              _context3.next = 4;
              return regeneratorRuntime.awrap(this.softwareLicenses.getAttribute("aria-selected"));

            case 4:
              selected = _context3.sent;

              if (!(selected !== "true")) {
                _context3.next = 8;
                break;
              }

              _context3.next = 8;
              return regeneratorRuntime.awrap(this.softwareLicenses.click({
                timeout: 15000
              }));

            case 8:
              _context3.next = 10;
              return regeneratorRuntime.awrap(this.page.getByRole("tabpanel", {
                name: "Software Licenses"
              }).waitFor({
                state: "visible",
                timeout: 30000
              }));

            case 10:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "openInfrastructureAssets",
    value: function openInfrastructureAssets() {
      var selected;
      return regeneratorRuntime.async(function openInfrastructureAssets$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(this.infrastructureAssets.waitFor({
                state: "visible",
                timeout: 30000
              }));

            case 2:
              _context4.next = 4;
              return regeneratorRuntime.awrap(this.infrastructureAssets.getAttribute("aria-selected"));

            case 4:
              selected = _context4.sent;

              if (!(selected !== "true")) {
                _context4.next = 8;
                break;
              }

              _context4.next = 8;
              return regeneratorRuntime.awrap(this.infrastructureAssets.click({
                timeout: 15000
              }));

            case 8:
              _context4.next = 10;
              return regeneratorRuntime.awrap(this.page.getByRole("tabpanel", {
                name: "Infrastructure Assets"
              }).waitFor({
                state: "visible",
                timeout: 30000
              }));

            case 10:
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