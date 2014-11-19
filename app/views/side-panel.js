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
      this.close();
    }
  },

  open: function() {
    this.$('> div').velocity({
      right: 0
    }, {
      duration: 'fast'
    });

    this.set('isActive', true);
  }.on('didInsertElement'),

  close: function() {
    this.$('> div').velocity({
      right: `-${this.get('initialWidth')}px`
    }, {
      duration: 'fast',
      complete: (() => {
        this.get('controller').send('hideSidePanel');
      })
    });

    this.set('isActive', false);
  }
});
