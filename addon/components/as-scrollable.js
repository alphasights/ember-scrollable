import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':as-scrollable', ':tse-scrollable', 'horizontal'],
  horizontal: false,

  _setupTrackpadScrollEmulator: Ember.on('didInsertElement', function() {
    Ember.run.schedule('afterRender', this, function() {
      this.$().TrackpadScrollEmulator({ wrapContent: false });
    });
  }),

  _teardownTrackpadScrollEmulator: Ember.on('willDestroyElement', function() {
    this.$().TrackpadScrollEmulator('destroy');
  })
});
