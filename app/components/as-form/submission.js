import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':form-submission', 'isCancelling:with-confirm'],

  model: null,
  label: 'Save',
  showCancel: true,
  cancelLabel: 'Cancel',
  cancelConfirmationClass: 'confirm-cancel',
  cancelConfirmationLabel: 'Confirm',
  cancelConfirmationMessage: 'Are you sure?',
  requestPromise: null,

  isCancelling: false,

  actions: {
    toggleCancelling: function() {
      this.toggleProperty('isCancelling');
    },

    cancel: function() {
      this.sendAction('cancel');
    }
  }
});
