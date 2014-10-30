import Ember from 'ember';

export default Ember.Component.extend({
  layoutName: 'components/as-side-panel',
  classNameBindings: [':side-panel', 'isActive:active'],

  open: function() {
    Ember.$('.application').velocity({
      right: '10%'
    }, {
      duration: 300
    });

    this.$('.panel').velocity({
      right: 0
    }, {
      duration: 'fast'
    });

    this.set('isActive', true);
  }.on('didInsertElement'),

  actions: {
    close: function() {
      this.$('.panel').velocity({
        right: '-70%'
      }, {
        duration: 'fast',
        complete: (() => {
          this.sendAction('close');
        })
      });

      Ember.$('.application').velocity({
        right: '0'
      }, {
        duration: 300
      });

      this.set('isActive', false);
    }
  }
});
