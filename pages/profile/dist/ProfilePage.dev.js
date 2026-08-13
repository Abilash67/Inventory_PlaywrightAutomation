"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require("@playwright/test"),
    expect = _require.expect;

var ProfilePage =
/*#__PURE__*/
function () {
  function ProfilePage(page) {
    _classCallCheck(this, ProfilePage);

    this.page = page; // Page Title

    this.profileTitle = page.getByRole("heading", {
      name: "Profile",
      level: 3
    }); // Profile Details

    this.userName = page.getByRole("heading", {
      name: "Super Admin",
      level: 3
    });
    this.email = page.getByText("superadmin@example.com", {
      exact: true
    });
    this.employeeId = page.locator("p").filter({
      hasText: "Emp ID"
    });
    this.designation = page.locator("p").filter({
      hasText: "Designation"
    });
    this.location = page.locator("p").filter({
      hasText: "Location"
    });
    this.department = page.locator("p").filter({
      hasText: "Department"
    });
    this.role = page.locator("p").filter({
      hasText: "Role"
    });
    this.reportingManager = page.locator("p").filter({
      hasText: "Reporting Manager"
    });
    this.doj = page.locator("p").filter({
      hasText: "DOJ"
    }); // Assets Section

    this.assetsTitle = page.getByRole("heading", {
      name: "Your Assets",
      level: 3
    });
  }

  _createClass(ProfilePage, [{
    key: "verifyProfileLoaded",
    value: function verifyProfileLoaded() {
      return regeneratorRuntime.async(function verifyProfileLoaded$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(expect(this.profileTitle).toBeVisible({
                timeout: 10000
              }));

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "verifyProfileDetails",
    value: function verifyProfileDetails() {
      return regeneratorRuntime.async(function verifyProfileDetails$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(expect(this.userName).toBeVisible());

            case 2:
              _context2.next = 4;
              return regeneratorRuntime.awrap(expect(this.email).toBeVisible());

            case 4:
              _context2.next = 6;
              return regeneratorRuntime.awrap(expect(this.employeeId).toBeVisible());

            case 6:
              _context2.next = 8;
              return regeneratorRuntime.awrap(expect(this.designation).toBeVisible());

            case 8:
              _context2.next = 10;
              return regeneratorRuntime.awrap(expect(this.location).toBeVisible());

            case 10:
              _context2.next = 12;
              return regeneratorRuntime.awrap(expect(this.department).toBeVisible());

            case 12:
              _context2.next = 14;
              return regeneratorRuntime.awrap(expect(this.role).toBeVisible());

            case 14:
              _context2.next = 16;
              return regeneratorRuntime.awrap(expect(this.reportingManager).toBeVisible());

            case 16:
              _context2.next = 18;
              return regeneratorRuntime.awrap(expect(this.doj).toBeVisible());

            case 18:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "verifyAssetsSection",
    value: function verifyAssetsSection() {
      return regeneratorRuntime.async(function verifyAssetsSection$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(expect(this.assetsTitle).toBeVisible());

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }]);

  return ProfilePage;
}();

module.exports = ProfilePage;