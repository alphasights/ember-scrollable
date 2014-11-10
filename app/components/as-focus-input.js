import Ember from 'ember';

export default Ember.TextField.extend({
  classNames: ['focus-input'],

  onDidInsertElement: function() {
    this.$().focus();
  }.on('didInsertElement')
});
