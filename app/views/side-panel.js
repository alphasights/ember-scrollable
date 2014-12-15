import Ember from 'ember';

export default Ember.View.extend({
  classNameBindings: [':side-panel', 'isActive:active'],
  layoutName: 'side-panel',

  initialWidth: null,

  onDidInsertElement: function() {
    this.set('isActive', true);
    this.set('initialWidth', this.$('> div').width());

    this.$('> div').velocity({
      right: 0
    }, {
      duration: 200
    });

  }.on('didInsertElement'),

  click: function(event) {
    var $target = Ember.$(event.target);
    var $nonBlurringElements = this.$('> div');

    if($target.closest($nonBlurringElements).length === 0) {
      this.send('close');
    }
  },

  actions: {
    close: function() {
      this.set('isActive', false);

      this.$('> div').velocity({
        right: `-${this.get('initialWidth')}px`
      }, {
        duration: 200,

        complete: (() => {
          this.get('controller').send('hideSidePanel');
        })
      });
    }
  }
});
