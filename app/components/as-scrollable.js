import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':scrollable', ':tse-scrollable'],

  onDidInsertElement: function() {
    this.$().TrackpadScrollEmulator();
  }.on('didInsertElement')
});
