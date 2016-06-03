/* jshint node: true */

'use strict';

module.exports = {
  name: 'ember-scrollable',

  options: {
    nodeAssets: {
      "trackpad-scroll-emulator": {
        srcDir: '/',
        import: ['jquery.trackpad-scroll-emulator.js', 'css/trackpad-scroll-emulator.css']
      }
    }
  }
};
