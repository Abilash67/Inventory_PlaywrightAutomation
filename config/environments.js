const environments = {
  qa: {
    baseURL: 'https://inventoryqa.techversantinfotech.com',
  },
};

function getEnvironment(name = process.env.TEST_ENV || 'qa') {
  const environment = environments[name];

  if (!environment) {
    throw new Error(
      `Unknown TEST_ENV "${name}". Expected one of: ${Object.keys(environments).join(', ')}.`,
    );
  }

  return {
    ...environment,
    baseURL: process.env.BASE_URL || environment.baseURL,
  };
}

module.exports = {
  environments,
  getEnvironment,
};
