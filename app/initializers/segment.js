export default {
  name: 'segment',

  initialize: _(function() {
    if (EmberENV.segmentWriteKey == null) { return; }

    analytics.load(EmberENV.segmentWriteKey);
    analytics.page();
  }).once()
};
