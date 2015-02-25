import Ember from 'ember';

export default Ember.View.extend({
  classNameBindings: [':widget', ':performance', 'controller.statusClass'],

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
