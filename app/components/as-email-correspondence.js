import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':email-correspondence'],

  emails: null,
  actionHandler: null,
  selectedEmail: null,

  actions: {
    viewEmail: function(email) {
      this.set('selectedEmail', email);
      this.get('actionHandler').send('viewEmail', email);
    }
  }
});
