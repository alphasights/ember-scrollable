import Ember from 'ember';

export default Ember.Component.extend({
  confirmationMessage: 'Would you like to withdraw the interaction from client compliance?',
  model: null,
  cancel: 'cancel',
  confirmationStateClass: 'info',
  confirmationClass: 'confirm-cancel',
  requestPromise: null,

  actions: {
    cancel: function(withdrawFromCompliance) {
      this.sendAction('cancel', withdrawFromCompliance);
    },

    back: function() {
      this.get('parentView').send('back');
    }
  }
});
