import config from '../config/environment';

export default {
  name: 'segment',

  initialize: _(function() {
    if (config.APP.segmentWriteKey == null) { return; }

    analytics.load(config.APP.segmentWriteKey);
    analytics.page();
  }).once()
};
