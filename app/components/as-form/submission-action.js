import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':form-submission-action', ':action', 'isConfirming:active'],
  buttonClass: null,
  confirmationMessage: 'Are you sure?',
  confirmationButtonLabel: 'Yes',
  confirmationStateClass: 'info',
  confirmationButtonClass: null,
  isConfirming: false,
  requestPromise: null,
  showConfirmation: false,

  submit: function() {
    this.sendAction();

    if (this.get('form')) {
      this.get('form').send('submit');
    }
  },

  actions: {
    click: function() {
      if (this.get('showConfirmation')) {
        this.toggleProperty('isConfirming');
      } else {
        this.submit();
      }
    },

    back: function() {
      this.set('isConfirming', false);
    },

    confirmAction: function() {
      this.submit();
    }
  }
});
