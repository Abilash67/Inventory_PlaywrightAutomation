const { getEnvironment } = require("../config/environments");

const { baseURL } = getEnvironment();

module.exports = {
  baseURL,
  login: `${baseURL}/login`,
  dashboard: `${baseURL}/`,
  inventory: `${baseURL}/inventory`,
};