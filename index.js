/* eslint-env node */

'use strict';

module.exports = {
  name: 'ember-scrollable',

  included: function(app) {
    while (app.app) {
      app = app.app;
    }
    this.app = app;

    this._super.included.apply(this, arguments);
  }
};
