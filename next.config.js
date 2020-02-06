const withSass = require('@zeit/next-sass');

module.exports = {
  env: {
    REACT_APP_API: 'https://europe-west2-immo-764e3.cloudfunctions.net/api',
  },
  ...withSass(),
};
