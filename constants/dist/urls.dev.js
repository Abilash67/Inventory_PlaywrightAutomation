"use strict";

var _require = require("../config/environments"),
    getEnvironment = _require.getEnvironment;

var _getEnvironment = getEnvironment(),
    baseURL = _getEnvironment.baseURL;

module.exports = {
  baseURL: baseURL,
  login: "".concat(baseURL, "/login"),
  dashboard: "".concat(baseURL, "/"),
  inventory: "".concat(baseURL, "/inventory"),
  userManagement: "".concat(baseURL, "/users")
};