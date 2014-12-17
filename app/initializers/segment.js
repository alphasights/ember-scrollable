export default {
  name: 'segment',

  initialize: _(function() {
    if (window.EmberENV.segmentWriteKey == null) { return; }

    analytics.load(window.EmberENV.segmentWriteKey);
    analytics.page();
  }).once()
};
