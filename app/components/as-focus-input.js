import Ember from 'ember';

export default Ember.TextField.extend({
  classNameBindings: [':focus-input'],

  onDidInsertElement: function() {
    this.$().focus();
  }.on('didInsertElement')
});
