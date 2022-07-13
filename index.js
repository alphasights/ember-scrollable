/* eslint-env node */

'use strict';

module.exports = {
  name: require('./package').name,

  included(app) {
    while (app.app) {
      app = app.app;
    }
    this.app = app;

    this._super.included.apply(this, arguments);
  },
};
