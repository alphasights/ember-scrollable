import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':progress-bar'],

  percentage: function() {
    return Math.min(1, this.get('ratio')) * 100;
  }.property('ratio'),

  onDidInsertElement: function() {
    this.$('> div').velocity({
      width: `${this.get('percentage')}%`
    }, {
      duration: 350
    });
  }.on('didInsertElement')
});
