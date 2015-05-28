import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':action'],
  confirmationComponent: null,
  label: 'Save',
  requestPromise: null,

  actions: {
    click: function() {
      var confirmationComponent = this.get('confirmationComponent');

      if (confirmationComponent) {
        this.get('parentView').send('toggleConfirmation', confirmationComponent);
      } else {
        this.sendAction();
      }
    }
  }
});
