/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app;

if (new EmberApp().env === 'production') {
  app = new EmberApp({
    fingerprint: {
      prepend: 'https://d1o4b5r6n1wxod.cloudfront.net/'
    }
  });
} else {
  app = new EmberApp();
}


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

app.import('bower_components/raven-js/dist/raven.js');
app.import('bower_components/underscore/underscore.js');
app.import('bower_components/spinjs/spin.js');
app.import('bower_components/messenger/build/js/messenger.js');
app.import('bower_components/messenger/build/js/messenger-theme-flat.js');
app.import('bower_components/messenger/build/css/messenger.css');
app.import('bower_components/messenger/build/css/messenger-theme-flat.css');

module.exports = app.toTree();
