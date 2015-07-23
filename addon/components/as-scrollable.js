import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':as-scrollable', ':tse-scrollable', 'horizontal'],
  
  horizontal: false,
  autoHide: true,

  _setupTrackpadScrollEmulator: Ember.on('didInsertElement', function() {
    Ember.run.schedule('afterRender', this, function() {
      this.$().TrackpadScrollEmulator({ wrapContent: false, autoHide: this.get('autoHide') });
    });
  }),

  _teardownTrackpadScrollEmulator: Ember.on('willDestroyElement', function() {
    this.$().TrackpadScrollEmulator('destroy');
  })
});
