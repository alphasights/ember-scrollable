import Ember from 'ember';

export default Ember.Component.extend({
  layoutName: 'components/as-side-panel',
  classNameBindings: [':side-panel', 'isActive:active'],

  open: function() {
    this.$('.panel').velocity({
      right: 0
    }, {
      duration: 'fast'
    });

    this.set('isActive', true);
  }.on('didInsertElement'),

  actions: {
    clear: function() {
      this.$('.panel').velocity({
        right: '-70%'
      }, {
        duration: 'fast',
        complete: (() => {
          this.sendAction('clear');
        })
      });

      this.set('isActive', false);
    }
  }
});
