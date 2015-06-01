import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':action', 'isConfirming:active'],
  buttonState: null,
  confirmationComponent: null,
  controller: null,
  label: 'Save',
  requestPromise: null,
  isConfirming: false,

  actions: {
    click: function() {
      var confirmationComponent = this.get('confirmationComponent');

      if (confirmationComponent) {
        this.toggleProperty('isConfirming');
      } else {
        this.get('controller').send(this.get('primaryAction'));
      }
    },

    back: function() {
      this.toggleProperty('isConfirming');
    },

    primaryConfirmAction: function() {
      this.get('controller').send(this.get('primaryConfirmAction'));
    },

    secondaryConfirmAction: function() {
      this.get('controller').send(this.get('secondaryConfirmAction'));
    }
  }
});
