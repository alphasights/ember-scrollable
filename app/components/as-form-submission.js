import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':form-submission'],

  label: 'Save',
  showCancel: true,
  cancelLabel: 'Cancel',

  actions: {
    cancel: function() {
      this.sendAction('cancel');
    }
  }
});
