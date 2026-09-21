"use strict";

function _templateObject() {
  var data = _taggedTemplateLiteral(["$&"], ["\\$&"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require("@playwright/test"),
    expect = _require.expect;

var SoftwareLicensePage =
/*#__PURE__*/
function () {
  function SoftwareLicensePage(page) {
    _classCallCheck(this, SoftwareLicensePage);

    this.page = page;
    this.licenseTab = page.getByRole("tabpanel", {
      name: "Software Licenses"
    });
    this.softwareFilter = this.licenseTab.getByText("Select Software", {
      exact: true
    });
    this.statusFilter = this.licenseTab.getByText("Select Status", {
      exact: true
    });
    this.searchInput = this.licenseTab.getByPlaceholder(/Search Software/);
    this.licenseTable = this.licenseTab.locator("table");
    this.rowsPerPage = this.licenseTab.locator("select").first();
    this.previousButton = this.licenseTab.getByRole("button", {
      name: "Prev"
    });
    this.nextButton = this.licenseTab.getByRole("button", {
      name: "Next"
    });
    this.pageIndicator = this.licenseTab.getByText(/Page \d+ of \d+/);
    this.addLicenseToggle = this.licenseTab.getByRole("button", {
      name: "+ Add Asset",
      exact: true
    });
  }

  _createClass(SoftwareLicensePage, [{
    key: "rows",
    value: function rows() {
      return this.licenseTable.locator("tbody tr");
    }
  }, {
    key: "dialog",
    value: function dialog() {
      return this.page.getByRole("dialog");
    }
  }, {
    key: "form",
    value: function form() {
      return this.dialog();
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
              return regeneratorRuntime.awrap(expect(this.licenseTab).toBeVisible());

            case 2:
              _context.next = 4;
              return regeneratorRuntime.awrap(expect(this.licenseTable).toBeVisible());

            case 4:
              _i = 0, _arr = ["Software Name", "Software Code", "Expiration Date", "Actions"];

            case 5:
              if (!(_i < _arr.length)) {
                _context.next = 12;
                break;
              }

              header = _arr[_i];
              _context.next = 9;
              return regeneratorRuntime.awrap(expect(this.licenseTable.getByRole("columnheader", {
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
    key: "selectFilterOption",
    value: function selectFilterOption(filter, option) {
      var container, checkbox;
      return regeneratorRuntime.async(function selectFilterOption$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(filter.click());

            case 2:
              container = filter.locator("..");
              checkbox = container.getByRole("checkbox", {
                name: option,
                exact: true
              });
              _context2.next = 6;
              return regeneratorRuntime.awrap(checkbox.check());

            case 6:
              _context2.next = 8;
              return regeneratorRuntime.awrap(expect(checkbox).toBeChecked());

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }, {
    key: "search",
    value: function search(text) {
      return regeneratorRuntime.async(function search$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(this.searchInput.fill(text));

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "selectRowsPerPage",
    value: function selectRowsPerPage(value) {
      return regeneratorRuntime.async(function selectRowsPerPage$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(this.rowsPerPage.selectOption(String(value)));

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "viewFirstLicense",
    value: function viewFirstLicense() {
      return regeneratorRuntime.async(function viewFirstLicense$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(this.rows().first().getByRole("button", {
                name: "View"
              }).click());

            case 2:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "editFirstLicense",
    value: function editFirstLicense() {
      return regeneratorRuntime.async(function editFirstLicense$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(this.rows().first().getByRole("button", {
                name: "Edit"
              }).click());

            case 2:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "closeDialog",
    value: function closeDialog() {
      return regeneratorRuntime.async(function closeDialog$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(this.dialog().getByRole("button", {
                name: "Close"
              }).last().click());

            case 2:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "openAddLicenseForm",
    value: function openAddLicenseForm() {
      return regeneratorRuntime.async(function openAddLicenseForm$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return regeneratorRuntime.awrap(this.addLicenseToggle.click());

            case 2:
              _context8.next = 4;
              return regeneratorRuntime.awrap(this.page.getByRole("button", {
                name: "Add License",
                exact: true
              }).click());

            case 4:
              _context8.next = 6;
              return regeneratorRuntime.awrap(expect(this.dialog()).toContainText("Add Software"));

            case 6:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "verifyLicenseDetails",
    value: function verifyLicenseDetails() {
      var _i2, _arr2, field;

      return regeneratorRuntime.async(function verifyLicenseDetails$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return regeneratorRuntime.awrap(expect(this.dialog()).toContainText("License Details"));

            case 2:
              _i2 = 0, _arr2 = ["Software Name", "Software Code", "Software License Key", "Max Devices", "Purchase Date", "Expiration Date", "Remarks", "Admin Email"];

            case 3:
              if (!(_i2 < _arr2.length)) {
                _context9.next = 10;
                break;
              }

              field = _arr2[_i2];
              _context9.next = 7;
              return regeneratorRuntime.awrap(expect(this.dialog()).toContainText(field));

            case 7:
              _i2++;
              _context9.next = 3;
              break;

            case 10:
            case "end":
              return _context9.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "verifyLicenseForm",
    value: function verifyLicenseForm() {
      var _ref,
          _ref$edit,
          edit,
          _args10 = arguments;

      return regeneratorRuntime.async(function verifyLicenseForm$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _ref = _args10.length > 0 && _args10[0] !== undefined ? _args10[0] : {}, _ref$edit = _ref.edit, edit = _ref$edit === void 0 ? false : _ref$edit;
              _context10.next = 3;
              return regeneratorRuntime.awrap(expect(this.dialog()).toContainText(edit ? "Edit Software" : "Add Software"));

            case 3:
              _context10.next = 5;
              return regeneratorRuntime.awrap(expect(this.dialog().locator("select").first()).toBeVisible());

            case 5:
              _context10.next = 7;
              return regeneratorRuntime.awrap(expect(this.dialog().getByPlaceholder("Auto-generated")).toBeVisible());

            case 7:
              _context10.next = 9;
              return regeneratorRuntime.awrap(expect(this.dialog().locator('input[type="date"]')).toHaveCount(2));

            case 9:
              _context10.next = 11;
              return regeneratorRuntime.awrap(expect(this.dialog().getByRole("checkbox")).toBeVisible());

            case 11:
              _context10.next = 13;
              return regeneratorRuntime.awrap(expect(this.dialog().locator('input[type="number"]')).toBeVisible());

            case 13:
              _context10.next = 15;
              return regeneratorRuntime.awrap(expect(this.dialog().getByPlaceholder("Enter Software License Key")).toBeVisible());

            case 15:
              _context10.next = 17;
              return regeneratorRuntime.awrap(expect(this.dialog().getByPlaceholder("Enter Admin Email")).toBeVisible());

            case 17:
              _context10.next = 19;
              return regeneratorRuntime.awrap(expect(this.dialog().getByPlaceholder("Additional Notes About the License")).toBeVisible());

            case 19:
            case "end":
              return _context10.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getFormFields",
    value: function getFormFields() {
      var dialog;
      return regeneratorRuntime.async(function getFormFields$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              dialog = this.dialog();
              return _context11.abrupt("return", {
                softwareSelect: dialog.locator("select").first(),
                softwareCode: dialog.getByPlaceholder("Auto-generated"),
                licenseKey: dialog.getByPlaceholder("Enter Software License Key"),
                maxDevices: dialog.locator('input[type="number"]'),
                dates: dialog.locator('input[type="date"]'),
                adminEmail: dialog.getByPlaceholder("Enter Admin Email"),
                remarks: dialog.getByPlaceholder("Additional Notes About the License"),
                autoRenewal: dialog.getByRole("checkbox")
              });

            case 2:
            case "end":
              return _context11.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getSoftwareOptions",
    value: function getSoftwareOptions() {
      var fields;
      return regeneratorRuntime.async(function getSoftwareOptions$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return regeneratorRuntime.awrap(this.getFormFields());

            case 2:
              fields = _context12.sent;
              return _context12.abrupt("return", fields.softwareSelect.locator("option").allTextContents());

            case 4:
            case "end":
              return _context12.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "selectSoftwareByLabel",
    value: function selectSoftwareByLabel(label) {
      var fields, escapedLabel, option, value;
      return regeneratorRuntime.async(function selectSoftwareByLabel$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return regeneratorRuntime.awrap(this.getFormFields());

            case 2:
              fields = _context13.sent;
              escapedLabel = label.replace(/[.*+?^${}()|[\]\\]/g, String.raw(_templateObject()));
              option = fields.softwareSelect.locator("option").filter({
                hasText: new RegExp("^".concat(escapedLabel, "$"))
              }).first();
              _context13.next = 7;
              return regeneratorRuntime.awrap(expect(option).toHaveCount(1));

            case 7:
              _context13.next = 9;
              return regeneratorRuntime.awrap(option.getAttribute("value"));

            case 9:
              value = _context13.sent;

              if (!value) {
                _context13.next = 15;
                break;
              }

              _context13.next = 13;
              return regeneratorRuntime.awrap(fields.softwareSelect.selectOption({
                value: value
              }));

            case 13:
              _context13.next = 17;
              break;

            case 15:
              _context13.next = 17;
              return regeneratorRuntime.awrap(fields.softwareSelect.selectOption({
                label: label
              }));

            case 17:
              _context13.next = 19;
              return regeneratorRuntime.awrap(expect(fields.softwareSelect.locator("option:checked")).toHaveText(label));

            case 19:
            case "end":
              return _context13.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "fillLicenseForm",
    value: function fillLicenseForm() {
      var _ref2,
          software,
          licenseKey,
          maxDevices,
          purchaseDate,
          expirationDate,
          adminEmail,
          remarks,
          autoRenewal,
          fields,
          checked,
          _args14 = arguments;

      return regeneratorRuntime.async(function fillLicenseForm$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              _ref2 = _args14.length > 0 && _args14[0] !== undefined ? _args14[0] : {}, software = _ref2.software, licenseKey = _ref2.licenseKey, maxDevices = _ref2.maxDevices, purchaseDate = _ref2.purchaseDate, expirationDate = _ref2.expirationDate, adminEmail = _ref2.adminEmail, remarks = _ref2.remarks, autoRenewal = _ref2.autoRenewal;
              _context14.next = 3;
              return regeneratorRuntime.awrap(this.getFormFields());

            case 3:
              fields = _context14.sent;

              if (!(software !== undefined)) {
                _context14.next = 7;
                break;
              }

              _context14.next = 7;
              return regeneratorRuntime.awrap(this.selectSoftwareByLabel(software));

            case 7:
              if (!(licenseKey !== undefined)) {
                _context14.next = 10;
                break;
              }

              _context14.next = 10;
              return regeneratorRuntime.awrap(fields.licenseKey.fill(licenseKey));

            case 10:
              if (!(maxDevices !== undefined)) {
                _context14.next = 13;
                break;
              }

              _context14.next = 13;
              return regeneratorRuntime.awrap(fields.maxDevices.fill(String(maxDevices)));

            case 13:
              if (!(purchaseDate !== undefined)) {
                _context14.next = 16;
                break;
              }

              _context14.next = 16;
              return regeneratorRuntime.awrap(fields.dates.nth(0).fill(purchaseDate));

            case 16:
              if (!(expirationDate !== undefined)) {
                _context14.next = 19;
                break;
              }

              _context14.next = 19;
              return regeneratorRuntime.awrap(fields.dates.nth(1).fill(expirationDate));

            case 19:
              if (!(adminEmail !== undefined)) {
                _context14.next = 22;
                break;
              }

              _context14.next = 22;
              return regeneratorRuntime.awrap(fields.adminEmail.fill(adminEmail));

            case 22:
              if (!(remarks !== undefined)) {
                _context14.next = 25;
                break;
              }

              _context14.next = 25;
              return regeneratorRuntime.awrap(fields.remarks.fill(remarks));

            case 25:
              if (!(autoRenewal !== undefined)) {
                _context14.next = 32;
                break;
              }

              _context14.next = 28;
              return regeneratorRuntime.awrap(fields.autoRenewal.isChecked());

            case 28:
              checked = _context14.sent;

              if (!(checked !== autoRenewal)) {
                _context14.next = 32;
                break;
              }

              _context14.next = 32;
              return regeneratorRuntime.awrap(fields.autoRenewal.click());

            case 32:
            case "end":
              return _context14.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "saveLicense",
    value: function saveLicense() {
      var addButton;
      return regeneratorRuntime.async(function saveLicense$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              addButton = this.dialog().getByRole("button", {
                name: "Add",
                exact: true
              });
              _context15.next = 3;
              return regeneratorRuntime.awrap(expect(addButton).toBeVisible());

            case 3:
              _context15.next = 5;
              return regeneratorRuntime.awrap(addButton.click());

            case 5:
            case "end":
              return _context15.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "updateLicense",
    value: function updateLicense() {
      var updateButton;
      return regeneratorRuntime.async(function updateLicense$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              updateButton = this.dialog().getByRole("button", {
                name: /^(Update|Save)$/
              });
              _context16.next = 3;
              return regeneratorRuntime.awrap(expect(updateButton).toBeVisible());

            case 3:
              _context16.next = 5;
              return regeneratorRuntime.awrap(updateButton.click());

            case 5:
            case "end":
              return _context16.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "cancelForm",
    value: function cancelForm() {
      return regeneratorRuntime.async(function cancelForm$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              _context17.next = 2;
              return regeneratorRuntime.awrap(this.dialog().getByRole("button", {
                name: "Cancel"
              }).click());

            case 2:
            case "end":
              return _context17.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getSuccessMessage",
    value: function getSuccessMessage() {
      return regeneratorRuntime.async(function getSuccessMessage$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              return _context18.abrupt("return", this.page.locator(['[role="alert"]:visible', ".toast:visible", ".alert:visible"].join(", ")));

            case 1:
            case "end":
              return _context18.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "verifySuccessMessage",
    value: function verifySuccessMessage() {
      var message;
      return regeneratorRuntime.async(function verifySuccessMessage$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              _context19.next = 2;
              return regeneratorRuntime.awrap(this.getSuccessMessage());

            case 2:
              message = _context19.sent;
              _context19.next = 5;
              return regeneratorRuntime.awrap(expect(message).toBeVisible());

            case 5:
            case "end":
              return _context19.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getValidationMessages",
    value: function getValidationMessages() {
      return this.dialog().locator(['[role="alert"]:visible', ".text-red-500:visible", ".text-danger:visible", ".error:visible", ".invalid-feedback:visible"].join(", "));
    }
  }, {
    key: "verifyValidationMessage",
    value: function verifyValidationMessage() {
      var validationMessages;
      return regeneratorRuntime.async(function verifyValidationMessage$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              validationMessages = this.getValidationMessages();
              _context20.next = 3;
              return regeneratorRuntime.awrap(expect(validationMessages.first()).toBeVisible());

            case 3:
            case "end":
              return _context20.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "hasValidationMessage",
    value: function hasValidationMessage() {
      var messages;
      return regeneratorRuntime.async(function hasValidationMessage$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              messages = this.getValidationMessages();
              _context21.next = 3;
              return regeneratorRuntime.awrap(messages.count());

            case 3:
              _context21.t0 = _context21.sent;
              return _context21.abrupt("return", _context21.t0 > 0);

            case 5:
            case "end":
              return _context21.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getFirstLicenseData",
    value: function getFirstLicenseData() {
      var row;
      return regeneratorRuntime.async(function getFirstLicenseData$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              row = this.rows().first();
              _context22.next = 3;
              return regeneratorRuntime.awrap(row.locator("td").nth(0).innerText());

            case 3:
              _context22.t0 = _context22.sent.trim();
              _context22.next = 6;
              return regeneratorRuntime.awrap(row.locator("td").nth(1).innerText());

            case 6:
              _context22.t1 = _context22.sent.trim();
              _context22.next = 9;
              return regeneratorRuntime.awrap(row.locator("td").nth(2).innerText());

            case 9:
              _context22.t2 = _context22.sent.trim();
              return _context22.abrupt("return", {
                softwareName: _context22.t0,
                softwareCode: _context22.t1,
                expirationDate: _context22.t2
              });

            case 11:
            case "end":
              return _context22.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getLicenseKeyFromDetails",
    value: function getLicenseKeyFromDetails() {
      var licenseKeyText, dialogText, match;
      return regeneratorRuntime.async(function getLicenseKeyFromDetails$(_context23) {
        while (1) {
          switch (_context23.prev = _context23.next) {
            case 0:
              licenseKeyText = this.dialog().getByText(/Software License Key/i);
              _context23.next = 3;
              return regeneratorRuntime.awrap(expect(licenseKeyText).toBeVisible());

            case 3:
              _context23.next = 5;
              return regeneratorRuntime.awrap(this.dialog().innerText());

            case 5:
              dialogText = _context23.sent;
              match = dialogText.match(/Software License Key:?\s*([^\s]+)/i);
              return _context23.abrupt("return", match ? match[1].trim() : null);

            case 8:
            case "end":
              return _context23.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "findLicenseByText",
    value: function findLicenseByText(text) {
      return regeneratorRuntime.async(function findLicenseByText$(_context24) {
        while (1) {
          switch (_context24.prev = _context24.next) {
            case 0:
              return _context24.abrupt("return", this.rows().filter({
                hasText: text
              }));

            case 1:
            case "end":
              return _context24.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "verifyLicenseExists",
    value: function verifyLicenseExists(text) {
      return regeneratorRuntime.async(function verifyLicenseExists$(_context25) {
        while (1) {
          switch (_context25.prev = _context25.next) {
            case 0:
              _context25.next = 2;
              return regeneratorRuntime.awrap(expect(this.rows().filter({
                hasText: text
              }).first()).toBeVisible());

            case 2:
            case "end":
              return _context25.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "verifyLicenseDoesNotExist",
    value: function verifyLicenseDoesNotExist(text) {
      return regeneratorRuntime.async(function verifyLicenseDoesNotExist$(_context26) {
        while (1) {
          switch (_context26.prev = _context26.next) {
            case 0:
              _context26.next = 2;
              return regeneratorRuntime.awrap(expect(this.rows().filter({
                hasText: text
              })).toHaveCount(0));

            case 2:
            case "end":
              return _context26.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "openLicenseByText",
    value: function openLicenseByText(text) {
      var row;
      return regeneratorRuntime.async(function openLicenseByText$(_context27) {
        while (1) {
          switch (_context27.prev = _context27.next) {
            case 0:
              row = this.rows().filter({
                hasText: text
              }).first();
              _context27.next = 3;
              return regeneratorRuntime.awrap(expect(row).toBeVisible());

            case 3:
              _context27.next = 5;
              return regeneratorRuntime.awrap(row.getByRole("button", {
                name: "View"
              }).click());

            case 5:
            case "end":
              return _context27.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "editLicenseByText",
    value: function editLicenseByText(text) {
      var row;
      return regeneratorRuntime.async(function editLicenseByText$(_context28) {
        while (1) {
          switch (_context28.prev = _context28.next) {
            case 0:
              row = this.rows().filter({
                hasText: text
              }).first();
              _context28.next = 3;
              return regeneratorRuntime.awrap(expect(row).toBeVisible());

            case 3:
              _context28.next = 5;
              return regeneratorRuntime.awrap(row.getByRole("button", {
                name: "Edit"
              }).click());

            case 5:
            case "end":
              return _context28.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "clearLicenseForm",
    value: function clearLicenseForm() {
      var fields;
      return regeneratorRuntime.async(function clearLicenseForm$(_context29) {
        while (1) {
          switch (_context29.prev = _context29.next) {
            case 0:
              _context29.next = 2;
              return regeneratorRuntime.awrap(this.getFormFields());

            case 2:
              fields = _context29.sent;
              _context29.next = 5;
              return regeneratorRuntime.awrap(fields.licenseKey.fill(""));

            case 5:
              _context29.next = 7;
              return regeneratorRuntime.awrap(fields.maxDevices.fill(""));

            case 7:
              _context29.next = 9;
              return regeneratorRuntime.awrap(fields.dates.nth(0).fill(""));

            case 9:
              _context29.next = 11;
              return regeneratorRuntime.awrap(fields.dates.nth(1).fill(""));

            case 11:
              _context29.next = 13;
              return regeneratorRuntime.awrap(fields.adminEmail.fill(""));

            case 13:
              _context29.next = 15;
              return regeneratorRuntime.awrap(fields.remarks.fill(""));

            case 15:
            case "end":
              return _context29.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getFormSubmitButton",
    value: function getFormSubmitButton() {
      return regeneratorRuntime.async(function getFormSubmitButton$(_context30) {
        while (1) {
          switch (_context30.prev = _context30.next) {
            case 0:
              return _context30.abrupt("return", this.dialog().getByRole("button", {
                name: /^(Add|Save|Create|Update)$/
              }));

            case 1:
            case "end":
              return _context30.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "verifySubmitButtonState",
    value: function verifySubmitButtonState() {
      var _ref3,
          disabled,
          button,
          _args31 = arguments;

      return regeneratorRuntime.async(function verifySubmitButtonState$(_context31) {
        while (1) {
          switch (_context31.prev = _context31.next) {
            case 0:
              _ref3 = _args31.length > 0 && _args31[0] !== undefined ? _args31[0] : {}, disabled = _ref3.disabled;
              _context31.next = 3;
              return regeneratorRuntime.awrap(this.getFormSubmitButton());

            case 3:
              button = _context31.sent;

              if (!(disabled !== undefined)) {
                _context31.next = 7;
                break;
              }

              _context31.next = 7;
              return regeneratorRuntime.awrap(expect(button).toBeDisabled({
                disabled: disabled
              }));

            case 7:
            case "end":
              return _context31.stop();
          }
        }
      }, null, this);
    }
  }]);

  return SoftwareLicensePage;
}();

module.exports = {
  SoftwareLicensePage: SoftwareLicensePage
};