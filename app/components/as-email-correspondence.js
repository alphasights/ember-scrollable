import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':email-correspondence'],

  emails: null,
  isViewingEmail: false,
  selectedEmail: null,

  actions: {
    selectEmail: function(email) {
      this.setProperties({isViewingEmail: true, selectedEmail: email});
    }
  }
});
