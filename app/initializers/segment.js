import config from '../config/environment';

export default {
  name: 'segment',

  initialize: _(function() {
    analytics.load(config.APP.segmentWriteKey);
    analytics.page();
  }).once()
};
