import Ember from 'ember';

export default Ember.View.extend({
  classNameBindings: [':side-panel', 'isActive:active'],
  layoutName: 'side-panel',

  initialWidth: null,

  onDidInsertElement: function() {
    this.set('initialWidth', this.$('> div').width());
  }.on('didInsertElement'),

  click: function(event) {
    var $target = Ember.$(event.target);
    var $nonBlurringElements = this.$('> div');

    if($target.closest($nonBlurringElements).length === 0) {
      this.get('controller').send('hideSidePanel');
    }
  },
});
