export default {
  name: 'segment',

  initialize: _(function() {
    if (typeof analytics === 'undefined' || analytics == null) { return; }

    analytics.load(EmberENV.segmentWriteKey);
    analytics.page();
  }).once()
};
