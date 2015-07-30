import Ember from 'ember';
import InboundActionsMixin from 'ember-component-inbound-actions/inbound-actions';

export default Ember.Component.extend(InboundActionsMixin, {
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
  }),

  actions: {
    recalculate: function() {
      this.$().TrackpadScrollEmulator('recalculate');
    }
  }
});
