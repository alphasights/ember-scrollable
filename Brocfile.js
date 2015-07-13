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

if (typeof process.env.ASSET_HOST !== 'undefined' && env === 'production') {
  options['fingerprint'] = {
    prepend: process.env.ASSET_HOST
  };
}

var app = new EmberApp(options);

app.import('bower_components/honeybadger.js/honeybadger.js');
app.import('bower_components/moment-timezone/builds/moment-timezone-with-data.js');
app.import('bower_components/underscore/underscore.js');
app.import('bower_components/messenger/build/js/messenger.js');
app.import('bower_components/messenger/build/css/messenger.css');
app.import('bower_components/messenger/build/css/messenger-theme-block.css');
app.import('bower_components/bower-jstz/jstz.js');

app.import('vendor/jstz-shim.js', {
  type: 'vendor',
  exports: { 'jstz': ['default'] }
});

if (EmberApp.env() === 'test') {
  app.import('bower_components/jquery-simulate-ext/libs/jquery.simulate.js', { type: 'test' });
  app.import('bower_components/jquery-simulate-ext/src/jquery.simulate.ext.js', { type: 'test' });
  app.import('bower_components/jquery-simulate-ext/src/jquery.simulate.drag-n-drop.js', { type: 'test' });
  app.import('bower_components/deep-diff/index.js', { type: 'test' });
}

module.exports = app.toTree();
