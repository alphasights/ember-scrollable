/* jshint node: true */

'use strict';

module.exports = {
  normalizeEntityName: function() {},

  afterInstall: function() {
    return this.addBowerPackagesToProject([
      { name: 'trackpad-scroll-emulator', target: '^1.0.8' }
    ]);
  }
};
