import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':action', 'isConfirming:active'],
  confirmationComponent: null,
  label: 'Save',
  requestPromise: null,
  isConfirming: false,

  actions: {
    click: function() {
      var confirmationComponent = this.get('confirmationComponent');

      if (confirmationComponent) {
        this.toggleProperty('isConfirming');
      } else {
        this.sendAction(this.get('action'));
      }
    },

    back: function() {
      this.toggleProperty('isConfirming');
    }
  }
});
