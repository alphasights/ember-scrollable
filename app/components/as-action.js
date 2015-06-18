import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':action', 'isConfirming:active'],
  layoutName: 'components/as-action',
  buttonClass: null,
  confirmationMessage: 'Are you sure?',
  confirmationButtonLabel: 'Yes',
  confirmationStateClass: 'info',
  confirmationButtonClass: null,
  requestPromise: null,
  isConfirming: false,
  showConfirmation: false,

  perform: function() {
    this.sendAction();
  },

  actions: {
    click: function() {
      if (this.get('showConfirmation')) {
        this.toggleProperty('isConfirming');
      } else {
        this.perform();
      }
   },

    back: function() {
      this.set('isConfirming', false);
    },

    confirmAction: function() {
      this.perform();
    }
  }
});
