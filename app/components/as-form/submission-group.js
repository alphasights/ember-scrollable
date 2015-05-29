import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':form-submission', ':actions'],

  cancel: 'cancel',

  actions: {
    cancel: function(params) {
      this.sendAction('cancel', params);
    }
  }
});
