import Ember from 'ember';

export default Ember.Component.extend({
  confirmationMessage: 'Would you like to withdraw the interaction from client compliance?',
  model: null,
  cancel: 'cancel',
  confirmationStateClass: null,
  confirmationClass: 'confirm-cancel',
  requestPromise: null,

  actions: {
    cancel: function(withdrawFromCompliance) {
      this.sendAction('cancel', withdrawFromCompliance);
    },

    toggleConfirmation: function() {
      this.get('parentView').send('toggleConfirmation');
    }
  }
});
