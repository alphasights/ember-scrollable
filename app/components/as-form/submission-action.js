import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':action', 'isConfirming:active'],
  buttonState: null,
  confirmationMessage: 'Are you sure?',
  confirmationButtonLabel: 'Yes',
  confirmationStateClass: null,
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
      this.toggleProperty('isConfirming');
    },

    confirmAction: function() {
      this.sendAction();
    }
  }
});
