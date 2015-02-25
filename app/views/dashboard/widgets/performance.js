import Ember from 'ember';

export default Ember.View.extend({
  classNameBindings: [':widget', ':performance', 'statusClass'],

  isOnTarget: Ember.computed.oneWay('controller.isOnTarget'),
  isOnPace: Ember.computed.oneWay('controller.isOnPace'),

  statusClass: function() {
    if (this.get('isOnTarget')) {
      return 'on-target';
    } else if (this.get('isOnPace')) {
      return 'on-pace';
    } else {
      return null;
    }
  }.property('isOnTarget', 'isOnPace'),

  setupTooltipster: function() {
    Ember.run.schedule('afterRender', () => {
      this.$().hover(() => {
        this.$('.tooltipstered').tooltipster('show');
      }, () => {
        this.$('.tooltipstered').tooltipster('hide');
      });
    });
  }.on('didInsertElement')
});
