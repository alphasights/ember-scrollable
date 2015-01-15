export default {
  name: 'segment',

  initialize: _(function() {
    if (typeof analytics === 'undefined') { return; }

    analytics.load(EmberENV.segmentWriteKey);
    analytics.page();
  }).once()
};
