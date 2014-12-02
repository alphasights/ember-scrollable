import config from '../config/environment';

export default {
  name: 'raven',

  initialize: _(function() {
    Raven.config(config.APP.raven.url, {
      whitelistUrls: config.APP.raven.whitelistUrls
    }).install();
  }).once()
};
