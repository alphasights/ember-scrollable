import config from '../config/environment';

export default {
  name: 'raven',

  initialize: function() {
    Raven.config(config.APP.raven.url, {
      whitelistUrls: config.APP.raven.whitelistUrls
    }).install();
  }
};
