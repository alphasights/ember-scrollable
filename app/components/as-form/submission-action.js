import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':form-submission-action', ':action', 'isConfirming:active'],
  buttonState: null,
  confirmationMessage: 'Are you sure?',
  confirmationButtonLabel: 'Yes',
  confirmationStateClass: 'info',
  confirmationButtonClass: null,
  isConfirming: false,
  requestPromise: null,
  showConfirmation: false,

  actions: {
    click: function() {
      if (this.get('showConfirmation')) {
        this.toggleProperty('isConfirming');
      } else {
        this.sendAction();
      }
    },

    back: function() {
      this.set('isConfirming', false);
    },

    confirmAction: function() {
      this.sendAction();
    }
  }
});
