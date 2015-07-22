/* jshint node: true */

'use strict';

var path = require('path');

module.exports = {
  name: 'ember-scrollable',

  included: function(app) {
    this._super.included(app);

    app.import(
      path.join(app.bowerDirectory, 'trackpad-scroll-emulator/jquery.trackpad-scroll-emulator.js'),
      { type: 'vendor' }
    );

    app.import(
      path.join(app.bowerDirectory, 'trackpad-scroll-emulator/css/trackpad-scroll-emulator.css'),
      { type: 'vendor' }
    );
  }
};
