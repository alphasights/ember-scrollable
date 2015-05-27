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

    withdrawAndCancel: function() {
      console.log('Withdrawing from client compliance and cancelling');
    },

    cancel: function() {
      console.log('Cancelling the interaction');
    },

    submit: function() {
      console.log('Completing the interaction');
    }
  }
});
