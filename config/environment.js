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
      },

      almondApiBaseUrl: '/api/v1',
      apiBaseUrl: '/swordfish',
      blankAvatarUrl: '/images/default_avatar.png',
      honeybadgerApiKey: 'e9d6e886d2610eafae260a0219c427b1',
      intercomAppId: '4rw4fi3l',
      pistachioUrl: 'http://localhost:3000',
      segmentWriteKey: 'pDNExxGmPPnX3rx86MuEfqz6yQTViY1O'
    },

    typekit: {
      kitId: 'hfq4wyy'
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    contentSecurityPolicyHeader: 'Content-Security-Policy',

    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-inline' *.segment.io *.segment.com *.intercom.io *.heapanalytics.com *.intercomcdn.com use.typekit.net",
      'font-src': "'self' *.gstatic.com data: use.typekit.net",
      'connect-src': "'self' *.segment.io wss://*.intercom.io *.intercom.io http://localhost:3001 http://localhost:3000 https://almond-production.herokuapp.com",
      'img-src': "'self' data: *.amazonaws.com *.heapanalytics.com *.intercomcdn.com *.honeybadger.io p.typekit.net;",
      'style-src': "'self' 'unsafe-inline' *.mxpnl.com *.googleapis.com use.typekit.net",
      'media-src': "'self'"
    },

    featureFlags: {
      'advisor-follow-up': false
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.featureFlags['advisor-follow-up'] = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';

    ENV.EmberENV.segmentWriteKey = null;
    ENV.EmberENV.intercomAppId = null;
    ENV.EmberENV.honeybadgerApiKey = null;
    // ENV.EmberENV.logErrors = false;
  }

  if (environment === 'production') {
    ENV.EmberENV.pistachioUrl = 'https://secure.alphasights.com';
    ENV.EmberENV.apiBaseUrl = 'https://secure.alphasights.com/swordfish';
    ENV.EmberENV.segmentWriteKey = 'CGOpboMXwCElX7EGGZBI6qz4OyP4xZPw';
    ENV.EmberENV.intercomAppId = '6abaf27ec429d23649acebc2818fd4e87257e347';
    ENV.EmberENV.almondApiBaseUrl = 'https://almond-production.herokuapp.com/api/v1';
  }

  return ENV;
};
