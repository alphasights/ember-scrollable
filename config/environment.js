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

      apiBaseUrl: '/swordfish',
      blankAvatarUrl: '/images/default_avatar.png',
      honeybadgerApiKey: 'e9d6e886d2610eafae260a0219c427b1',
      intercomAppId: '4rw4fi3l',
      pistachioUrl: 'http://localhost:3000',
      segmentWriteKey: 'pDNExxGmPPnX3rx86MuEfqz6yQTViY1O'
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    contentSecurityPolicyHeader: 'Content-Security-Policy',

    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-inline' cdn.segment.com widget.intercom.io cdn.heapanalytics.com js.intercomcdn.com heapanalytics.com api.segment.io api-ping.intercom.io",
      'font-src': "'self' fonts.gstatic.com",
      'connect-src': "'self' api.segment.io wss://*.intercom.io api-ping.intercom.io",
      'img-src': "'self' data: s3.amazonaws.com heapanalytics.com js.intercomcdn.com api.honeybadger.io",
      'style-src': "'self' 'unsafe-inline' cdn.mxpnl.com fonts.googleapis.com",
      'media-src': "'self'"
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

    ENV.EmberENV.segmentWriteKey = null;
    ENV.EmberENV.intercomAppId = null;
    ENV.EmberENV.honeybadgerApiKey = null;
  }

  return ENV;
};
