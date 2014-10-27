import Ember from 'ember';

export default Ember.Component.extend({
  layoutName: 'components/as-side-panel',
  classNames: ['side-panel'],

  open: function() {
    this.$('.overlay').velocity({ opacity: 0.5 });

    this.$('.panel').velocity({
      right: 0
    }, {
      duration: 'fast'
    });
  }.on('didInsertElement'),

  actions: {
    close: function() {
      this.$('.overlay').velocity({ opacity: 0 });

      this.$('.panel').velocity({
        right: '-40%'
      }, {
        duration: 'fast',
        complete: (() => {
          this.sendAction('close');
        })
      });
    }
  }
});
