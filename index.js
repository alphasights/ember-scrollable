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
    if (app.app) {
      app = app.app;
    }
    this.app = app;

    this._super.included.apply(this, arguments);
  },

  treeFor: function() {
    if (this._checkerForEmber.lt('2.3.0') && this.parent === this.project) {
      console.warn('hash helper is required by ember-scrollable, please install ember-hash-helper-polyfill or upgrade.');
    }
    return this._super.treeFor.apply(this, arguments);
  }
};
