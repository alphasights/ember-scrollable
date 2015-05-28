import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':form-submission', ':actions', 'isConfirming:with-confirm'],

  cancel: 'cancel',
  confirmationComponent: null,
  isConfirming: false,

  actions: {
    toggleConfirmation: function(confirmationComponent) {
      if (confirmationComponent) {
        this.set('confirmationComponent', confirmationComponent);
      }
      this.toggleProperty('isConfirming');
    },

    cancel: function(params) {
      this.sendAction('cancel', params);
    }
  }
});
