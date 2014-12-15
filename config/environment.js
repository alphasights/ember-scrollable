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
      apiBaseUrl: '/swordfish',
      pistachioUrl: 'http://localhost:3000',
      authUrl: 'http://localhost:3000/system',
      honeybadgerApiKey: 'e9d6e886d2610eafae260a0219c427b1',
      segmentWriteKey: 'pDNExxGmPPnX3rx86MuEfqz6yQTViY1O',
      intercomAppId: '4rw4fi3l'
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.segmentWriteKey = null;
    ENV.APP.intercomAppId = null;
  }

  if (environment === 'staging') {
    ENV.APP.pistachioUrl = 'https://pistachio-staging.herokuapp.com';
    ENV.APP.apiBaseUrl = 'https://pistachio-staging.herokuapp.com/swordfish';
    ENV.APP.authUrl = 'https://pistachio-staging.herokuapp.com/system';
  }

  if (environment === 'production') {
    ENV.APP.pistachioUrl = 'https://secure.alphasights.com';
    ENV.APP.apiBaseUrl = 'https://secure.alphasights.com/swordfish';
    ENV.APP.authUrl = 'https://secure.alphasights.com/system';
    ENV.APP.segmentWriteKey = 'CGOpboMXwCElX7EGGZBI6qz4OyP4xZPw';
    ENV.APP.intercomAppId = '6abaf27ec429d23649acebc2818fd4e87257e347';
  }

  return ENV;
};
