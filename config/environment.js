/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'phoenix',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',

    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      apiBaseURL: '/swordfish',
      authURL: 'http://localhost:3000/system',
      raven: {
        url: 'https://665338a0e51643adb0c51f05dda5c368@app.getsentry.com/31225',
        whitelistURLs: ['as-phoenix-production.herokuapp.com', 'as-phoenix-staging.herokuapp.com']
      }
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'auto';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'staging') {
    ENV.APP.apiBaseURL = 'https://pistachio-staging.herokuapp.com/swordfish';
    ENV.APP.authURL = 'https://pistachio-staging.herokuapp.com/system';
  }

  if (environment === 'production') {
    ENV.APP.apiBaseURL = 'https://secure.alphasights.com/swordfish';
    ENV.APP.authURL = 'https://secure.alphasights.com/system';
  }

  return ENV;
};
