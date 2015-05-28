import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'section',
  classNameBindings: [':footer', ':actions', 'isDisplayingConfirmationOptions:with-confirm'],
  confirmationMessage: 'Would you like to withdraw the interaction from client compliance?',
  isDisplayingConfirmationOptions: false,
  model: null,

  actions: {
    toggleConfirmationDisplay: function() {
      this.toggleProperty('isDisplayingConfirmationOptions');
    },

    cancel: function(withdrawFromCompliance) {
      this.sendAction('cancel', withdrawFromCompliance);
    },

    submit: function() {
      console.log('Completing the interaction');
    }
  }
});
