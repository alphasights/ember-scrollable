/* jshint node: true */

'use strict';

var VersionChecker = require('ember-cli-version-checker');

module.exports = {
  name: 'ember-scrollable',

  init: function() {
    this._super.init && this._super.init.apply(this, arguments);

    var checker = new VersionChecker(this);
    this._checkerForEmber = checker.for('ember', 'bower');
  },

  included: function(app) {
    while (app.app) {
      app = app.app;
    }
    this.app = app;

    this._super.included.apply(this, arguments);
  }
};
