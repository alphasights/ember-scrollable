import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['progress-bar'],
  layoutName: 'components/progress-bar',

  percentage: function() {
    return this.get('ratio') * 100;
  }.property('ratio'),

  onDidInsertElement: function() {
    this.$('> div').velocity({
      width: `${this.get('percentage')}%`
    }, {
      duration: 350
    });
  }.on('didInsertElement')
});
