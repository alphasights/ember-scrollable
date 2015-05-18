/* jshint node: true */
/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var env = process.env.EMBER_ENV;
var options = {
  inlineContent: {
    'analytics': {
      file: './inline-content/analytics.html'
    },
    'intercom': {
      file: './inline-content/intercom.html'
    },
    'development-styles': {
      file: './inline-content/development-styles.css',
      enabled: env === 'development'
    }
  }
}

if (typeof process.env.AWS_ACCESS_KEY_ID !== 'undefined') {
  options['fingerprint'] = {
    prepend: 'https://d2m6x67yezr43a.cloudfront.net/'
  }
}

var app = new EmberApp(options);

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

app.import('bower_components/honeybadger.js/honeybadger.js');
app.import('bower_components/moment-timezone/builds/moment-timezone-with-data.js');
app.import('bower_components/underscore/underscore.js');
app.import('bower_components/messenger/build/js/messenger.js');
app.import('bower_components/messenger/build/css/messenger.css');
app.import('bower_components/messenger/build/css/messenger-theme-block.css');

if (EmberApp.env() === 'test') {
  app.import('bower_components/jquery-simulate-ext/libs/jquery.simulate.js', { type: 'test' });
  app.import('bower_components/jquery-simulate-ext/src/jquery.simulate.ext.js', { type: 'test' });
  app.import('bower_components/jquery-simulate-ext/src/jquery.simulate.drag-n-drop.js', { type: 'test' });
}

module.exports = app.toTree();
