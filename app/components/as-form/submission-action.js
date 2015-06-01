import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':action', 'isConfirming:active'],
  requestPromise: null,
  isConfirming: false,
  showConfirmation: false,
  confirmationMessage: 'Are you sure?',
  confirmationLabel: 'Yes',

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
