import Ember from 'ember';

export default Ember.View.extend({
  classNameBindings: [':widget', ':performance', 'controller.performanceBarClass'],

  onDidInsertElement: function() {
    this.$().hover(() => {
      this.$('.tooltipstered').tooltipster('show');
    }, () => {
      this.$('.tooltipstered').tooltipster('hide');
    });
  }.on('didInsertElement')
});
