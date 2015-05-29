import Ember from 'ember';

export default Ember.Component.extend({
  confirmationMessage: 'Are you sure you want to cancel the scheduling?',
  model: null,
  cancel: 'cancel',
  confirmationStateClass: null,
  confirmationLabel: "Cancel Interaction",
  confirmationClass: 'confirm-cancel',
  requestPromise: null,

  actions: {
    cancel: function() {
      this.sendAction('cancel');
    },

    back: function() {
      this.get('parentView').send('back');
    }
  }
});
