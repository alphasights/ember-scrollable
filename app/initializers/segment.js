export default {
  name: 'segment',

  initialize: _(function() {
    analytics.load(EmberENV.segmentWriteKey);
    analytics.page();
  }).once()
};
