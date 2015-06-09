import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':email-correspondence'],

  emails: null,
  displayList: false,
  isViewingEmail: false,
  selectedEmail: null,

  actions: {
    toggleDisplay: function() {
      this.toggleProperty('displayList');
    },

    selectEmail: function(email) {
      this.setProperties({isViewingEmail: true, selectedEmail: email});
    }
  }
});
