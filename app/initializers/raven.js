import config from '../config/environment';

var initialized = false;

export default {
  name: 'raven',

  initialize: function() {
    if (initialized) { return; }

    Raven.config(config.APP.raven.url, {
      whitelistUrls: config.APP.raven.whitelistUrls
    }).install();

    initialized = true;
  }
};
