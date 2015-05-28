import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':form-submission', 'cancelStateClass', 'isCancelling:with-confirm'],

  model: null,
  label: 'Save',
  showCancel: true,
  cancelLabel: 'Cancel',
  cancelConfirmationClass: 'confirm-cancel',
  cancelStateClass: null,
  cancelConfirmationLabel: 'Confirm',
  cancelConfirmationMessage: 'Are you sure?',
  requestPromise: null,
  isCancelling: false,

  actions: {
    submit: function() {
      this.get('parentView').send('submit');
      this.sendAction('submit');
    },

    toggleCancelling: function() {
      this.toggleProperty('isCancelling');
    },

    cancel: function() {
      this.sendAction('cancel');
    }
  }
});
