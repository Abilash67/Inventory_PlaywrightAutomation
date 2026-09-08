const defaultCredentials = require('../test-data/loginData.json');

const credentials = {
  email: process.env.TEST_USER_EMAIL || defaultCredentials.email,
  password: process.env.TEST_USER_PASSWORD || defaultCredentials.password,
};

if (!credentials.email || !credentials.password) {
  throw new Error(
    'Missing login credentials. Set TEST_USER_EMAIL and TEST_USER_PASSWORD or update test-data/loginData.json.',
  );
}

module.exports = credentials;
